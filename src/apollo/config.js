import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from "@apollo/client";

import fetch from "cross-fetch";
// import { cache } from "./cache";

// const graphqlHost =
//     process.env.STORYBOOK_GRAPHQL_HOST || "http://localhost:4000/graphql";

const graphqlHost = "http://localhost:4000/graphql";

const httpLink = new HttpLink({
    fetch,
    uri: graphqlHost,
});

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.from([httpLink]),
});

export default client;