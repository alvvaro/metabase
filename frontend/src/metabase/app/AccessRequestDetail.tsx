/* eslint-disable no-restricted-imports */
import { Box, Button, Container, Flex, Group, Stack } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { Link } from "react-router";

import { Header } from "./components/Header";
import { ValueCard } from "./components/ValueCard";
import {
  ACCESS_PORTAL_REQUESTS,
  ACCESS_PORTAL_SYSTEMS,
} from "./data/access-portal";

type Props = {
  params: {
    id: string;
  };
};

export function AccessRequestDetail({ params }: Props) {
  const request = ACCESS_PORTAL_REQUESTS.find(
    (request) => request.id === params.id,
  );

  const system = ACCESS_PORTAL_SYSTEMS.find(
    (system) => system.id === request?.systemId,
  );

  return (
    <Container p="xl">
      <Stack gap="xl">
        <Header title={`Manage Access Requests`} />
        <Box>
          <Button
            component={Link}
            to="/apps/manage-access-requests"
            leftSection={<IconArrowLeft />}
          >
            {"Back to requests"}
          </Button>
        </Box>
        <Flex gap="md" wrap="wrap">
          <ValueCard
            flex={1}
            miw={{ base: "100%", md: "30%" }}
            title="System"
            value={system ? `${system.emoji} ${system.name}` : "Unknown"}
          />
          <ValueCard
            flex={1}
            miw={{ base: "100%", md: "30%" }}
            title="Submitted By"
            value={request?.submittedBy ?? "Unknown"}
          />
          <ValueCard
            flex={1}
            miw={{ base: "100%", md: "30%" }}
            title="When"
            value={request?.urgency ?? ""}
          />
          <ValueCard
            flex={2}
            title="Additional Information"
            value={request?.reason ?? "Unknown"}
          />
        </Flex>
        <Group gap="md">
          <Button variant="filled" color="success" flex={1}>
            {"Approve"}
          </Button>
          <Button variant="filled" color="error" flex={1}>
            {"Reject"}
          </Button>
        </Group>
      </Stack>
    </Container>
  );
}
