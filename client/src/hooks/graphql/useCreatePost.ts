import { useMutation, gql } from "@apollo/client";
import { CREATE_POST } from "../../utils/mutations";

export const useCreatePost = () =>
  useMutation(CREATE_POST, {
    update(cache, { data }) {
      cache.modify({
        fields: {
          posts(existingPosts = []) {
            const newPostRef = cache.writeFragment({
              data: data?.createPost,
              fragment: gql(`
                  fragment NewPost on PostModel {
                    id
                    content
                    categories
                    isLiked
                    isMine
                    likes
                    user {
                      id
                      firstName
                      lastName
                    }
                  }
                `),
            });
            return [newPostRef, ...existingPosts];
          },
        },
      });
    },
  });
