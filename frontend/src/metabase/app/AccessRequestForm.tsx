/* eslint-disable no-restricted-imports */
import {
  Button,
  Container,
  Divider,
  Group,
  Paper,
  Radio,
  Select,
  Stack,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";

import { useSelector } from "metabase/lib/redux";

import { HeaderWithNavigation } from "./components/HeaderWithNavigation";
import { ACCESS_PORTAL_SYSTEMS } from "./data/access-portal";

export function AccessRequestForm() {
  const currentUser = useSelector((state) => state.currentUser);
  return (
    <>
      <HeaderWithNavigation
        title="Access Request Systems"
        navigationItems={[
          { label: "All Systems", href: "/access-request-systems" },
          { label: "New Request", href: "/access-request-systems/new" },
          { label: "My Requests", href: "/access-request-portal" },
        ]}
      />
      <Container size="70rem" p="xl">
        <Paper withBorder radius="xs" p="md">
          <Stack gap="lg">
            <Title order={2}>{"Request Access Form"}</Title>
            <Divider />
            <Select
              placeholder="Select a system"
              label="System"
              data={ACCESS_PORTAL_SYSTEMS.map((system) => ({
                label: `${system.emoji} ${system.name}`,
                value: system.id,
              }))}
              defaultValue={document.location.search.split("system=")[1]}
              searchable
              required
            />
            <TextInput
              placeholder="Name"
              label="Your Name"
              value={currentUser?.common_name ?? ""}
              required
              disabled
            />
            <Textarea
              placeholder="Describe why do you need the access and for how long"
              label="Additional Information (optional)"
              autosize
              minRows={4}
              maxRows={10}
            />
            <Radio.Group label="How urgent is your request?" withAsterisk>
              <Group mt="xs">
                <Radio value="critical" label="🔥 Today - Critical blocker" />
                <Radio value="active" label="⚡ This week - Active project" />
                <Radio value="flexible" label="📅 Flexible - Planning ahead" />
              </Group>
            </Radio.Group>
            <Button variant="filled" fullWidth>
              {"Submit Request"}
            </Button>
          </Stack>
        </Paper>
      </Container>
    </>
  );
}
