import { gql, useMutation } from "@apollo/client";

const InitialFolderStorage = (client) => {
    const opts = {
        client: client,
        errorPolicy: "all",
    };

    const [updateFolder] = useMutation(updateFolderFN, opts);
    const [addFolder] = useMutation(addFolderFN, opts);

    return {
        updateFolder,
        addFolder,
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
