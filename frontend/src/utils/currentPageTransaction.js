import { client } from "../graphql/client/client.init";
import { GET_TRANSACTIONS } from "../graphql/queries/transaction.query";
export const currentPageTransaction = (paramsId) => {
    const cachedData = client.cache.readQuery({ query: GET_TRANSACTIONS });
    const transaction = cachedData?.getTransactions.find((item) => item._id === paramsId);
    return transaction;
};
