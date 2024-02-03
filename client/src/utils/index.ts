import { gql } from "@apollo/client";

export const REGISTER = gql`
  mutation ($name: String!, $email: String!, $password: String!) {
    addUser(name: $name, email: $email, password: $password) {
      message
      success
      verificationCode
    }
  }
`;

export const VERIFY_USER = gql`
  mutation ($email: String!, $verificationCode: Int!) {
    verifyUser(email: $email, verificationCode: $verificationCode) {
      message
      success
    }
  }
`;

export const UPDATE_USER = gql`
  mutation (
    $email: String!
    $name: String
    $password: String
    $watchlist: [String]
    $username: String
    $avatarURL: String
    $backgroundURL: String
  ) {
    updateUser(
      name: $name
      password: $password
      email: $email
      watchlist: $watchlist
      username: $username
      avatarURL: $avatarURL
      backgroundURL: $backgroundURL
    ) {
      message
      success
    }
  }
`;

export const GET_USER = gql`
  query User(
    $email: String!
  ) {
    user(email: $email) {
      name
      email
      watchlist
      username
      avatarURL
      backgroundURL
    }
  }
`

export const FIND_USER = gql`
  mutation findUser (
    $email: String!
  ) {
    findUser(email: $email) {
      message
      success
      user {
        email
        avatarURL
      }
    }
  }
`