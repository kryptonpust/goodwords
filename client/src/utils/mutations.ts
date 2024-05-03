import { gql } from "../__generated__";

export const LOGIN_USER = gql(`
  mutation Login($email: String!, $password: String!) {
    login(createLoginData: { email: $email, password: $password }) {
      user {
        id
        fullName
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
        fullName
      }
      token
    }
  }
`);

export const CREATE_POST = gql(`
mutation CreatePost($content: String!, $category: [String!]!) {
  createPost(createPostInputData: { content: $content, categories: $category }) {
    id
    content
    isMine
  }
}
`);

export const UPDATE_POST = gql(`
mutation UpdatePost($postId: Int!, $content: String!, $categories: [String!]!) {
  updatePost(postId: $postId, updatePostInputData: { content: $content, categories: $categories }) {
    id
    content
    categories
  }
}
`);

export const DELETE_POST = gql(`
mutation DeletePost($postId: Int!) {
  deletePost(postId: $postId) {
    id
  }
}
`);

export const TOGGLE_LIKE = gql(`
mutation ToggleLike($postId: Float!) {
  toggleLike(postId: $postId) {
    id
    isLiked
    likes
  }
}
`);

export const CREATE_COMMENT = gql(`
mutation CreateComment($postId: Float!, $comment: String!) {
  createComment(postId: $postId,createCommentInputData: { comment: $comment }) {
    id
    comment
  }
}
`);
