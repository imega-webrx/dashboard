import React from "react";
import { ApolloProvider } from "@apollo/client";

import apolloClient from "../src/apollo-client";
import InitialFolderStorage from "./Folder";

const StorageContext = React.createContext({});

const InitialStorage = () => ({
    ...InitialFolderStorage(apolloClient),
});

const PageWrapper = ({ Component, pageProps, router, err }) => {
    console.log("PageWrapper");
    return (
        <ApolloProvider client={apolloClient}>
            {/*<StorageContext.Provider value={InitialStorage()}>*/}
            <Component {...pageProps} router={router} />
            {/*</StorageContext.Provider>*/}
        </ApolloProvider>
    );
};

export { InitialStorage, StorageContext, PageWrapper };
