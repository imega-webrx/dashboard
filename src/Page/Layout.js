import Head from "next/head";
import { Layout } from "antd";

import "../index.less";
import Menu from "./Menu";

const { Header, Content } = Layout;

const LayoutPage = (props) => (
    <Layout className="layout">
        <Head>
            <title>Create Next App</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header>
            <Menu />
        </Header>
        <Content style={{ padding: "2em" }}>{props.children}</Content>
    </Layout>
);

export default LayoutPage;
