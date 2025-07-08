/* eslint-disable no-restricted-imports */
import { type MantineStyleProps, Text } from "@mantine/core";

type Props = MantineStyleProps & {
  emoji: string;
};

export function EmojiIcon({ emoji, ...props }: Props) {
  return (
    <Text component="div" {...props} lh={1.2}>
      {emoji}
    </Text>
  );
}
