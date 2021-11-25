import React from "react";
import "./App.css";
import { Layout } from "antd";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";

import TopHeader from "./features/Header/Header";
import Aside from "./features/Aside/Aside";
import ProductsTable from "./pages/Product/Products";
import Product from "./pages/Product/Product";
import EditProduct from "./pages/Product/EditProduct";

const { Content, Footer } = Layout;

function App() {
  return (
    <BrowserRouter>
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
              <Routes>
                <Route path="/" element={<Navigate to="/products" />} />
                <Route path="/products" element={<ProductsTable />} />
                <Route path="/product/:id" element={<Product />} />
                <Route path="/product/edit/:id" element={<EditProduct />} />
              </Routes>
            </Content>
          </Layout>
        </Content>

        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
