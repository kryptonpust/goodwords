import { useQuery } from "@apollo/client";
import {
  Card,
  Center,
  Fieldset,
  ScrollArea,
  SegmentedControl,
  Stack,
} from "@mantine/core";
import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { convertISOToCustomFormat } from "../../../../server/src/utils/util";
import {
  ActivityType,
  GetActivitiesByActivityTypeQuery,
} from "../../__generated__/graphql";
import { GET_ACTIVITIES_BY_ACTIVITY_TYPE } from "../../utils/query";
import { ContentLoadingComponent } from "../ContentLoadingComponent";
import { EmptyContentComponent } from "../EmptyContentComponent";
import { PostInfoComponent } from "../posts/PostInfoComponent";

export function ActivitiesScreen() {
  const [activityType, setActivityType] = useState<string>("");

  const { data, loading, refetch } = useQuery(GET_ACTIVITIES_BY_ACTIVITY_TYPE, {
    variables: {
      activityType: activityType ? (activityType as ActivityType) : undefined,
    },
  });

  useEffect(() => {
    refetch();
  }, [activityType, refetch]);

  if (loading) return <ContentLoadingComponent />;

  return (
    <Center my={20}>
      <Stack>
        <SegmentedControl
          value={activityType}
          onChange={(value) => {
            setActivityType(value);
          }}
          data={[
            {
              label: "All",
              value: "",
            },
            {
              label: "Likes",
              value: ActivityType.Like,
            },
            {
              label: "Comments",
              value: ActivityType.Comment,
            },
            {
              label: "Posts",
              value: ActivityType.Create,
            },
          ]}
        />
        <ScrollArea w={"50vw"} type="scroll">
          <Stack>
            {data?.getActivityLogs.length === 0 ? (
              <EmptyContentComponent message="No Activities" />
            ) : (
              data?.getActivityLogs.map((log, idx) => (
                <ActivityCard key={idx} log={log} />
              ))
            )}
          </Stack>
        </ScrollArea>
      </Stack>
    </Center>
  );
}

function ActivityCard({
  log,
}: {
  log: GetActivitiesByActivityTypeQuery["getActivityLogs"][0];
}) {
  return (
    <Fieldset legend={generateActivityLabel(log.activity, log.createdAt)}>
      <Card
        withBorder
        radius="md"
        p="md"
        component={Link}
        to={`/post/${log.post.id}`}
      >
        <Card.Section mt="md" p={10}>
          <PostInfoComponent post={log.post} shouldShowEditAndDelete={false} />
        </Card.Section>
      </Card>
    </Fieldset>
  );
}

function generateActivityLabel(
  activity: GetActivitiesByActivityTypeQuery["getActivityLogs"][0]["activity"],
  createdAt: Date
) {
  const convertedDate = convertISOToCustomFormat(createdAt);
  switch (activity) {
    case ActivityType.Like:
      return `You liked a post on ${convertedDate}`;
    case ActivityType.Comment:
      return `You commented on a post on ${convertedDate}`;
    case ActivityType.Create:
      return `You made a post on ${convertedDate}`;
    default:
      return "";
  }
}
