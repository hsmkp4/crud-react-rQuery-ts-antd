import TextArea from "antd/es/input/TextArea";
import { createPost, updatePost } from "../api";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { Button, Form, Input, InputNumber, Modal, Space } from "antd";
import { forwardRef, Ref, useImperativeHandle, useMemo, useState } from "react";

const defaultPost = {
  id: undefined,
  title: "",
  body: "",
  userId: undefined,
};

function ManagePost(_: any, ref: Ref<ShowModalRef>) {
  const [open, setOpen] = useState(false);
  const [postId, setPostId] = useState<number | undefined>();

  const title = useMemo(() => {
    if (postId) return "Edit the post";
    return "Create a new post";
  }, [postId]);

  const [form] = Form.useForm();
  useImperativeHandle(ref, () => ({ showModal }));

  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createPost,
    onSuccess: async (data: Post, variables: Omit<Post, "id">) => {
      queryClient.setQueryData(["posts"], (previous: Post[]) => {
        return [{ ...variables, id: crypto.randomUUID() }, ...previous];
      });
      onClose();
    },
  });

  const updateMutation = useMutation({
    mutationFn: updatePost,
    onSuccess: async (data: Post, variables: Post) => {
      queryClient.setQueryData(["posts"], (previous: Post[]) => {
        const newData = previous.map((el) =>
          el.id === variables.id ? variables : el
        );
        return newData;
      });
      onClose();
    },
  });

  const create = (values: Omit<Post, "id">) => {
    createMutation.mutate(values);
  };

  const update = (values: Omit<Post, "id">) => {
    if (postId) updateMutation.mutate({ id: postId, ...values });
  };

  const onFinish = (values: Omit<Post, "id">) => {
    if (postId) update(values);
    else create(values);
  };

  const showModal = (post?: Post) => {
    setPostId(post?.id);
    form.setFieldsValue(post);
    setOpen(true);
  };

  const onClose = () => {
    form.resetFields();
    setOpen(false);
  };

  return (
    <Modal title={title} open={open} onCancel={onClose} footer={null}>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        initialValues={defaultPost}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please enter the title" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Body"
          name="body"
          rules={[
            {
              required: true,
              message: "Enter the body",
            },
          ]}
        >
          <TextArea rows={5} />
        </Form.Item>
        <Form.Item
          label="User Id"
          name="userId"
          rules={[
            {
              required: true,
              message: "Missing user id, :)",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item>
          <Space />
          <Button type="primary" htmlType="submit" block>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default forwardRef(ManagePost);
