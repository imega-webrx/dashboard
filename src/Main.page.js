import React from "react";
import "./App.css";
import TopHeader from "./features/Header/Header";
import { Layout } from "antd";

const { Footer } = Layout;

const Main = () => {
  return (
    <div>
      <TopHeader />

      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </div>
  );
};

export default Main;
