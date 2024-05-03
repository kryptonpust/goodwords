import { gql } from "../__generated__";

export const LOGIN_USER = gql(`
  mutation Login($email: String!, $password: String!) {
    login(createLoginData: { email: $email, password: $password }) {
      user {
        id
      }
      token
    }
  }
`);

export const SIGN_UP_USER = gql(`
  mutation Register(
    $firstName: String!
    $lastName: String!
    $dateOfBirth: DateTime!
    $gender: Gender!
    $email: String!
    $password: String!
  ) {
    register(
      createRegisterInput: {
        firstName: $firstName
        lastName: $lastName
        dateOfBirth: $dateOfBirth
        gender: $gender
        email: $email
        password: $password
      }
    ) {
      user {
        id
      }
      token
    }
  }
`);