import { gql } from "@apollo/client";
import client from "../src/apollo-client";

import Layout from "../src/Page/Layout";
import "../src/index.less";
import Panel from "../Panel";

const MainPage = (props) => {
    return (
        <Layout {...props}>
            <Panel />
        </Layout>
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
                            title: "sdfsdf",
                            description: "1234314",
                        },
                        {
                            __typename: "Folder",
                            id: "1121312",
                            title: "sdfsdf",
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
