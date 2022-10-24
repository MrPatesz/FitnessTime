import { Text, Stack } from "@mantine/core";
import { useRouter } from "next/router";
import React from "react";
import { QueryComponent } from "../../components/QueryComponent";
import UserService from "../../services/UserService";

export default function UserDetailsPage() {
  const router = useRouter();
  const { id } = router.query;

  const userService = UserService();
  const userDetailsQuery = userService.useGetSingle(id?.toString());

  return (
    <QueryComponent resourceName={"User Details"} query={userDetailsQuery}>
      <Stack>
        <Text weight="bold" size="xl">
          {userDetailsQuery.data?.username}
        </Text>
        <Text>{JSON.stringify(userDetailsQuery.data)}</Text>
      </Stack>
    </QueryComponent>
  );
}
