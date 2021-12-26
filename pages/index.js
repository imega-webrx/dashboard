import { gql } from "@apollo/client";
import client from "../src/apollo-client";
import { Layout, Row, Col } from "antd";

import PageLayout from "../Page/Layout";
import "../Page/index.less";
import Panel from "../Panel";

const MainPage = (props) => {
    return (
        <PageLayout {...props}>
            <Row>
                <Col span={12}>
                    <Layout.Content style={{ padding: "2em" }}>
                        <Panel {...props} />
                    </Layout.Content>
                </Col>
                <Col span={12}>
                    <Layout.Content style={{ padding: "2em" }}>
                        <Panel {...props} />
                    </Layout.Content>
                </Col>
            </Row>
        </PageLayout>
    );
};

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

export default MainPage;
