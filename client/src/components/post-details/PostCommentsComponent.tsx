import { Card, Stack } from "@mantine/core";
import { GetPostByIdQuery } from "../../__generated__/graphql";
import { EmptyContentComponent } from "../EmptyContentComponent";
import { PostOrCommentInfoTemplate } from "../PostOrCommentInfoTemplate";

export function PostCommentsComponent({
  comments,
}: {
  comments: GetPostByIdQuery["postById"]["comments"];
}) {
  if (comments.length === 0)
    return <EmptyContentComponent message="No comments yet" />;
  return (
    <Stack>
        {comments.map((comment) => (
            <Card withBorder radius="md" p="md" key={comment.id}>
                <Card.Section p={10}>
                    <PostOrCommentInfoTemplate
                        title={comment.isMine ? "You" : comment.user.fullName}
                        content={comment.comment}
                        variant="comment"
                    />
                </Card.Section>
            </Card>
        ))}
    </Stack>
  );
}
