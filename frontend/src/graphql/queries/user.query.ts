import { gql } from '@apollo/client';

export const GET_AUTHENTICATED_USER = gql`
    query GetAuthenticatedUser {
        authUser {
            _id
            gender
            name
            profilePicture
            username
        }
    }
`;

export const GET_USER_AND_TRANSACTIONS = gql`
    query GetUserAndTransactions($userId: ID!) {
        user(userId: $userId) {
            _id
            gender
            name
            profilePicture
            username
            # This is possible thanks to the relationship resolver in the User model
            transactions {
                _id
                amount
                category
                date
                description
                location
                paymentType
            }
        }
    }`;