import { gql } from "@apollo/client";

// export const REGISTER_USER = gql``;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      message
      success
      token
      user {
        name
        username
        avatarURL
        name
        watchlist
      }
    }
  }
`;

