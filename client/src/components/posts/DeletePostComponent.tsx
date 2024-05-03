import { Button, Center, Group, Modal, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useDeletePost } from "../../hooks/graphql/useDeletePost";
import { usePostDeleteStore } from "../../hooks/zustand/usePostDeleteStore";

export function DeletePostComponent() {
  const { postId, closeDeletePost } = usePostDeleteStore();

  const [deletePost, { loading }] = useDeletePost();

  const handleSubmit = () => {
    if (postId) {
      deletePost({
        variables: {
          postId,
        },
      });
      closeDeletePost();
    } else {
      notifications.show({
        title: "Error",
        message: "Post not found",
        color: "red",
      });
    }
  };

  return (
    <Modal
      opened={postId ? true : false}
      onClose={closeDeletePost}
      title="Delete Post"
    >
      <Center>
        <Group>
          <Text>Are you sure you want to delete this post?</Text>
          <Button onClick={handleSubmit} loading={loading} color="red">
            Delete
          </Button>
        </Group>
      </Center>
    </Modal>
  );
}
