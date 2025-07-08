/* eslint-disable no-restricted-imports */
import {
  Flex,
  Group,
  type MantineStyleProps,
  Paper,
  Text,
} from "@mantine/core";
import {
  IconArrowDownRight,
  IconArrowUpRight,
  type IconProps,
} from "@tabler/icons-react";

type Props = MantineStyleProps & {
  title: string;
  value: string;
  icon?: React.ComponentType<IconProps>;
  diff?: number;
  description?: string;
};

export const ValueCard = ({
  title,
  icon,
  value,
  diff,
  description,
  ...rest
}: Props) => {
  const IconComponent = icon;
  const DiffIcon = diff && diff > 0 ? IconArrowUpRight : IconArrowDownRight;

  return (
    <Paper withBorder p="md" radius="sm" {...rest}>
      <Group justify="space-between" h="24px" wrap="nowrap">
        <Text size="xs" c="text-secondary" fw={700} tt="uppercase" truncate>
          {title}
        </Text>
        {IconComponent && <IconComponent size={22} stroke={1.5} />}
      </Group>

      <Group align="flex-end" gap="xs" mt={25}>
        <Text fz={24} fw={700} lh={1}>
          {value}
        </Text>
        {diff && (
          <Flex
            c={diff > 0 ? "success" : "error"}
            fz="sm"
            fw={500}
            lh={1}
            align="center"
          >
            <span>{diff}%</span>
            <DiffIcon size={16} stroke={1.5} />
          </Flex>
        )}
      </Group>

      {description && (
        <Text fz="xs" c="text-secondary" mt={7} truncate>
          {description}
        </Text>
      )}
    </Paper>
  );
};
