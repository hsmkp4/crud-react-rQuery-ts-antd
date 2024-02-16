import { Header } from "antd/es/layout/layout";

const Navbar = () => {
  return (
    <Header
      style={{
        background: "#444",
        color: "white",
        fontSize: "1.2rem",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        Golrang System
      </div>
    </Header>
  );
};

export default Navbar;
