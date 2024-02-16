/// <reference types="vite/client" />

type Post = {
  id: number;
  body: string;
  title: string;
  userId: number;
};

type Users = {
  id: number;
  name: string;
  username: string;
  [key: string]: any;
};

type ShowModalRef = {
  showModal: (post?: Post) => void;
};
