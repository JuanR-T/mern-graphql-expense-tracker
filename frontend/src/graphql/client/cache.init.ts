import { InMemoryCache } from '@apollo/client';

export const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                getTransactions: {
                    merge(existing = [], incoming) {
                        return incoming;
                    },
                },
            },
        },
    },
});
