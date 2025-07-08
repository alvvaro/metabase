/* eslint-disable no-restricted-imports */
import {
  Badge,
  Flex,
  type FlexProps,
  Group,
  type MantineStyleProps,
  Stack,
  Tabs,
} from "@mantine/core";
import { useMemo, useState } from "react";

type Props<T> = MantineStyleProps &
  FlexProps & {
    items: T[];
    tabs?: { label: string; value: string }[];
    getItemTab?: (item: T) => string | null;
    renderItem: (item: T) => React.ReactNode;
  };

export function List<T>({
  items,
  renderItem,
  tabs,
  getItemTab,
  ...props
}: Props<T>) {
  const [selectedTab, setSelectedTab] = useState<string | null>(
    tabs?.[0]?.value ?? null,
  );

  const filteredItems = useMemo(() => {
    if (!selectedTab) {
      return items;
    }

    return items.filter((item) => getItemTab?.(item) === selectedTab);
  }, [items, selectedTab, getItemTab]);

  return (
    <Stack gap="sm">
      {tabs && (
        <Tabs
          value={selectedTab}
          onChange={setSelectedTab}
          styles={{
            tab: {
              fontSize: "0.875rem",
              padding: "0.5rem 1rem",
            },
          }}
        >
          <Group gap="0" style={{ overflowX: "auto" }} wrap="nowrap">
            {tabs.map((tab) => (
              <Tabs.Tab key={tab.value} value={tab.value}>
                {tab.label}{" "}
                <Badge>
                  {
                    items.filter((item) => getItemTab?.(item) === tab.value)
                      .length
                  }
                </Badge>
              </Tabs.Tab>
            ))}
          </Group>
        </Tabs>
      )}

      <Flex gap="xs" {...props}>
        {filteredItems.map((item) => renderItem(item))}
      </Flex>
    </Stack>
  );
}
