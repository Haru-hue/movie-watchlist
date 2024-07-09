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
        email
        watchlist
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($email: String!, $watchlist: [String], $avatarURL: String, $backgroundURL: String) {
    updateUser(email: $email, watchlist: $watchlist, avatarURL: $avatarURL, backgroundURL: $backgroundURL) {
      message
      success
      user {
        avatarURL
        watchlist
      }
    }
  }
`