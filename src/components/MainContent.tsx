import { useRef } from "react";
import ManagePost from "./ManagePost";
import { Content } from "antd/es/layout/layout";
import { Button, Table } from "antd";
import { deletePost, getPosts } from "../api";
import { DeleteFilled, EditOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const MainContent = () => {
  const modalRef = useRef<ShowModalRef | null>(null);
  const queryClient = useQueryClient();

  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  const headers = [
    {
      key: "id",
      dataIndex: "id",
      title: "ID",
    },
    {
      key: "title",
      dataIndex: "title",
      title: "Title",
    },
    {
      key: "body",
      dataIndex: "body",
      title: "Body",
    },
    {
      key: "userId",
      dataIndex: "userId",
      title: "User ID",
    },
    {
      key: "actions",
      dataIndex: "actions",
      title: "Actions",
      render: (_: any, record: Post) => (
        <>
          <Button color="orange" onClick={() => showModal(record)}>
            <EditOutlined style={{ color: "#666" }} />
          </Button>
          <Button onClick={() => onDelete.mutate(record.id)} color="red">
            <DeleteFilled style={{ color: "#c34" }} />
          </Button>
        </>
      ),
    },
  ];

  const onDelete = useMutation({
    mutationFn: (id: number) => deletePost(id),
    onError: (error) => {
      console.log(error);
    },

    onSuccess: async (data: Post, variables: number) => {
      queryClient.setQueryData(["posts"], (previous: Post[]) => {
        const newData = previous.filter((el) => el.id !== variables);
        return newData;
      });
    },
  });

  const showModal = (post?: Post) => {
    modalRef.current?.showModal(post);
  };

  return (
    <Content
      style={{
        color: "white",
        padding: "2rem 4rem",
        overflowX: "hidden",
      }}
    >
      <Button
        type="primary"
        onClick={() => showModal()}
        style={{ marginBottom: "2rem" }}
        block
      >
        Create New Post
      </Button>
      <Table
        dataSource={posts}
        columns={headers}
        loading={isLoading}
        rowKey="id"
      />
      <ManagePost ref={modalRef} />
    </Content>
  );
};

export default MainContent;
