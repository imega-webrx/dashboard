import Head from "next/head";
import { Layout, Menu } from "antd";

import "../index.less";

const { Header, Content } = Layout;

const LayoutPage = (props) => (
    <Layout className="layout">
        <Head>
            <title>Create Next App</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
                <Menu.Item key={1}>Каталог</Menu.Item>
            </Menu>
        </Header>
        <Content style={{ padding: "2em" }}>{props.children}</Content>
    </Layout>
);

export default LayoutPage;
