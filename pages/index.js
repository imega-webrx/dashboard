import { gql } from "@apollo/client";
import client from "../src/apollo-client";
import { Table } from "antd";

import Layout from "../src/Page/Layout";
import "../src/index.less";

const MainPage = (props) => {
    return (
        <Layout {...props}>
            <Table dataSource={props.folders} columns={columns} />
        </Layout>
    );
};

const columns = [
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
                query GetFolders($in: [ID]!) {
                    getFolders(uuIds: $in) {
                        id
                        title
                        description
                    }
                }
            `,
            variables: {
                in: [rootFolder],
            },
            errorPolicy: "all",
        })
        .catch((e) => {
            console.log(e);
            return { data: { getFolders: [], currentFolder: rootFolder } };
        });

    return {
        props: {
            folders: data.getFolders,
            currentFolder: data.currentFolder,
        },
    };
}

export default MainPage;
