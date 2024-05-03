import { useMutation, gql } from "@apollo/client";
import { CREATE_COMMENT } from "../../utils/mutations";

export const useCreateComment = (postId: number | string) => useMutation(CREATE_COMMENT, {
    update(cache, { data }) {
      cache.modify({
        id: cache.identify({
          __typename: "PostModel",
          id: postId,
        }),
        fields: {
          comments(existingComments = []) {
            const newCommentRef = cache.writeFragment({
              data: data?.createComment,
              fragment: gql(`
                fragment NewComment on CommentModel {
                  id
                  comment
                  isMine
                  user {
                    id
                    firstName
                    lastName
                  }
                }
              `),
            });
            return [...existingComments,newCommentRef];
          },
        },
      });
    },
  });