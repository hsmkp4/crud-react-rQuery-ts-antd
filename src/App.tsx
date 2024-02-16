import { Layout } from "antd";
import Navbar from "./components/Navbar";
import MainContent from "./components/MainContent";

const App = () => {
  return (
    <Layout
      style={{
        overflowX: "hidden",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Navbar />
      <MainContent />
    </Layout>
  );
};

export default App;
