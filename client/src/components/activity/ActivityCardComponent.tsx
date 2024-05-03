import { Card, Fieldset } from "@mantine/core";
import { Link } from "@tanstack/react-router";
import { GetActivitiesByActivityTypeQuery } from "../../__generated__/graphql";
import { generateActivityLabel } from "../../utils/utils";
import { PostInfoComponent } from "../posts/PostInfoComponent";

export function ActivityCardComponent({
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