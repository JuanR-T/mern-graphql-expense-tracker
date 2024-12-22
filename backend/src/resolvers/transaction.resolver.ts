import Transaction from "src/models/transaction.model";

const transactionResolver = {
    Query: {
        transactions: async (_, context) => {
            try {
                if(!context.getUser()) throw new Error("Unauthorized access");
                const userId = await context.getUser()._id;
                const transactions = await Transaction.find({userId});
                if (!transactions) {
                    throw new Error("No transactions found");
                };
                return transactions;
            } catch (err) {
                console.error("Error getting the transactions: ", err);
                throw new Error(err.message || "Internal server error");
            }
        },
        transaction: async (_, {transactionId}, context) => {
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
                return deletedTransaction;
            } catch (err) {
                console.error("Error deleting the transaction: ", err);
                throw new Error(err.message || "Internal server error");
            }
        }
    }
};

export default transactionResolver;