import { Button, Stack, Group } from "@mantine/core";
import Link from "next/link";
import React from "react";
import { QueryComponent } from "../components/QueryComponent";
import EventService from "../services/EventService";

export default function FeedPage() {
  const eventService = EventService();
  const eventsQuery = eventService.useGetAll();
  const participate = eventService.useParticipate();

  return (
    <QueryComponent resourceName="Events" query={eventsQuery}>
      <Stack>
        {eventsQuery.data?.map((event) => (
          <Group key={event.id}>
            <Link href={`/events/${event.id}`}>{event.name}</Link>
            <Button
              onClick={() => participate.mutate({ status: true, id: event.id })}
            >
              Participate
            </Button>
          </Group>
        ))}
      </Stack>
    </QueryComponent>
  );
}
