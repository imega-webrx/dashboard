import { gql } from "@apollo/client";
import client from "../src/apollo-client";
import { Table } from "antd";

import Layout from "../src/Page/Layout";
import "../src/index.less";

const MainPage = (props) => {
    return (
        <Layout {...props}>
            <Table dataSource={props.catalog} columns={columns} />
        </Layout>
    );
};

const columns = [
    {
        title: "__typename",
        dataIndex: "__typename",
        key: "__typename",
    },
    {
        title: "Title",
        dataIndex: "title",
        key: "title",
    },
    {
        title: "Description",
        dataIndex: "description",
        key: "description",
    },
];

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
            return { data: { catalog: [] } };
        });

    return {
        props: {
            catalog: data.catalog,
            currentFolder: rootFolder,
        },
    };
}

export default MainPage;
