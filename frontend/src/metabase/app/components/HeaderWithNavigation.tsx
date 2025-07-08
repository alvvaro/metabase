/* eslint-disable no-restricted-imports */
import { Anchor, Avatar, Box, Container } from "@mantine/core";
import { Link } from "react-router";

import LogoIcon from "metabase/common/components/LogoIcon";
import { useSelector } from "metabase/lib/redux";
import { Group, Stack, Text, Title } from "metabase/ui";

type Props = {
  title: string;
  navigationItems: { label: string; href: string }[];
};

export function HeaderWithNavigation({ title, navigationItems }: Props) {
  const currentUser = useSelector((state) => state.currentUser);
  return (
    <Box
      bg="white"
      style={{ borderBottom: "1px solid var(--mb-color-border)" }}
    >
      <Container size="70rem">
        <Stack gap="sm">
          <Group justify="space-between" align="center" p="md">
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
          <Group gap={0} px="md">
            {navigationItems.map((item) => {
              const isActive = document.location.pathname.endsWith(item.href);
              return (
                <Anchor
                  component={Link}
                  to={`/app${item.href}`}
                  key={item.label}
                  tt="uppercase"
                  p="var(--mantine-spacing-xs) var(--mantine-spacing-md)"
                  fw={700}
                  td="none"
                  c={isActive ? "var(--mb-color-brand)" : "text-primary"}
                  style={{
                    borderBottom: isActive
                      ? "2px solid var(--mb-color-brand)"
                      : "2px solid transparent",
                  }}
                >
                  {item.label}
                </Anchor>
              );
            })}
          </Group>
        </Stack>
      </Container>
    </Box>
  );
}
