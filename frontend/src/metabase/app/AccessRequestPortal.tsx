/* eslint-disable no-restricted-imports */
import {
  Badge,
  Box,
  Button,
  Container,
  Group,
  Indicator,
  Select,
  Stack,
  Table,
  Text,
  TextInput,
} from "@mantine/core";
import {
  IconClock,
  IconPlus,
  IconSearch,
  IconServer,
} from "@tabler/icons-react";
import dayjs from "dayjs";
import { Link } from "react-router";

import { Header } from "./components/Header";
import { Section } from "./components/Section";
import { ValueCard } from "./components/ValueCard";
import {
  ACCESS_PORTAL_ACTIVE_REQUESTS,
  ACCESS_PORTAL_SYSTEMS,
} from "./data/access-portal";

export function AccessRequestPortal() {
  return (
    <Container p={{ base: "md", md: "xl" }} size="70rem">
      <Header title="My Access Requests" />
      <Stack mt="2rem">
        <Group>
          <ValueCard
            title="Active Requests"
            value="7"
            diff={3}
            description="compared to the last month"
            icon={IconClock}
            flex={1}
          />
          <ValueCard
            title="Systems Accessed"
            value="12"
            description="of 47 available"
            icon={IconServer}
            flex={1}
          />
        </Group>
        <Section
          title="Your Requests"
          withBorder
          rightSection={
            <Button
              component={Link}
              to="/app/access-request-systems"
              leftSection={<IconPlus />}
              variant="filled"
            >
              {"New Request"}
            </Button>
          }
        >
          <Stack gap="md">
            <Group gap="sm">
              <TextInput
                flex="2"
                placeholder="Search requests..."
                leftSection={
                  <IconSearch
                    color="var(--mb-color-text-secondary)"
                    size="1rem"
                  />
                }
              />
              <Select
                flex="1"
                placeholder="All Statuses"
                data={[
                  { label: "All Statuses", value: "all" },
                  { label: "Pending", value: "pending" },
                  { label: "Approved", value: "approved" },
                  { label: "Denied", value: "denied" },
                  { label: "In Review", value: "in-review" },
                ]}
              />
            </Group>
            <Box style={{ overflowX: "auto", width: "100%" }}>
              <AccessRequestTable />
            </Box>
          </Stack>
        </Section>
      </Stack>
    </Container>
  );
}

function AccessRequestTable() {
  return (
    <Table miw="40rem">
      <Table.Thead>
        <Table.Tr
          bg="var(--mb-color-bg-light)"
          style={{ borderBottom: "1px solid var(--mb-color-border)" }}
        >
          <Table.Th fz="md" fw={700} p="md">
            {"System"}
          </Table.Th>
          <Table.Th fz="md" fw={700} p="md">
            {"Status"}
          </Table.Th>
          <Table.Th fz="md" fw={700} p="md">
            {"Priority"}
          </Table.Th>
          <Table.Th fz="md" fw={700} p="md">
            {"Progress"}
          </Table.Th>
          <Table.Th fz="md" fw={700} p="md">
            {"Submitted"}
          </Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {ACCESS_PORTAL_ACTIVE_REQUESTS.map((request) => {
          const system = ACCESS_PORTAL_SYSTEMS.find(
            (system) => system.id === request.systemId,
          );

          return (
            <Table.Tr
              key={request.systemId}
              style={{ borderBottom: "1px solid var(--mb-color-border)" }}
            >
              <Table.Td p="md">
                <Stack gap="xs">
                  <Text fw={700}>{system?.name}</Text>
                  <Text fz="sm" lh={1} c="text-secondary">
                    {`Owner: ${system?.owner}`}
                  </Text>
                </Stack>
              </Table.Td>
              <Table.Td p="md">
                <RequestStatus status={request.status} />
              </Table.Td>
              <Table.Td p="md">
                <RequestPriority priority={request.priority} />
              </Table.Td>
              <Table.Td p="md"></Table.Td>
              <Table.Td p="md">
                <Stack gap="xs">
                  <Text fw="700">{dayjs(request.submittedAt).fromNow()}</Text>
                  <Text c="text-secondary" lh="1">
                    {new Date(request.submittedAt).toLocaleDateString()}
                  </Text>
                </Stack>
              </Table.Td>
            </Table.Tr>
          );
        })}
      </Table.Tbody>
    </Table>
  );
}

function RequestStatus({ status }: { status: string }) {
  let color = "warning";
  let label = "Pending";

  switch (status) {
    case "pending":
      color = "warning";
      label = "Pending";
      break;
    case "approved":
      color = "success";
      label = "Approved";
      break;
    case "rejected":
      color = "error";
      label = "Denied";
      break;
    case "in-review":
      color = "var(--mb-color-brand)";
      label = "In Review";
      break;
  }

  return (
    <Indicator
      color={color}
      position="middle-start"
      size={8}
      pl="0.75rem"
      ml="4px"
    >
      <Text>{label}</Text>
    </Indicator>
  );
}

function RequestPriority({ priority }: { priority: string }) {
  let color = "success";
  let label = "Low";

  switch (priority) {
    case "low":
      color = "success";
      label = "Low";
      break;
    case "normal":
      color = "var(--mb-color-brand)";
      label = "Normal";
      break;
    case "high":
      color = "warning";
      label = "High";
      break;
    case "urgent":
      color = "error";
      label = "Urgent";
      break;
  }

  return (
    <Badge color={color} variant="outline" size="sm" bg="white" radius="xs">
      {label}
    </Badge>
  );
}
