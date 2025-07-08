/* eslint-disable no-restricted-imports */
import { Button, Container, Stack } from "@mantine/core";
import { Link } from "react-router";

import { EmojiIcon } from "./components/EmojiIcon";
import { FancyCard } from "./components/FancyCard";
import { Header } from "./components/Header";
import { List } from "./components/List";
import {
  ACCESS_PORTAL_REQUESTS,
  ACCESS_PORTAL_SYSTEMS,
} from "./data/access-portal";

export function ManageAccessRequests() {
  return (
    <Container p="xl">
      <Stack gap="xl">
        <Header title={`Manage Access Requests`} />
        <List
          tabs={[
            { label: "Pending", value: "pending" },
            { label: "Approved", value: "approved" },
            { label: "Rejected", value: "rejected" },
          ]}
          getItemTab={(request) => request.status}
          items={ACCESS_PORTAL_REQUESTS}
          direction="column"
          renderItem={(request) => {
            const system = ACCESS_PORTAL_SYSTEMS.find(
              (system) => system.id === request.systemId,
            );
            return (
              <FancyCard
                key={request.id}
                title={system?.name ?? "Unknown System"}
                icon={<EmojiIcon emoji={system?.emoji ?? "🏢"} fz={24} />}
                description={`${request.submittedBy}`}
                rightSection={
                  <Button
                    variant="filled"
                    component={Link}
                    to={`/apps/manage-access-requests/${request.id}`}
                  >
                    {"View"}
                  </Button>
                }
              />
            );
          }}
        />
      </Stack>
    </Container>
  );
}
