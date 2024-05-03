import { Card, Skeleton } from "@mantine/core";

export function ContentLoadingComponent() {
    return (
      <Card withBorder radius="md" p="md">
        <Skeleton height={50} circle mb="xl" />
        <Skeleton height={8} radius="xl" />
        <Skeleton height={8} mt={6} radius="xl" />
        <Skeleton height={8} mt={6} width="70%" radius="xl" />
      </Card>
    );
  }