import Link from "next/link";
import React from "react";
import { QueryComponent } from "../../components/QueryComponent";
import { defaultEventDto } from "../../models/eventDto";
import EventService from "../../services/EventService";

export default function EventsPage() {
  const eventService = EventService();
  const eventsQuery = eventService.useGetAll();
  const deleteEvent = eventService.useDelete();
  const createEvent = eventService.useCreate();
  const participate = eventService.useParticipate();

  return (
    <>
      <button onClick={() => createEvent.mutate(defaultEventDto)}>
        Create
      </button>
      <QueryComponent resourceName={"Events"} query={eventsQuery}>
        <ul>
          {eventsQuery.data?.map((event) => (
            <li key={event.id}>
              <Link href={`/events/${event.id}`}>{event.name}</Link>
              <button onClick={() => participate.mutate(event.id)}>
                Participate
              </button>
              <button onClick={() => deleteEvent.mutate(event.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </QueryComponent>
    </>
  );
}
