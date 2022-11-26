import { SimpleGrid, Stack } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React, { useState } from "react";
import { EventCard } from "../components/event/EventCard";
import { FilterEventsComponent } from "../components/event/FilterEventsComponent";
import { QueryComponent } from "../components/QueryComponent";
import EventDto from "../models/eventDto";
import EventService from "../services/EventService";

export default function FeedPage() {
  const [filteredList, setFilteredList] = useState<EventDto[]>([]);

  const medium = useMediaQuery("(min-width: 600px)");
  const large = useMediaQuery("(min-width: 950px)");
  const extraLarge = useMediaQuery("(min-width: 1300px)");

  const eventService = EventService();
  const eventsQuery = eventService.useGetFeed();

  return (
    <Stack>
      <FilterEventsComponent
        events={eventsQuery.data ?? []}
        setFilteredEvents={setFilteredList}
        filterKey="FeedPageFilter"
      />
      <QueryComponent resourceName="Feed" query={eventsQuery}>
        <SimpleGrid cols={extraLarge ? 4 : large ? 3 : medium ? 2 : 1}>
          {filteredList.map((event) => (
            <EventCard event={event} key={event.id} />
          ))}
        </SimpleGrid>
      </QueryComponent>
    </Stack>
  );
}
