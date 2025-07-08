/* eslint-disable no-restricted-imports */
import { Box, Group, Paper, Title } from "@mantine/core";

type Props = {
  title: string;
  children: React.ReactNode;
  withBorder?: boolean;
  rightSection?: React.ReactNode;
};

export function Section({
  title,
  children,
  withBorder,
  rightSection = null,
}: Props) {
  return (
    <Paper withBorder={withBorder} radius="sm">
      <Group
        p="md"
        style={{
          borderBottom: withBorder
            ? "1px solid var(--mb-color-border)"
            : "none",
        }}
        justify="space-between"
      >
        <Title order={4}>{title}</Title>
        {rightSection}
      </Group>
      <Box p="md">{children}</Box>
    </Paper>
  );
}
