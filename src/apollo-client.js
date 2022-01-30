import { ApolloClient, InMemoryCache } from "@apollo/client";

const addr = "http://localhost:4000";

const client = new ApolloClient({
    ssrMode: typeof window === "undefined",
    uri: `${addr}/graphql`,
    cache: new InMemoryCache(),
});

export default client;
