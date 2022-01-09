import { gql } from "@apollo/client";
import { Layout, Row, Col } from "antd";

import client from "../src/apollo-client";
import PageLayout from "../Page/Layout";
import "../Page/index.less";
import Panel from "../Panel";
import AppState from "../GlobalContext/AppState";
import { InitialStorage, StorageContext } from "../Storage";

const Storage = InitialStorage(client);

const MainPage = (props) => {
    const appState = {
        panel: {
            left: {
                currentFolder: {
                    id: props.currentFolder,
                    isRoot: true,
                },
                editFolder: {},
                openFolder: () => {},
            },
            right: {
                currentFolder: {
                    id: props.currentFolder,
                    isRoot: true,
                },
            },
        },
    };

    return (
        <StorageContext.Provider value={Storage}>
            <PageLayout {...props}>
                <AppState.Provider value={appState}>
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
                </AppState.Provider>
            </PageLayout>
        </StorageContext.Provider>
    );
};

const LeftPanel = (props) => <Panel {...props} type={"left"} />;
const LeftPanelWithCatalog = Storage.openFolder(LeftPanel);

const RightPanel = (props) => <Panel {...props} type={"right"} />;
const RightPanelWithCatalog = Storage.openFolder(RightPanel);

export async function getServerSideProps() {
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
            catalog: data.catalog,
            currentFolder: rootFolder,
        },
    };
}

export default Storage.openFolder(MainPage);
