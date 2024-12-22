import { useMutation } from "@apollo/client";
import { CREATE_TRANSACTION } from "../mutations/transaction.mutation";
import { GET_TRANSACTION_STATISTICS, GET_TRANSACTIONS } from "../queries/transaction.query";

/**
 * Custom hook to create a transaction using Apollo Client's useMutation.
 * Updates the Apollo cache to include the new transaction, and trigger a re-render, that avoids a network request.
 *
 * @returns {Object} An object containing `createTransaction` function and `loading` state.
 */
export const useCreateTransaction = () => {
    const [createTransaction, { loading }] = useMutation(CREATE_TRANSACTION, {
        update(cache, { data: { createTransaction } }) {
            const newTransaction = createTransaction;
            const existingData: any = cache.readQuery({ query: GET_TRANSACTIONS });

            if (existingData) {
                cache.writeQuery({
                    query: GET_TRANSACTIONS,
                    data: {
                        getTransactions: [...existingData.getTransactions, newTransaction],
                    },
                });
            }
        },
        refetchQueries: [{ query: GET_TRANSACTION_STATISTICS }],
    },);

    return { createTransaction, loading };
};
