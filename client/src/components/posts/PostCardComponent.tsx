import { Card, Group, Button } from "@mantine/core";
import { IconThumbUp, IconMessageDots } from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";
import { GetPostsQuery } from "../../__generated__/graphql";
import { useToggleLike } from "../../hooks/useToggleLike";
import { PostInfoComponent } from "./PostInfoComponent";

export function PostCardComponent({post}: {post: GetPostsQuery["posts"][0]}) {
    const [toggleLike, { loading }] = useToggleLike(post.id);
  
    const handleLike = () => {
      toggleLike();
    };
    return (
      <Card withBorder radius="md" p="md">
        <Card.Section mt="md" p={10}>
          <PostInfoComponent post={post} />
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
              component={Link}
              to={`/post/$id`}
              params={{ id: `${post.id}` }}
              variant="default"
              leftSection={<IconMessageDots size={18} />}
            >
              Comment
            </Button>
          </Group>
        </Card.Section>
      </Card>
    );
  }