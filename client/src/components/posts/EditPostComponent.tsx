import { useMutation } from "@apollo/client";
import { notifications } from "@mantine/notifications";
import { usePostEditStore } from "../../hooks/usePostEditStore";
import { UPDATE_POST } from "../../utils/mutations";
import {
  PostAddEditFormComponent,
  PostAddEditFormState,
} from "./PostAddEditFormComponent";

export function EditPostComponent() {
  const { post, closeEditPost } = usePostEditStore();

  const [updatePost, { loading }] = useMutation(UPDATE_POST, {
    update(cache, { data }) {
      cache.modify({
        id: cache.identify({
          __typename: "Post",
          id: post?.id,
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

  const handleSubmit = (formState: PostAddEditFormState) => {
    if (post) {
      updatePost({
        variables: {
          postId: post.id,
          content: formState.content,
          categories: formState.categories,
        },
      });
      closeEditPost();
    } else {
      notifications.show({
        title: "Error",
        message: "Post not found",
        color: "red",
      });
    }
  };

  return (
      <PostAddEditFormComponent
        title="Edit Post"
        submitButtonLabel="Update Post"
        opened={post ? true : false}
        close={closeEditPost}
        formData={{
          content: post?.content ?? "",
          categories: post?.categories || [],
        }}
        submissionOnGoing={loading}
        onSubmit={handleSubmit}
      />
  );
}
