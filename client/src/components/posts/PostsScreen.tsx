import { useQuery } from "@apollo/client";
import { Center, ScrollArea, Stack } from "@mantine/core";
import { GET_POSTS } from "../../utils/query";
import { EmptyContentComponent } from "../EmptyContentComponent";
import { ContentLoadingComponent } from "../ContentLoadingComponent";
import { CreatePostComponent } from "./CreatePostComponent";
import { PostCardComponent } from "./PostCardComponent";
import { EditPostComponent } from "./EditPostComponent";
import { usePostEditStore } from "../../hooks/usePostEditStore";
import { usePostDeleteStore } from "../../hooks/usePostDeleteStore";
import { DeletePostComponent } from "./DeletePostComponent";

export function PostsScreen() {
  const { data, loading } = useQuery(GET_POSTS);
  const [editPost] = usePostEditStore((state) => [state.post]);
  const [deletePost] = usePostDeleteStore((state) => [state.postId]);

  return (
    <Center my={20}>
      <Stack>
        <CreatePostComponent />
        {editPost && <EditPostComponent />}
        {deletePost && <DeletePostComponent />}
        <ScrollArea w={"50vw"} type="scroll">
          {loading && <ContentLoadingComponent />}
          {data?.posts.length === 0 && <EmptyContentComponent message="No Post Found!!" />}
          <Stack>
            {data?.posts.map((post, idx) => (
              <PostCardComponent key={idx} post={post} />
            ))}
          </Stack>
        </ScrollArea>
      </Stack>
    </Center>
  );
}
