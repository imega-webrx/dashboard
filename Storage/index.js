import React from "react";
import { ApolloProvider } from "@apollo/client";

import apolloClient from "../src/apollo-client";
import InitialFolderStorage from "./Folder";

const StorageContext = React.createContext({});

const InitialStorage = () => ({
    ...InitialFolderStorage(apolloClient),
});

const Wrapper = ({ Component, props }) => (
    <ApolloProvider client={apolloClient}>
        <Component {...props} />
    </ApolloProvider>
);

export { InitialStorage, StorageContext, Wrapper };
