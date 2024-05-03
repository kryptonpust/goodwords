/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n                fragment NewComment on CommentModel {\n                  id\n                  comment\n                  isMine\n                  user {\n                    id\n                    firstName\n                    lastName\n                  }\n                }\n              ": types.NewCommentFragmentDoc,
    "\n                  fragment NewPost on PostModel {\n                    id\n                    content\n                    categories\n                    isLiked\n                    isMine\n                    likes\n                    user {\n                      id\n                      firstName\n                      lastName\n                    }\n                  }\n                ": types.NewPostFragmentDoc,
    "\n  mutation Login($email: String!, $password: String!) {\n    login(createLoginData: { email: $email, password: $password }) {\n      user {\n        id\n        fullName\n      }\n      token\n    }\n  }\n": types.LoginDocument,
    "\n  mutation Register(\n    $firstName: String!\n    $lastName: String!\n    $dateOfBirth: DateTime!\n    $gender: Gender!\n    $email: String!\n    $password: String!\n  ) {\n    register(\n      createRegisterInput: {\n        firstName: $firstName\n        lastName: $lastName\n        dateOfBirth: $dateOfBirth\n        gender: $gender\n        email: $email\n        password: $password\n      }\n    ) {\n      user {\n        id\n        fullName\n      }\n      token\n    }\n  }\n": types.RegisterDocument,
    "\nmutation CreatePost($content: String!, $category: [String!]!) {\n  createPost(createPostInputData: { content: $content, categories: $category }) {\n    id\n    content\n    isMine\n  }\n}\n": types.CreatePostDocument,
    "\nmutation UpdatePost($postId: Int!, $content: String!, $categories: [String!]!) {\n  updatePost(postId: $postId, updatePostInputData: { content: $content, categories: $categories }) {\n    id\n    content\n    categories\n  }\n}\n": types.UpdatePostDocument,
    "\nmutation DeletePost($postId: Int!) {\n  deletePost(postId: $postId) {\n    id\n  }\n}\n": types.DeletePostDocument,
    "\nmutation ToggleLike($postId: Float!) {\n  toggleLike(postId: $postId) {\n    id\n    isLiked\n    likes\n  }\n}\n": types.ToggleLikeDocument,
    "\nmutation CreateComment($postId: Float!, $comment: String!) {\n  createComment(postId: $postId,createCommentInputData: { comment: $comment }) {\n    id\n    comment\n  }\n}\n": types.CreateCommentDocument,
    "\n  query Categories {\n    categories\n  }\n": types.CategoriesDocument,
    "\n  query GetPosts {\n    posts {\n      id\n      content\n      categories\n      isLiked\n      isMine\n      likes\n      user{\n        id\n        firstName\n        lastName\n        fullName\n      }\n    }\n  }\n": types.GetPostsDocument,
    "\n  query GetPostById($id: Int!) {\n    postById(id: $id) {\n      id\n      content\n      categories\n      isLiked\n      isMine\n      likes\n      views\n      comments{\n        id\n        comment\n        isMine\n        user{\n          id\n          fullName\n        }\n      }\n      user {\n        id\n        firstName\n        lastName\n        fullName\n      }\n    }\n  }\n": types.GetPostByIdDocument,
    "\n  query GetActivitiesByActivityType($activityType: ActivityType) {\n    getActivityLogs(activity: $activityType) {\n      id\n      activity\n      createdAt\n      post{\n        id\n        content\n        categories\n        isMine\n        user{\n          fullName\n        }\n      }\n    }\n  }\n": types.GetActivitiesByActivityTypeDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n                fragment NewComment on CommentModel {\n                  id\n                  comment\n                  isMine\n                  user {\n                    id\n                    firstName\n                    lastName\n                  }\n                }\n              "): (typeof documents)["\n                fragment NewComment on CommentModel {\n                  id\n                  comment\n                  isMine\n                  user {\n                    id\n                    firstName\n                    lastName\n                  }\n                }\n              "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n                  fragment NewPost on PostModel {\n                    id\n                    content\n                    categories\n                    isLiked\n                    isMine\n                    likes\n                    user {\n                      id\n                      firstName\n                      lastName\n                    }\n                  }\n                "): (typeof documents)["\n                  fragment NewPost on PostModel {\n                    id\n                    content\n                    categories\n                    isLiked\n                    isMine\n                    likes\n                    user {\n                      id\n                      firstName\n                      lastName\n                    }\n                  }\n                "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Login($email: String!, $password: String!) {\n    login(createLoginData: { email: $email, password: $password }) {\n      user {\n        id\n        fullName\n      }\n      token\n    }\n  }\n"): (typeof documents)["\n  mutation Login($email: String!, $password: String!) {\n    login(createLoginData: { email: $email, password: $password }) {\n      user {\n        id\n        fullName\n      }\n      token\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Register(\n    $firstName: String!\n    $lastName: String!\n    $dateOfBirth: DateTime!\n    $gender: Gender!\n    $email: String!\n    $password: String!\n  ) {\n    register(\n      createRegisterInput: {\n        firstName: $firstName\n        lastName: $lastName\n        dateOfBirth: $dateOfBirth\n        gender: $gender\n        email: $email\n        password: $password\n      }\n    ) {\n      user {\n        id\n        fullName\n      }\n      token\n    }\n  }\n"): (typeof documents)["\n  mutation Register(\n    $firstName: String!\n    $lastName: String!\n    $dateOfBirth: DateTime!\n    $gender: Gender!\n    $email: String!\n    $password: String!\n  ) {\n    register(\n      createRegisterInput: {\n        firstName: $firstName\n        lastName: $lastName\n        dateOfBirth: $dateOfBirth\n        gender: $gender\n        email: $email\n        password: $password\n      }\n    ) {\n      user {\n        id\n        fullName\n      }\n      token\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation CreatePost($content: String!, $category: [String!]!) {\n  createPost(createPostInputData: { content: $content, categories: $category }) {\n    id\n    content\n    isMine\n  }\n}\n"): (typeof documents)["\nmutation CreatePost($content: String!, $category: [String!]!) {\n  createPost(createPostInputData: { content: $content, categories: $category }) {\n    id\n    content\n    isMine\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation UpdatePost($postId: Int!, $content: String!, $categories: [String!]!) {\n  updatePost(postId: $postId, updatePostInputData: { content: $content, categories: $categories }) {\n    id\n    content\n    categories\n  }\n}\n"): (typeof documents)["\nmutation UpdatePost($postId: Int!, $content: String!, $categories: [String!]!) {\n  updatePost(postId: $postId, updatePostInputData: { content: $content, categories: $categories }) {\n    id\n    content\n    categories\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation DeletePost($postId: Int!) {\n  deletePost(postId: $postId) {\n    id\n  }\n}\n"): (typeof documents)["\nmutation DeletePost($postId: Int!) {\n  deletePost(postId: $postId) {\n    id\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation ToggleLike($postId: Float!) {\n  toggleLike(postId: $postId) {\n    id\n    isLiked\n    likes\n  }\n}\n"): (typeof documents)["\nmutation ToggleLike($postId: Float!) {\n  toggleLike(postId: $postId) {\n    id\n    isLiked\n    likes\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation CreateComment($postId: Float!, $comment: String!) {\n  createComment(postId: $postId,createCommentInputData: { comment: $comment }) {\n    id\n    comment\n  }\n}\n"): (typeof documents)["\nmutation CreateComment($postId: Float!, $comment: String!) {\n  createComment(postId: $postId,createCommentInputData: { comment: $comment }) {\n    id\n    comment\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Categories {\n    categories\n  }\n"): (typeof documents)["\n  query Categories {\n    categories\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetPosts {\n    posts {\n      id\n      content\n      categories\n      isLiked\n      isMine\n      likes\n      user{\n        id\n        firstName\n        lastName\n        fullName\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetPosts {\n    posts {\n      id\n      content\n      categories\n      isLiked\n      isMine\n      likes\n      user{\n        id\n        firstName\n        lastName\n        fullName\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetPostById($id: Int!) {\n    postById(id: $id) {\n      id\n      content\n      categories\n      isLiked\n      isMine\n      likes\n      views\n      comments{\n        id\n        comment\n        isMine\n        user{\n          id\n          fullName\n        }\n      }\n      user {\n        id\n        firstName\n        lastName\n        fullName\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetPostById($id: Int!) {\n    postById(id: $id) {\n      id\n      content\n      categories\n      isLiked\n      isMine\n      likes\n      views\n      comments{\n        id\n        comment\n        isMine\n        user{\n          id\n          fullName\n        }\n      }\n      user {\n        id\n        firstName\n        lastName\n        fullName\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetActivitiesByActivityType($activityType: ActivityType) {\n    getActivityLogs(activity: $activityType) {\n      id\n      activity\n      createdAt\n      post{\n        id\n        content\n        categories\n        isMine\n        user{\n          fullName\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetActivitiesByActivityType($activityType: ActivityType) {\n    getActivityLogs(activity: $activityType) {\n      id\n      activity\n      createdAt\n      post{\n        id\n        content\n        categories\n        isMine\n        user{\n          fullName\n        }\n      }\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;