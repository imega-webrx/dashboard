import Head from "next/head";
import { Layout } from "antd";

import "../index.less";
import Menu from "./Menu";
import CurrentFolderCtx from "../context/CurrentFolder";

const { Header, Content } = Layout;

const LayoutPage = (props) => (
    <CurrentFolderCtx.Provider value={props.currentFolder}>
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
    </CurrentFolderCtx.Provider>
);

export default LayoutPage;
