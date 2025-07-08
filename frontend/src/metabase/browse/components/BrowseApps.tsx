import { push } from "react-router-redux";
import { t } from "ttag";

import {
  BrowseContainer,
  BrowseHeader,
  BrowseMain,
  BrowseSection,
} from "metabase/browse/components/BrowseContainer.styled";
import {
  Cell,
  NameColumn,
} from "metabase/browse/components/BrowseTable.styled";
import { SortableColumnHeader } from "metabase/common/components/ItemsTable/BaseItemsTable";
import {
  TBody,
  Table,
  TableColumn,
} from "metabase/common/components/ItemsTable/BaseItemsTable.styled";
import { useDispatch } from "metabase/lib/redux";
import { Box, Flex, Group, Icon, Stack, Text, Title } from "metabase/ui";

const titleId = "browse-apps-header";
const APPS = [
  {
    name: "Components Showcase",
    id: "components-showcase",
    description: "A showcase of all components",
    createdAt: new Date(),
  },
  {
    name: "My Access Requests",
    id: "access-request-portal",
    description: "A portal for requesting access to resources",
    createdAt: new Date(),
  },
  {
    name: "Access Request Systems",
    id: "access-request-systems",
    description: "A list of systems that require access requests",
    createdAt: new Date(),
  },
];

export const BrowseApps = () => {
  const dispatch = useDispatch();

  const handleOpenApp = (appId: string) => {
    dispatch(push(`/app/${appId}`));
  };

  return (
    <BrowseContainer>
      <BrowseHeader role="heading" data-testid="browse-apps-header">
        <BrowseSection>
          <Flex
            w="100%"
            h="2.25rem"
            direction="row"
            justify="space-between"
            align="center"
          >
            <Title order={2} c="text-dark" id={titleId}>
              <Group gap="sm">
                <Icon
                  size={24}
                  color="var(--mb-color-icon-primary)"
                  name="grid"
                />
                {t`Apps`}
              </Group>
            </Title>
          </Flex>
        </BrowseSection>
      </BrowseHeader>

      <BrowseMain>
        <BrowseSection>
          <Stack mb="lg" gap="md" w="100%">
            <Box style={{ flex: 1 }}>
              <Table aria-labelledby={titleId}>
                <colgroup>
                  <NameColumn />
                  <TableColumn />
                  <TableColumn />
                </colgroup>
                <thead>
                  <tr>
                    <SortableColumnHeader>{t`Name`}</SortableColumnHeader>
                    <SortableColumnHeader>
                      {t`Description`}
                    </SortableColumnHeader>
                    <SortableColumnHeader>{t`Created`}</SortableColumnHeader>
                  </tr>
                </thead>
                <TBody>
                  {APPS.map((app) => (
                    <tr
                      key={app.id}
                      style={{ cursor: "pointer" }}
                      onClick={() => handleOpenApp(app.id)}
                    >
                      <Cell style={{ padding: "0.5rem 1rem" }}>
                        <Text fw="bold" size="md">
                          {app.name}
                        </Text>
                      </Cell>
                      <Cell style={{ padding: "0.5rem 1rem" }}>
                        <Text c="text-medium" size="sm">
                          {app.description || t`No description`}
                        </Text>
                      </Cell>
                      <Cell style={{ padding: "0.5rem 1rem" }}>
                        <Text c="text-medium" size="sm">
                          {new Date(app.createdAt).toLocaleDateString()}
                        </Text>
                      </Cell>
                    </tr>
                  ))}
                </TBody>
              </Table>
            </Box>
          </Stack>
        </BrowseSection>
      </BrowseMain>
    </BrowseContainer>
  );
};
