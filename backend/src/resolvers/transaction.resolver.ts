import console from "console";
import Transaction from "src/models/transaction.model.js";
import { Context } from "src/types/user.js";

const transactionResolver = {
    Query: {
        getTransactions: async (_, __, context: Context) => {
            try {
                const user = await context.getUser();
                if(!user) throw new Error("Unauthorized access");
                const transactions = await Transaction.find({ userId: user._id });
                if (!transactions) {
                    throw new Error("No transactions found for this user");
                };

                return transactions;
            } catch (err) {
                console.error("Error getting the transactions: ", err);
                throw new Error(err.message || "Internal server error");
            }
        },
        getTransactionsStatistics: async (_, __, context: Context) => {
            if (!context.getUser()) throw new Error("Unauthorized");

			const userId = context.getUser()._id;
			const transactions = await Transaction.find({ userId });
			const categoryMap = {};

			transactions.forEach((transaction) => {
				if (!categoryMap[transaction.category]) {
					categoryMap[transaction.category] = 0;
				}
				categoryMap[transaction.category] += transaction.amount;
			});

			return Object.entries(categoryMap).map(([category, totalAmount]) => ({ category, totalAmount }));
        },
        getTransactionById: async (_, {transactionId}, context) => {
            if(!context.getUser()) throw new Error("Unauthorized access");
            try {
                const transaction = await Transaction.findById(transactionId);
                if (!transaction) {
                    throw new Error("Transaction not found");
                };
                return transaction;
            } catch (err) {
                console.error("Error getting the transaction: ", err);
                throw new Error(err.message || "Internal server error");
            }
        }
    },
    Mutation: {
        createTransaction: async (_, {input}, context) => {
            if(!context.getUser()) throw new Error("Unauthorized access");
            const { description, paymentType, category, amount, date } = input;
            if (!description || !paymentType || !category || !amount || !date) {
                throw new Error("All fields are required");
            }
            try {
                const newTransaction = await Transaction.create({userId: context.getUser()._id, ...input});

                if (!newTransaction) {
                    throw new Error("Error creating the transaction");
                };

                return newTransaction;
            } catch (err) {
                console.error("Error creating the transaction: ", err);
                throw new Error(err.message || "Internal server error");
            }
        },
        updateTransaction: async (_, {input}, context) => {
            if(!context.getUser()) throw new Error("Unauthorized access");
            const { transactionId } = input;
            try {
                const updatedTransaction = await Transaction.findByIdAndUpdate(transactionId, input, {new: true});
                
                if (!updatedTransaction) {
                    throw new Error("Transaction not found, couldn't update");
                };
                
                return updatedTransaction;
            } catch (err) {
                console.error("Error updating the transaction: ", err);
                throw new Error(err.message || "Internal server error");
            }
        },
        deleteTransaction: async (_, {transactionId}, context) => {
            if(!context.getUser()) throw new Error("Unauthorized access");

            try {
                const deletedTransaction = await Transaction.findByIdAndDelete(transactionId);
                if (!deletedTransaction) {
                    throw new Error("Transaction not found, couldn't delete");
                };
                console.log(deletedTransaction, "deletedTransaction")
                return deletedTransaction;
            } catch (err) {
                console.error("Error deleting the transaction: ", err);
                throw new Error(err.message || "Internal server error");
            }
        }
    }
};

export default transactionResolver;