import { useRef, useState } from "react";
import ManagePost from "./ManagePost";
import { Content } from "antd/es/layout/layout";
import { Button, Form, Input, Table } from "antd";
import { deletePost, getPosts, getUsers } from "../api";
import { DeleteFilled, EditOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const MainContent = () => {
  const modalRef = useRef<ShowModalRef | null>(null);
  const queryClient = useQueryClient();
  const [searchedData, setSearchedData] = useState<Post[] | null>(null);

  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  const { data: users, isLoading: userLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  const userFilterItem = () => {
    return users?.map((el) => ({
      text: el.username,
      value: el.id,
    }));
  };
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
      title: "User",
      filters: userFilterItem(),
      render: (id: number) => {
        const name = users?.find((el) => el.id === id);
        return <p>{name?.username}</p>;
      },
      onFilter: (value: any, record: any) => record.userId === value,
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

  const handleSearchFilter = (query: string) => {
    const newData = posts?.filter(
      (el) => el.title.includes(query) || el.body.includes(query)
    );
    setSearchedData(newData as Post[]);
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
      <Input.Search
        placeholder="Search on body or title"
        style={{ marginBottom: "1rem" }}
        onSearch={handleSearchFilter}
      />
      <Table
        dataSource={searchedData ? searchedData : posts}
        columns={headers}
        loading={isLoading && userLoading}
        rowKey="id"
      />
      <ManagePost ref={modalRef} />
    </Content>
  );
};

export default MainContent;
