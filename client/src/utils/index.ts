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
