import Head from "next/head";
import { Layout, Row, Col } from "antd";

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
            <Row>
                <Col span={12}>
                    <Content style={{ padding: "2em" }}>
                        {props.children}
                    </Content>
                </Col>
                <Col span={12}>
                    <Content style={{ padding: "2em" }}>
                        {props.children}
                    </Content>
                </Col>
            </Row>
        </Layout>
    </CurrentFolderCtx.Provider>
);

export default LayoutPage;
