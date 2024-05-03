import { Box } from "@mantine/core";
import { Post, UserModel } from "../../__generated__/graphql";
import { usePostEditStore } from "../../hooks/zustand/usePostEditStore";
import { PostOrCommentInfoTemplate } from "../PostOrCommentInfoTemplate";
import { usePostDeleteStore } from "../../hooks/zustand/usePostDeleteStore";

type PostInfoComponentProps = {
  post: Pick<Post, "content" | "categories" | "isMine"> & {
    user: Pick<UserModel, "fullName">;
  } & { id?: string };
  shouldShowEditAndDelete?: boolean;
};

export function PostInfoComponent({
  post,
  shouldShowEditAndDelete = true,
}: PostInfoComponentProps) {
  const [editPost] = usePostEditStore((state) => [state.editPost]);
  const [deletePost] = usePostDeleteStore((state) => [state.deletePost]);
  return (
    <Box>
      <PostOrCommentInfoTemplate
        title={post.isMine ? "You" : post.user.fullName}
        badgeOptions={post.categories}
        content={post.content}
        onEditClick={
          shouldShowEditAndDelete && post.isMine
            ? () => {
                editPost(Number(post.id), post.content, post.categories);
              }
            : undefined
        }
        onDeleteClick={
          shouldShowEditAndDelete && post.isMine
            ? () => {
                deletePost(Number(post.id));
              }
            : undefined
        }
      />
    </Box>
  );
}
