/// <reference types="vite/client" />

type Post = {
  id: number;
  body: string;
  title: string;
  userId: number;
};

type ShowModalRef = {
  showModal: (post?: Post) => void;
};
