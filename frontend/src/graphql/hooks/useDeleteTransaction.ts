import { StoreObject, gql, useMutation } from "@apollo/client";
import { DELETE_TRANSACTION } from "../mutations/transaction.mutation";

/**
 * useDeleteTransaction
 *
 * Custom hook to delete a transaction using Apollo Client's useMutation.
 * Updates the Apollo cache to remove the deleted transaction and trigger a re-render, that avoids a network request.
 *
 * @returns {Object} An object containing `deleteTransaction` function and `loading` state.
 */
export const useDeleteTransaction = () => {
    const [deleteTransaction, { loading }] = useMutation(DELETE_TRANSACTION, {
            update(cache, { data: { deleteTransaction } }) {
                const deletedTransactionId = deleteTransaction._id;

                cache.modify({
                    fields: {
                        getTransactions(existingTransactionRefs = [], { readField }) {
                            const updatedTransactionRefs = existingTransactionRefs.filter(
                                (transactionRef: StoreObject) => readField('_id', transactionRef) !== deletedTransactionId
                            );

                            updatedTransactionRefs.forEach((transactionRef: StoreObject) => {
                                cache.writeFragment({
                                    id: cache.identify(transactionRef),
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
                                        _id: readField('_id', transactionRef), // Ensure _id is passed back
                                        description: readField('description', transactionRef),
                                        paymentType: readField('paymentType', transactionRef),
                                        category: readField('category', transactionRef),
                                        amount: readField('amount', transactionRef),
                                        location: readField('location', transactionRef),
                                        date: readField('date', transactionRef),
                                    }
                                });
                            });

                            return updatedTransactionRefs;
                        }
                    }
                });
            }
    });

    return {
        deleteTransaction,
        loading,
    };
}