import { gql, useMutation } from "@apollo/client";
import { v4 } from "uuid";

const InitialFolderStorage = (client) => {
    const opts = {
        client: client,
        errorPolicy: "all",
    };

    const [updateFolderFn] = useMutation(updateFolderFN, opts);
    const [addFolderFn] = useMutation(addFolderFN, opts);

    return {
        openFolder: async (id) => {
            const { data } = await client.query({
                query: openFolderFN,
                variables: {
                    id: id,
                },
                ...opts,
            });

            return data;
        },
        saveFolder: (input) => {
            if (input.hasOwnProperty("id") && input.id.length > 0) {
                return updateFolderFn({ variables: { input: input } });
            }

            return addFolderFn({
                variables: {
                    input: {
                        id: v4(),
                        ...input,
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
