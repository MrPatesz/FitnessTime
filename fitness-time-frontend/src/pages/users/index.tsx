import { Text, Stack } from "@mantine/core";
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
        {usersQuery.data?.map((user) => (
          <Link
            key={user.id}
            href={"/users/[id]"}
            as={`/users/${user.id}`}
            passHref
          >
            <Text component="a" sx={{ cursor: "pointer" }}>
              {user.username}
            </Text>
          </Link>
        ))}
      </Stack>
    </QueryComponent>
  );
}
