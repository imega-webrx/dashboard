import Head from "next/head";
import { Layout } from "antd";

import "./index.less";
import Menu from "./Menu";
import CurrentFolderCtx from "../src/context/CurrentFolder";

const { Header } = Layout;

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
            {props.children}
        </Layout>
    </CurrentFolderCtx.Provider>
);

export default LayoutPage;
