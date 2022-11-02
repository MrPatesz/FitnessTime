import { Text, Stack, SimpleGrid } from "@mantine/core";
import { useRouter } from "next/router";
import React from "react";
import { EventCard } from "../../components/event/EventCard";
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
        <Text>{userDetailsQuery.data?.introduction}</Text>
        {userDetailsQuery.data?.ownedEvents &&
          userDetailsQuery.data.ownedEvents.length !== 0 && (
            <>
              <Text size="lg">Owned Events</Text>
              <SimpleGrid cols={3}>
                {userDetailsQuery.data.ownedEvents?.map((event) => (
                  <EventCard event={event} key={event.id} />
                ))}
              </SimpleGrid>
            </>
          )}
      </Stack>
    </QueryComponent>
  );
}
