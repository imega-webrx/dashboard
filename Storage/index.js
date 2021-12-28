import React from "react";

import InitialFolderStorage from "./Folder";

const StorageContext = React.createContext({});

const InitialStorage = (apolloClient) => ({
    ...InitialFolderStorage(apolloClient),
});

export { InitialStorage, StorageContext };
