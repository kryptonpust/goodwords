import { useQuery } from "@apollo/client";
import {
  Button,
  Card,
  Center,
  Divider,
  Group,
  ScrollArea,
  Stack,
  Text,
} from "@mantine/core";
import { IconEye, IconThumbUp } from "@tabler/icons-react";
import { useParams } from "@tanstack/react-router";
import { useToggleLike } from "../../hooks/useToggleLike";
import { GET_POST_BY_ID } from "../../utils/query";
import { PostCommentsComponent } from "../posts/PostCommentsComponent";
import { PostInfoComponent } from "../posts/PostInfoComponent";
import { PostCommentInputComponent } from "./PostCommentInputComponent";

export function PostDetailsScreen() {
  const id = useParams({
    from: "/_protected/post/$id",
    select: (params) => params.id,
  });
  const { data, loading } = useQuery(GET_POST_BY_ID, {
    variables: {
      id: Number(id),
    },
  });

  const post = data?.postById;

  const [toggleLike] = useToggleLike(Number(id));

  const handleLike = () => {
    toggleLike();
  };

  if (!post) return <Text>Loading...</Text>;

  return (
    <Center my={20}>
      <Stack>
        <ScrollArea w={"50vw"} type="scroll">
          <Stack gap="md">
            <Card withBorder radius="md" p="md">
              <Card.Section mt="md" p={10}>
                <PostInfoComponent post={post} shouldShowEditAndDelete={false}/>
              </Card.Section>
              <Card.Section p={10}>
                <Group grow>
                  <Button
                    variant={post.isLiked ? "filled" : "default"}
                    leftSection={
                      <IconThumbUp
                        size={18}
                        fill={post.isLiked ? "dark" : "transparent"}
                      />
                    }
                    loading={loading}
                    loaderProps={{ type: "dots" }}
                    onClick={handleLike}
                  >
                    {post.likes} Like{post.likes > 1 ? "s" : ""}
                  </Button>
                  <Button
                    disabled
                    variant="outline"
                    leftSection={<IconEye size={18} />}
                  >
                    {post.views} View{post.views > 1 ? "s" : ""}
                  </Button>
                </Group>
              </Card.Section>
            </Card>
            <PostCommentInputComponent postId={Number(id)}/>
            <Divider variant="dashed" label="Comments" labelPosition="center" />
            <PostCommentsComponent comments={post.comments} />
          </Stack>
        </ScrollArea>
      </Stack>
    </Center>
  );
}
