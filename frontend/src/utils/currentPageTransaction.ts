import { client } from "../graphql/client/client.init";
import { GET_TRANSACTIONS } from "../graphql/queries/transaction.query";
import { Transaction } from "../types/transaction.types";

export const currentPageTransaction = (paramsId: string | undefined) => {
    const cachedData: any = client.cache.readQuery({ query: GET_TRANSACTIONS });
    const transaction: Transaction = cachedData?.getTransactions.find(
        (item: Transaction) => item._id === paramsId
    );

    return transaction;
}