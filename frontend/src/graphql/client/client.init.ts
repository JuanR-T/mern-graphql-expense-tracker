import { ApolloClient } from "@apollo/client";
import { cache } from "./cache.init.js";

// This function initializes the Apollo client
export const client = new ApolloClient({
    uri: import.meta.env.VITE_GRAPHQL_URI,
    cache,
    credentials: 'include', // It allows sending cookies with each requests to the server
});