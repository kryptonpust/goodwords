import { useMutation } from "@apollo/client";
import { UPDATE_POST } from "../../utils/mutations";

export const useUpdatePost = (postId:number) => useMutation(UPDATE_POST, {
    update(cache, { data }) {
      cache.modify({
        id: cache.identify({
          __typename: "PostModel",
          id: postId,
        }),
        fields: {
          content(prev) {
            return data?.updatePost.content ?? prev;
          },
          categories(prev) {
            return data?.updatePost.categories ?? prev;
          },
        },
      });
    },
  });