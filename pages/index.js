import { gql } from "@apollo/client";
import { Layout, Row, Col } from "antd";

import client from "../src/apollo-client";
import PageLayout from "../Page/Layout";
import "../Page/index.less";
import Panel from "../Panel";
import AppState, { InitApp } from "../GlobalContext/AppState";
import { InitialStorage, StorageContext } from "../Storage";

const Storage = InitialStorage(client);
const app = InitApp(Storage);

const PANEL_LEFT = "left";
const PANEL_RIGHT = "right";

console.log("INDEX.js");

const MainPage = (props) => {
    console.log("MainPage", props);
    app.registerRouter(props.router);

    return (
        <PageLayout {...props}>
            <Row>
                <Col span={12}>
                    <Layout.Content style={{ padding: "2em" }}>
                        <LeftPanelWithCatalog {...props} />
                    </Layout.Content>
                </Col>
                <Col span={12}>
                    <Layout.Content style={{ padding: "2em" }}>
                        <RightPanelWithCatalog {...props} />
                    </Layout.Content>
                </Col>
            </Row>
        </PageLayout>
    );
};

const LeftPanel = (props) => (
    <Panel {...app.registerPanel(props, PANEL_LEFT)} />
);
const LeftPanelWithCatalog = Storage.initFolder(LeftPanel);

const RightPanel = (props) => (
    <Panel {...app.registerPanel(props, PANEL_RIGHT)} />
);
const RightPanelWithCatalog = Storage.initFolder(RightPanel);

export async function getServerSideProps1() {
    const rootFolder = "ed4bf8f5-8b4e-435b-83cc-27feada6136a";
    const { data } = await client
        .query({
            query: gql`
                query catalog($id: ID) {
                    catalog(id: $id) {
                        ... on Folder {
                            __typename
                            id
                            title
                            description
                        }
                        ... on Product {
                            __typename
                            id
                            title
                            description
                        }
                    }
                }
            `,
            variables: {
                id: rootFolder,
            },
            fetchPolicy: "network-only",
            errorPolicy: "all",
        })
        .catch((e) => {
            console.log(e);
            return {
                data: {
                    catalog: [
                        {
                            __typename: "Product",
                            id: "1121312",
                            title: "Product 1",
                            description: "1234314",
                        },
                        {
                            __typename: "Folder",
                            id: "1121312",
                            title: "Folder 1",
                            description: "1234314",
                        },
                    ],
                },
            };
        });

    return {
        props: {
            fromSSR: true,
            panel: {
                [PANEL_LEFT]: {
                    currentFolder: {
                        id: rootFolder,
                        isRoot: true,
                    },
                },
                [PANEL_RIGHT]: {
                    currentFolder: {
                        id: rootFolder,
                        isRoot: true,
                    },
                },
            },
            catalog: data.catalog,
        },
    };
}

export default MainPage;
