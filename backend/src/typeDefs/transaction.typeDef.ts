const transactionTypeDef = `#graphql
    type Transaction {
        _id: ID!
        userId: ID!
        description: String!
        paymentType: String!
        category: String!
        amount: Float!
        location: String!
        date: String!
    }

    type Query {
        getTransactions: [Transaction!]
        getTransactionById(transactionId: ID!): Transaction!
        getTransactionsStatistics: [CategoryStatistics!]
    }
    
    type CategoryStatistics {
        category: String!
        totalAmount: Float!
    }
    
    type Mutation {
        createTransaction(input: CreateTransactionInput!): Transaction!
        updateTransaction(input: UpdateTransactionInput!): Transaction!
        deleteTransaction(transactionId: ID!): Transaction!
    }

    input CreateTransactionInput {
        description: String!
        paymentType: String!
        category: String!
        amount: Float!
        date: String!
        location: String
    }

    input UpdateTransactionInput {
        transactionId: ID!
        description: String
        paymentType: String
        category: String
        amount: Float
        date: String
        location: String
    }
`

export default transactionTypeDef;