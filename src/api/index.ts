import customAxios from "./customAxios";

export const getPosts = async () => {
  const res = await customAxios.get<Post[]>("/posts");
  return res.data;
};
export const createPost = async (post: Omit<Post, "id">) => {
  const res = await customAxios.post<Post>("/posts", post);
  return res.data;
};

export const updatePost = async (post: Post) => {
  const res = await customAxios.put<Post>(`/posts/${post.id}`, post);
  return res.data;
};

export const deletePost = async (id: number) => {
  const res = await customAxios.delete<Post>(`/posts/${id}`);
  return res.data;
};

export const getUsers = async () => {
  const res = await customAxios.get<Users[]>("/users");
  return res.data;
};
