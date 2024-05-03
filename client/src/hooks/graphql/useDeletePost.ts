import { useMutation } from "@apollo/client";
import { DELETE_POST } from "../../utils/mutations";

export const useDeletePost = () =>useMutation(DELETE_POST, {
    update(cache, { data }) {
      cache.evict({
        id: cache.identify({ __typename: "PostModel", id: data?.deletePost.id }),
      });
    },
  });