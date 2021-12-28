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
        updateFolder: (input) =>
            updateFolderFn({
                variables: {
                    input: {
                        id: v4(),
                        ...input,
                    },
                },
            }),
        addFolder: (input) =>
            addFolderFn({
                variables: {
                    input: {
                        id: v4(),
                        ...input,
                    },
                },
            }),
    };
};

const updateFolderFN = gql`
    mutation updateFolder($id: ID!, $input: FolderInput!) {
        updateFolder(id: $id, input: $input)
    }
`;

const addFolderFN = gql`
    mutation AddFolder($input: FolderInput!) {
        addFolder(input: $input)
    }
`;

export default InitialFolderStorage;
