import { Content } from "antd/es/layout/layout";

const MainContent = () => {
  return (
    <Content
      style={{
        background: "#222",
        color: "white",
        padding: "1rem",
        paddingRight: "2rem",
        overflowX: "hidden",
      }}
    >
      main
    </Content>
  );
};

export default MainContent;
