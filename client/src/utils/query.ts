import { gql } from "../__generated__";

export const CATEGORIES = gql(`
  query Categories {
    categories
  }
`);

export const GET_POSTS = gql(`
  query GetPosts {
    posts {
      id
      content
      categories
      isLiked
      isMine
      likes
      user{
        id
        firstName
        lastName
        fullName
      }
    }
  }
`);

export const GET_POST_BY_ID = gql(`
  query GetPostById($id: Int!) {
    postById(id: $id) {
      id
      content
      categories
      isLiked
      isMine
      likes
      views
      comments{
        id
        comment
        
      }
      user {
        id
        firstName
        lastName
        fullName
      }
    }
  }
`);

export const GET_ACTIVITIES_BY_ACTIVITY_TYPE = gql(`
  query GetActivitiesByActivityType($activityType: ActivityType) {
    getActivityLogs(activity: $activityType) {
      id
      activity
      createdAt
      post{
        id
        content
        categories
        isMine
        user{
          fullName
        }
      }
    }
  }
`);