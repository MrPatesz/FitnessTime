import React from "react";
import { signOut } from "next-auth/react";
import { Button, Group, Title, Text } from "@mantine/core";
import Link from "next/link";

export const HeaderComponent: React.FunctionComponent<{
  username: string | undefined;
}> = ({ username }) => {
  return (
    <Group align="center" position="apart">
      <Title order={2}>Fitness Time</Title>

      <Group>
        <Link href="/profile">
          <Text
            component="a"
            sx={{ cursor: "pointer" }}
            size="lg"
            weight="bold"
          >
            {username}
          </Text>
        </Link>
        <Button
          variant="light"
          onClick={() => signOut({ callbackUrl: "/welcome" })}
        >
          Logout
        </Button>
      </Group>
    </Group>
  );
};
