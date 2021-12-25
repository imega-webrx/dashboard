import { ApolloClient, InMemoryCache } from "@apollo/client";

const addr =
    typeof window === "undefined" ? "http://localhost" : "https://webrx.ru";

const client = new ApolloClient({
    uri: `${addr}/graphql`,
    cache: new InMemoryCache(),
});

export default client;
