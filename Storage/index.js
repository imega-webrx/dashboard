import React from "react";
import { ApolloProvider } from "@apollo/client";

import apolloClient from "../src/apollo-client";
import InitialFolderStorage from "./Folder";

const StorageContext = React.createContext({});

const InitialStorage = () => ({
    ...InitialFolderStorage(apolloClient),
});

const PageWrapper = ({ Component, pageProps, router, err }) => (
    <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
    </ApolloProvider>
);

export { InitialStorage, StorageContext, PageWrapper };
