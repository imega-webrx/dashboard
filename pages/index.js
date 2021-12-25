import { gql } from "@apollo/client";
import client from "../src/apollo-client";
import { Table } from "antd";

import Layout from "../src/Page/Layout";
import "../src/index.less";

const MainPage = ({ folders }) => {
    return (
        <Layout>
            <Table dataSource={folders} columns={columns} />
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
        key: "description",
    },
];

export async function getServerSideProps() {
    const { data } = await client.query({
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
            in: ["ed4bf8f5-8b4e-435b-83cc-27feada6136a"],
        },
    });

    return {
        props: {
            folders: data.getFolders,
        },
    };
}

export default MainPage;
