/* eslint-disable no-restricted-imports */
import { Button, Container, Paper, Stack } from "@mantine/core";
import { IconInfoCircle, IconPlus, IconUser } from "@tabler/icons-react";

import { Group, Title } from "metabase/ui";

import { Callout } from "./components/Callout";
import { EmojiIcon } from "./components/EmojiIcon";
import { FancyCard } from "./components/FancyCard";
import { Header } from "./components/Header";
import { HeaderWithNavigation } from "./components/HeaderWithNavigation";
import { List } from "./components/List";
import { Section } from "./components/Section";
import { ValueCard } from "./components/ValueCard";

export const ComponentsLibrary = () => {
  return (
    <Container p="xl">
      <Stack gap="3rem">
        <Title order={2}>{"Headers"}</Title>
        <Header title="App Name" />
        <HeaderWithNavigation
          title="App Name"
          navigationItems={[
            { label: "Components", href: "/components-showcase" },
            { label: "Portal", href: "/access-request-portal" },
          ]}
        />

        <Title order={2}>{"Cards"}</Title>
        <Group w="100%" align="stretch">
          <ValueCard
            title="Total Users"
            value="100"
            diff={10}
            icon={IconUser}
            description="Compared to previous month"
            flex={1}
          />
          <ValueCard
            title="Card without icon"
            value="150%"
            description="System load"
            flex={1}
          />
        </Group>
        <FancyCard
          title="Fancy Card"
          description="This is a fancy card"
          icon={<EmojiIcon fz={32} emoji="🚀" />}
          rightSection={<Button variant="filled">{"Click me"}</Button>}
        />

        <Title order={2}>{"Sections"}</Title>
        <Section title="Section 1">{`Content`}</Section>
        <Section
          withBorder
          title="Section 2"
          rightSection={<Button leftSection={<IconPlus />}>{"Button"}</Button>}
        >
          {`Content`}
        </Section>

        <Title order={2}>{"Callouts"}</Title>
        <Stack gap="xs">
          <Callout
            title="Callout"
            description="This is a callout"
            icon={IconInfoCircle}
            color="success"
          />
          <Callout description="This is a warning callout" color="warning" />
        </Stack>

        <Title order={2}>{"Lists"}</Title>
        <Stack gap="md">
          <Title order={3}>{"Simple"}</Title>
          <List
            items={["Item 1", "Item 2", "Item 3"]}
            direction="column"
            align="stretch"
            renderItem={(item) => <Paper p="md">{item}</Paper>}
          />

          <Title order={3}>{"Grid"}</Title>
          <List
            items={["Item 1", "Item 2", "Item 3", "Item 4"]}
            direction="row"
            align="stretch"
            wrap="wrap"
            gap="xs"
            renderItem={(item) => (
              <Paper flex={1} miw="40%" p="md">
                {item}
              </Paper>
            )}
          />

          <Title order={3}>{"With Tabs"}</Title>
          <List
            items={[
              "Item 1 in Tab 1",
              "Item 2 in Tab 1",
              "Item 3 in Tab 2",
              "Item 4 in Tab 2",
            ]}
            tabs={[
              { label: "Tab 1", value: "tab1" },
              { label: "Tab 2", value: "tab2" },
            ]}
            direction="column"
            align="stretch"
            getItemTab={(item) => (item.includes("Tab 1") ? "tab1" : "tab2")}
            renderItem={(item) => (
              <Paper p="md" w="100%">
                {item}
              </Paper>
            )}
          />
        </Stack>
      </Stack>
    </Container>
  );
};
