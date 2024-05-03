import { Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useCreatePost } from "../../hooks/graphql/useCreatePost";
import {
  PostAddEditFormComponent,
  PostAddEditFormState,
} from "./PostAddEditFormComponent";

export function CreatePostComponent() {
  const [opened, { open, close }] = useDisclosure(false);

  const [createPost, { loading }] = useCreatePost();

  const handleSubmit = (formState: PostAddEditFormState) => {
    createPost({
      variables: {
        content: formState.content,
        category: formState.categories,
      },
    });
    close();
  };

  return (
    <>
      <PostAddEditFormComponent
        title="Create a New Post"
        submitButtonLabel="Create Post"
        opened={opened}
        close={close}
        formData={{ content: "", categories: [] }}
        submissionOnGoing={loading}
        onSubmit={handleSubmit}
      />

      <Button onClick={open}>Create Post</Button>
    </>
  );
}
