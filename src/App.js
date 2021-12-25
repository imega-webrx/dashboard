import React from "react";
import "./App.less";
import { Layout } from "antd";
import { Routes, Route, Navigate } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import client from "./apollo/config";

import TopHeader from "./features/Header/Header";
import Aside from "./features/Aside/Aside";
import ProductsTable from "./pages/Product/Products";
import Product from "./pages/Product/Product";
import EditProduct from "./pages/Product/EditProduct";
import AddProduct from "./pages/Product/AddProduct";

const { Content, Footer } = Layout;

function App() {
    return (
        <ApolloProvider client={client}>
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
                                <Route
                                    path="/"
                                    element={<Navigate to="/products" />}
                                />
                                <Route
                                    path="/products"
                                    element={<ProductsTable />}
                                />
                                <Route
                                    path="/product/:id"
                                    element={<Product />}
                                />
                                <Route
                                    path="/product/edit/:id"
                                    element={<EditProduct />}
                                />
                                <Route
                                    path="/product/add"
                                    element={<AddProduct />}
                                />
                            </Routes>
                        </Content>
                    </Layout>
                </Content>

                <Footer style={{ textAlign: "center" }}>
                    Ant Design ©2018 Created by Ant UED
                </Footer>
            </Layout>
        </ApolloProvider>
    );
}

export default App;
