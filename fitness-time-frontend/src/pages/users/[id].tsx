import { Button, TextInput, Text, Stack } from "@mantine/core";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { QueryComponent } from "../../components/QueryComponent";
import UserService from "../../services/UserService";

export default function UserDetailsPage() {
  const router = useRouter();
  const { id } = router.query;

  const userService = UserService();
  const userDetailsQuery = userService.useGetSingle(id?.toString());
  const useUpdate = userService.useUpdate();

  const [introduction, setIntroduction] = useState<string>("");

  useEffect(() => {
    if (userDetailsQuery.data?.introduction) {
      setIntroduction(userDetailsQuery.data.introduction);
    }
  }, [userDetailsQuery.data]);

  const updateCall = () => {
    if (userDetailsQuery.data) {
      useUpdate.mutate({
        ...userDetailsQuery.data,
        introduction: introduction,
      });
    }
  };

  return (
    <QueryComponent resourceName={"User Details"} query={userDetailsQuery}>
      <Stack>
        <Text weight="bold" size="xl">
          {userDetailsQuery.data?.username}
        </Text>
        <TextInput
          value={introduction}
          onChange={(event) => setIntroduction(event.currentTarget.value)}
        />
        <Text>{JSON.stringify(userDetailsQuery.data)}</Text>
        <Button onClick={updateCall}>Update</Button>
      </Stack>
    </QueryComponent>
  );
}
