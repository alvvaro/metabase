/* eslint-disable no-restricted-imports */
import { Avatar } from "@mantine/core";

import LogoIcon from "metabase/common/components/LogoIcon";
import { useSelector } from "metabase/lib/redux";
import { Group, Text, Title } from "metabase/ui";

type Props = {
  title: string;
};

export function Header({ title }: Props) {
  const currentUser = useSelector((state) => state.currentUser);
  return (
    <Group justify="space-between" align="center">
      <Group visibleFrom="md">
        <LogoIcon height={32} />
        <Title order={2}>{title}</Title>
      </Group>
      <Group hiddenFrom="md">
        <LogoIcon height={24} />
        <Title order={4}>{title}</Title>
      </Group>
      <Group>
        <Text fw={700} visibleFrom="md">
          {currentUser?.common_name}
        </Text>
        <Avatar
          radius="xl"
          name={currentUser?.common_name}
          color="initial"
          size="md"
        />
      </Group>
    </Group>
  );
}
