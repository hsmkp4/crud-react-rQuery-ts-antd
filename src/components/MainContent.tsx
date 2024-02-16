import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Table } from "antd";
import { Content } from "antd/es/layout/layout";
import { deletePost, getPosts } from "../api";
import { DeleteOutlined } from "@ant-design/icons";

const MainContent = () => {
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
        <Button onClick={() => onDelete.mutate(record.id)} color="red">
          <DeleteOutlined />
        </Button>
      ),
    },
  ];

  const onDelete = useMutation({
    mutationFn: (id: number) => deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  return (
    <Content
      style={{
        color: "white",
        padding: "2rem 4rem",
        overflowX: "hidden",
      }}
    >
      <Table
        dataSource={posts}
        columns={headers}
        loading={isLoading}
        rowKey="id"
      />
    </Content>
  );
};

export default MainContent;
