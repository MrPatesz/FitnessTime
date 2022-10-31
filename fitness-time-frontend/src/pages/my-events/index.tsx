import { Affix, ActionIcon, Table, Text } from "@mantine/core";
import Link from "next/link";
import React, { useState } from "react";
import { QueryComponent } from "../../components/QueryComponent";
import EventService from "../../services/EventService";
import { IconPlus, IconTrash } from "@tabler/icons";
import { CreateEventDialog } from "../../components/event/CreateEventDialog";

export default function MyEventsPage() {
  const [openCreate, setOpenCreate] = useState(false);

  const eventService = EventService();
  const eventsQuery = eventService.useGetAllOwned();
  const deleteEvent = eventService.useDelete();

  return (
    <>
      <QueryComponent resourceName={"Events"} query={eventsQuery}>
        <Table highlightOnHover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>From</th>
              <th>To</th>
              <th>Limit</th>
              <th>Price</th>
              <th>Equipment</th>
              <th>Recurring</th>
            </tr>
          </thead>
          <tbody>
            {eventsQuery.data?.map((event) => (
              <tr key={event.id}>
                <td>
                  <Link href={"/my-events/[id]"} as={`/my-events/${event.id}`}>
                    <Text component="a" sx={{ cursor: "pointer" }}>
                      {event.name}
                    </Text>
                  </Link>
                </td>
                <td>{event.location}</td>
                <td>{event.from.toString()}</td>
                <td>{event.to.toString()}</td>
                <td>{event.limit}</td>
                <td>{event.price}</td>
                <td>{event.equipment}</td>
                <td>{event.recurring.toString()}</td>
                <td>
                  <ActionIcon
                    variant="filled"
                    size="md"
                    onClick={() => deleteEvent.mutate(event.id)}
                  >
                    <IconTrash />
                  </ActionIcon>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </QueryComponent>
      <CreateEventDialog
        open={openCreate}
        onClose={() => setOpenCreate(false)}
      />
      <Affix position={{ bottom: 20, right: 20 }}>
        <ActionIcon
          variant="filled"
          size="xl"
          onClick={() => setOpenCreate(true)}
        >
          <IconPlus />
        </ActionIcon>
      </Affix>
    </>
  );
}
