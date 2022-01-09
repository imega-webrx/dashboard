import { graphql } from "@apollo/client/react/hoc";
import { gql } from "@apollo/client";
import { v4 } from "uuid";

const InitialFolderStorage = (client) => {
    const opts = {
        client: client,
        errorPolicy: "all",
    };

    return {
        openFolder: graphql(openFolderFN, {
            options: () => ({
                // errorPolicy: "ignore",
                ssr: false,
                variables: {
                    id: "ed4bf8f5-8b4e-435b-83cc-27feada6136a",
                },
            }),
            props: ({ data }) => ({
                ...data,
                reopenFolder: (id) => data.refetch({ variables: id }),
            }),
        }),
        saveFolder: async (input) => {
            if (input.hasOwnProperty("id") && typeof input.id !== "undefined") {
                return await client.mutate({
                    ...opts,
                    mutation: updateFolderFN,
                    variables: {
                        input: input,
                    },
                });
            }

            return await client.mutate({
                ...opts,
                mutation: addFolderFN,
                variables: {
                    input: {
                        ...input,
                        id: v4(),
                    },
                },
            });
        },
    };
};

const openFolderFN = gql`
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
`;

const updateFolderFN = gql`
    mutation updateFolder($input: FolderInput!) {
        updateFolder(input: $input)
    }
`;

const addFolderFN = gql`
    mutation AddFolder($input: FolderInput!) {
        addFolder(input: $input)
    }
`;

export default InitialFolderStorage;
