import { useMutation } from "@apollo/client";
import { Grid, Textarea, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { gql } from "../../__generated__";
import { CREATE_COMMENT } from "../../utils/mutations";

type PostCommentInputComponentProps = {
  postId: number;
};

export function PostCommentInputComponent({
  postId,
}: PostCommentInputComponentProps) {
  const [createComment,{loading}] = useMutation(CREATE_COMMENT, {
    update(cache, { data }) {
      cache.modify({
        id: cache.identify({
          __typename: "Post",
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
                }
              `),
            });
            return [...existingComments,newCommentRef];
          },
        },
      });
    },
  });
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      comment: "",
    },
    validate: (values) => ({
      comment: values.comment.length > 0 ? null : "Comment is too short",
    }),
  });

  const handleSubmit = (values: typeof form.values) => {
    createComment({
      variables: { postId, comment: values.comment },
    });
    form.reset();
  };
  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Grid grow>
        <Grid.Col span={12}>
          <Textarea
            placeholder="Add a comment"
            resize="vertical"
            key={form.key("comment")}
            {...form.getInputProps("comment")}
          />
        </Grid.Col>
        <Grid.Col
          span={6}
          style={{
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <Button
            tt="uppercase"
            type="submit"
            loading={loading}
            loaderProps={{ type: "dots" }}
          >
            Comment
          </Button>
        </Grid.Col>
      </Grid>
    </form>
  );
}
