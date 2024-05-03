import { Card, Text } from "@mantine/core";

type EmptyContentComponentProps = {
  message: string;
};

export function EmptyContentComponent({
  message,
}: EmptyContentComponentProps) {
  return (
    <Card withBorder radius="md" p="md">
      <Card.Section p={10}>
        <Text>{message}</Text>
      </Card.Section>
    </Card>
  );
}
