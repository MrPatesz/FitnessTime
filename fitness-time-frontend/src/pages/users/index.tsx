import { Group, Stack } from "@mantine/core";
import Link from "next/link";
import React from "react";
import { QueryComponent } from "../../components/QueryComponent";
import UserService from "../../services/UserService";

export default function UsersPage() {
  const userService = UserService();
  const usersQuery = userService.useGetAll();

  return (
    <QueryComponent resourceName={"Users"} query={usersQuery}>
      <Stack>
        {usersQuery.data?.map((event) => (
          <Group key={event.id}>
            <Link href={"/users/[id]"} as={`/users/${event.id}`}>
              {event.username}
            </Link>
          </Group>
        ))}
      </Stack>
    </QueryComponent>
  );
}
