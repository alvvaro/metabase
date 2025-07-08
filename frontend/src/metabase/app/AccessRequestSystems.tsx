/* eslint-disable no-restricted-imports */
import { Button, Container, Stack, TextInput } from "@mantine/core";
import { IconKey, IconSearch } from "@tabler/icons-react";
import { Link } from "react-router";

import { Callout } from "./components/Callout";
import { EmojiIcon } from "./components/EmojiIcon";
import { FancyCard } from "./components/FancyCard";
import { HeaderWithNavigation } from "./components/HeaderWithNavigation";
import { List } from "./components/List";
import { Section } from "./components/Section";
import {
  ACCESS_PORTAL_CATEGORIES,
  ACCESS_PORTAL_SYSTEMS,
} from "./data/access-portal";

export function AccessRequestSystems() {
  return (
    <>
      <HeaderWithNavigation
        title="Access Request"
        navigationItems={[
          { label: "All Systems", href: "/access-request-systems" },
          { label: "New Request", href: "/access-request-systems/new" },
          { label: "My Requests", href: "/access-request-portal" },
        ]}
      />
      <Container size="70rem" p="xl">
        <Stack gap="xl">
          <Callout
            title="Welcome to the access request portal"
            icon={IconKey}
            description="Select a system to request access to. Please contact your system administrator if you need access to a system that is not listed."
            color="success"
          />
          <Section title="📂 &nbsp;Available Systems" withBorder>
            <TextInput
              placeholder="Search systems"
              leftSection={<IconSearch size={16} />}
              mb="md"
            />
            <List
              tabs={ACCESS_PORTAL_CATEGORIES.map((category) => ({
                label: category.label,
                value: category.id,
              }))}
              getItemTab={(system) => system.categoryId}
              items={ACCESS_PORTAL_SYSTEMS}
              direction="row"
              wrap="wrap"
              gap="sm"
              renderItem={(system) => {
                return (
                  <FancyCard
                    key={system.id}
                    flex={1}
                    miw={{ base: "100%", md: "40%" }}
                    title={system.name}
                    description={system.description}
                    icon={<EmojiIcon fz={32} emoji={system.emoji} />}
                    rightSection={
                      <Button
                        component={Link}
                        to={`/apps/access-request-systems/new?system=${system.id}`}
                        variant="filled"
                      >
                        {"Request"}
                      </Button>
                    }
                  />
                );
              }}
            />
          </Section>
        </Stack>
      </Container>
    </>
  );
}
