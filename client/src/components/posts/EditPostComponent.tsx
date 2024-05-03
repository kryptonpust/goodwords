import { notifications } from "@mantine/notifications";
import { useUpdatePost } from "../../hooks/graphql/useUpdatePost";
import { usePostEditStore } from "../../hooks/zustand/usePostEditStore";
import {
  PostAddEditFormComponent,
  PostAddEditFormState,
} from "./PostAddEditFormComponent";

export function EditPostComponent() {
  const { post, closeEditPost } = usePostEditStore();

  const [updatePost, { loading }] = useUpdatePost(post?.id || -1);

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
