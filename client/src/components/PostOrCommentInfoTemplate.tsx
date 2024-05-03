import {
  Avatar,
  Badge,
  CloseButton,
  Divider,
  Flex,
  Group,
  Spoiler,
  Stack,
  Text,
} from "@mantine/core";
import { IconEditCircle, IconTrash } from "@tabler/icons-react";

type PostOrCommentInfoTemplateProps = {
  avatarSrc?: string;
  title?: string;
  content?: string;
  badgeOptions?: string[];
  onEditClick?: () => void;
  onDeleteClick?: () => void;
  variant?: "post" | "comment";
};

export function PostOrCommentInfoTemplate({
  avatarSrc: avatar_src,
  title,
  content,
  badgeOptions,
  onEditClick,
  onDeleteClick,
  variant = "post",
}: PostOrCommentInfoTemplateProps) {
  return (
    <Flex gap={10}>
      <Avatar
        src={avatar_src}
        alt={avatar_src ? "Avatar" : "no image here"}
        color="indigo"
        size={"lg"}
      />
      <Stack flex={1} gap={variant === "comment" ? 0 : "md"}>
        <Flex justify="space-between" align={"center"} flex={1} pr={20}>
          <Stack gap={4}>
            <Text fz="lg" fw={500}>
              {title}
            </Text>
            <Group gap={4} preventGrowOverflow={false}>
              {badgeOptions?.map((category, idx) => (
                <Badge key={idx} variant="light">
                  {category}
                </Badge>
              ))}
            </Group>
          </Stack>
          <Group grow>
            {onEditClick && (
              <CloseButton icon={<IconEditCircle size={18} color="orange" onClick={onEditClick} />} />
            )}
            {onDeleteClick && (
              <CloseButton icon={<IconTrash size={18} color="red" onClick={onDeleteClick}/>} />
            )}
          </Group>
        </Flex>
        <Divider />
        <Spoiler maxHeight={120} showLabel="Show more" hideLabel>
          <Text fz="sm" mt="xs">
            {content}
          </Text>
        </Spoiler>
      </Stack>
    </Flex>
  );
}
