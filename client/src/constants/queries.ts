import { gql } from "@apollo/client";

// export const REGISTER_USER = gql``;

export const LOGIN_USER = gql`
  mutation findUser($email: String!, $password: String) {
    findUser(email: $email, password: $password) {
      message
      success
      token
    }
  }
`;

