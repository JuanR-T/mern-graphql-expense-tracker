import { gql } from '@apollo/client';

export const SIGN_UP = gql`
    mutation SignUp($input: SignUpInput!) {
        signUp(input: $input) {
            _id
            name
            gender
            username
            profilePicture
        }
    }
`;
export const LOGIN = gql`
    mutation Login($input: LoginInput!) {
        login(input: $input) {
            _id
            name
            gender
            username
            profilePicture
        }
    }
`;

export const LOGOUT = gql`
    mutation Logout {
        logout {
            message
        }
    }
`;