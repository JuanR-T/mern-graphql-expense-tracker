import { ApolloClient } from "@apollo/client";
import { cache } from "./cache.init.js";
// This function initializes the Apollo client
export const client = new ApolloClient({
    uri: import.meta.env.VITE_NODE_ENV === 'development' ? 'http://localhost:4000/graphql' : '/graphql',
    cache,
    credentials: 'include', // It allows sending cookies with each requests to the server
});
