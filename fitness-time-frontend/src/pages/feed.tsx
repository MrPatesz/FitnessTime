import { SimpleGrid } from "@mantine/core";
import React from "react";
import { EventCard } from "../components/event/EventCard";
import { QueryComponent } from "../components/QueryComponent";
import EventService from "../services/EventService";

export default function FeedPage() {
  const eventService = EventService();
  const eventsQuery = eventService.useGetFeed();

  return (
    <QueryComponent resourceName="Feed" query={eventsQuery}>
      <SimpleGrid cols={3}>
        {eventsQuery.data?.map((event) => (
          <EventCard event={event} key={event.id} />
        ))}
      </SimpleGrid>
    </QueryComponent>
  );
}
