import { useMutation } from "@apollo/client";
import { TOGGLE_LIKE } from "../../utils/mutations";

export const useToggleLike = (
  postId: number | string,
) =>
  useMutation(TOGGLE_LIKE, {
    variables: { postId: Number(postId) },
    update(cache, { data }) {
      cache.modify({
        id: cache.identify({
            __typename: 'PostModel',
            id: postId,
        }),
        fields: {
          isLiked(prev) {
            return data?.toggleLike.isLiked ?? prev;
          },
          likes(prev) {
            return data?.toggleLike.likes ?? prev;
          },
        },
      });
    },
  });
