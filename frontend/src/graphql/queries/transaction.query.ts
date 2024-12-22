import { gql } from "@apollo/client";

export const GET_TRANSACTIONS = gql`
    query GetTransactions {
        GetTransactions {
            _id
            description
            paymentType
            category
            amount
            location
            date
        }
    }
`;

export const GET_TRANSACTION_BY_ID = gql`
    query GetTransactionById($transactionId: ID!) {
        GetTransactionsById(transaction: $transactionId) {
            description
            paymentType
            category
            amount
            location
            date
        }
    }
`;