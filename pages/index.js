import { gql } from "@apollo/client";
import client from "../src/apollo-client";
import { Button } from "antd";

import Layout from "../src/Page/Layout";
import "../src/index.less";

const MainPage = ({ folders }) => (
    <Layout>
        <h1>
            Main<Button type="primary">{folders[0].title}</Button>
        </h1>
    </Layout>
);

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
