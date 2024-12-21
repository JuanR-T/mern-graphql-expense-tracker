import { gql } from '@apollo/client';

const GET_AUTHENTICATED_USER = gql`
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

export default GET_AUTHENTICATED_USER;