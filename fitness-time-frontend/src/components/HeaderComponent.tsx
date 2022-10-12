import React from "react";
import { signOut } from "next-auth/react";
import { Button, Text, Group } from "@mantine/core";

export const HeaderComponent: React.FunctionComponent<{
  username: string | undefined;
}> = ({ username }) => {
  return (
    <Group align="center" position="apart">
      <Text weight="bold" size="xl">
        Fitness Time
      </Text>

      <Group>
        <Text size="lg">{username}</Text>
        <Button onClick={() => signOut({ callbackUrl: "/welcome" })}>
          Logout
        </Button>
      </Group>
    </Group>
  );
};
