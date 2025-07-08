/* eslint-disable no-restricted-imports */
import {
  Group,
  type MantineStyleProps,
  Paper,
  Stack,
  Text,
} from "@mantine/core";

type Props = MantineStyleProps & {
  title: string;
  description: string;
  icon: React.ReactNode;
  rightSection?: React.ReactNode;
};

export function FancyCard({
  title,
  description,
  icon,
  rightSection,
  ...props
}: Props) {
  return (
    <Paper withBorder radius="xs" p="md" {...props}>
      <Stack gap="xs">
        <Group mb="md" justify="space-between">
          {icon}
          {rightSection ?? null}
        </Group>
        <Text fz="lg" fw={700}>
          {title}
        </Text>
        <Text c="text-secondary">{description}</Text>
      </Stack>
    </Paper>
  );
}
