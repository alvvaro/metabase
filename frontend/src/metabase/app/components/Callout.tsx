/* eslint-disable no-restricted-imports */
import { Alert, Text } from "@mantine/core";
import type { IconProps } from "@tabler/icons-react";

type Props = {
  title?: string;
  description: string;
  color?: string;
  icon?: React.ComponentType<IconProps>;
  variant?: "filled" | "light" | "outline";
};

export function Callout({
  title,
  description,
  icon,
  color,
  variant = "light",
}: Props) {
  const IconComponent = icon;

  return (
    <Alert
      title={title}
      icon={IconComponent ? <IconComponent /> : null}
      variant={variant}
      radius="xs"
      color={color}
      p="md"
      bd="1px solid var(--alert-color)"
      styles={{
        title: {
          fontSize: "var(--mantine-font-size-md)",
        },
      }}
    >
      <Text fz="md">{description}</Text>
    </Alert>
  );
}
