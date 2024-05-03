import { gql, useMutation } from "@apollo/client";
import { Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { CREATE_POST } from "../../utils/mutations";
import {
    PostAddEditFormComponent,
    PostAddEditFormState,
} from "./PostAddEditFormComponent";

export function CreatePostComponent() {
  const [opened, { open, close }] = useDisclosure(false);

  const [createPost, { loading }] = useMutation(CREATE_POST, {
    update(cache, { data }) {
      cache.modify({
        fields: {
          posts(existingPosts = []) {
            const newPostRef = cache.writeFragment({
              data: data?.createPost,
              fragment: gql(`
                  fragment NewPost on Post {
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
