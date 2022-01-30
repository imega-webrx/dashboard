import { graphql } from "@apollo/client/react/hoc";
import { gql } from "@apollo/client";
import { v4 } from "uuid";

const InitialFolderStorage = (client) => {
    console.log("InitialFolderStorage");
    const opts = {
        client: client,
        errorPolicy: "all",
    };

    const rootFolderID = "ed4bf8f5-8b4e-435b-83cc-27feada6136a";

    return {
        initFolder: graphql(openFolderFN, {
            options: () => ({
                // errorPolicy: "ignore",
                ssr: false,
                variables: {
                    id: rootFolderID,
                },
            }),
            props: ({ data }) => {
                console.log("initFolder loading=", data);
                return {
                    ...data,
                    openFolder: (id) => data.refetch({ id }),
                    rootFolder: () => data.refetch({ id: rootFolderID }),
                };
            },
        }),
        saveFolder: async (input) => {
            if (input.hasOwnProperty("id") && typeof input.id !== "undefined") {
                const res = await client.mutate({
                    ...opts,
                    mutation: updateFolderFN,
                    variables: {
                        input: input,
                    },
                });

                return { ...res, ...input };
            }

            const id = v4();
            const res = await client.mutate({
                ...opts,
                mutation: addFolderFN,
                variables: {
                    input: {
                        ...input,
                        id,
                    },
                },
            });

            return {
                ...res,
                input: { ...input, id },
            };
        },
        moveToFolder: async (input) => {
            return await client.mutate({
                ...opts,
                mutation: moveToFolderFN,
                variables: { input },
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

const moveToFolderFN = gql`
    mutation MoveToFolder($input: TripleInput!) {
        moveToFolder(input: $input)
    }
`;

export default InitialFolderStorage;
