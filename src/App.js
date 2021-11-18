import React from "react";
import "./App.css";
import { Layout } from "antd";

import TopHeader from "./features/Header/Header";
import Aside from "./features/Aside/Aside";
import TableData from "./components/Table/Table";

const { Content, Footer } = Layout;

function App() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <TopHeader />

      <Content style={{ padding: "0 20px" }}>
        <Layout
          className="site-layout-background"
          hasSider
          style={{ padding: "24px 0" }}
        >
          <Aside />

          <Content style={{ padding: "0 24px", minHeight: 280 }}>
            <TableData />
          </Content>
        </Layout>
      </Content>

      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  );
}

export default App;
