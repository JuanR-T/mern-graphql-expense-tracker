import { gql, useMutation } from "@apollo/client";
import { currentPageTransaction } from "../../utils/currentPageTransaction"; // Import your utility function
import { client } from "../client/client.init";
import { UPDATE_TRANSACTION } from "../mutations/transaction.mutation";

/**
 * useUpdateTransaction
 *
 * Custom hook to update a transaction using Apollo Client's useMutation.
 * Updates the Apollo cache to reflect the updated transaction, and trigger a re-render, that avoids a network request.
 *
 * @returns {Object} An object containing `updateTransaction` function and `loading` state.
 */
export const useUpdateTransaction = () => {
    const [updateTransaction, { loading }] = useMutation(UPDATE_TRANSACTION, {
        onCompleted: (data) => {
            const updatedTransaction = data.updateTransaction;
            const currentTransaction = currentPageTransaction(updatedTransaction._id);

            if (currentTransaction) {
                const cacheId = client.cache.identify({
                    __typename: "Transaction",
                    _id: currentTransaction._id,
                });

                if (cacheId) {
                    client.cache.writeFragment({
                        id: cacheId,
                        fragment: gql`
                            fragment UpdatedTransaction on Transaction {
                                _id
                                description
                                paymentType
                                category
                                amount
                                location
                                date
                            }
                        `,
                        data: {
                            ...currentTransaction,
                            ...updatedTransaction,
                        },
                    });
                }
            }
        },
    });

    return {
        updateTransaction,
        loading,
    };
};
