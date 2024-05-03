import { useQuery } from "@apollo/client";
import { Center, ScrollArea, SegmentedControl, Stack } from "@mantine/core";
import { useEffect, useState } from "react";
import { ActivityType } from "../../__generated__/graphql";
import { GET_ACTIVITIES_BY_ACTIVITY_TYPE } from "../../utils/query";
import { ContentLoadingComponent } from "../ContentLoadingComponent";
import { EmptyContentComponent } from "../EmptyContentComponent";
import { ActivityCardComponent } from "./ActivityCardComponent";

const filters = [
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
];

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
          data={filters}
        />
        <ScrollArea w={"50vw"} type="scroll">
          <Stack>
            {data?.getActivityLogs.length === 0 ? (
              <EmptyContentComponent message="No Activities" />
            ) : (
              data?.getActivityLogs.map((log, idx) => (
                <ActivityCardComponent key={idx} log={log} />
              ))
            )}
          </Stack>
        </ScrollArea>
      </Stack>
    </Center>
  );
}
