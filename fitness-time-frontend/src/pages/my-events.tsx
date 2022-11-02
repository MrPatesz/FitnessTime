import { Affix, ActionIcon, Table } from "@mantine/core";
import React, { useState } from "react";
import { QueryComponent } from "../components/QueryComponent";
import EventService from "../services/EventService";
import { IconPlus, IconTrash } from "@tabler/icons";
import { CreateEventDialog } from "../components/event/CreateEventDialog";
import { useRouter } from "next/router";

export default function MyEventsPage() {
  const [openCreate, setOpenCreate] = useState(false);

  const router = useRouter();

  const eventService = EventService();
  const eventsQuery = eventService.useGetAllOwned();
  const deleteEvent = eventService.useDelete();

  return (
    <>
      <QueryComponent resourceName={"My Events"} query={eventsQuery}>
        <Table highlightOnHover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Date</th>
              <th>Interval</th>
              <th>Limit</th>
              <th>Price</th>
              <th>Equipment</th>
              <th></th>
              {/* <th>Recurring</th> */}
            </tr>
          </thead>
          <tbody>
            {eventsQuery.data?.map((event) => (
              <tr
                key={event.id}
                onClick={() => router.replace(`events/${event.id}`)}
                style={{ cursor: "pointer" }}
              >
                <td>{event.name}</td>
                <td>{event.location}</td>
                <td>{new Date(event.from).toLocaleDateString()}</td>
                <td>
                  {new Date(event.from).toLocaleTimeString()} -{" "}
                  {new Date(event.to).toLocaleTimeString()}
                </td>
                <td>{event.limit}</td>
                <td>{event.price}</td>
                <td>{event.equipment}</td>
                {/* <td>{event.recurring.toString()}</td> */}
                <td>
                  <ActionIcon
                    variant="filled"
                    size="md"
                    onClick={(e: any) => {
                      e.stopPropagation();
                      deleteEvent.mutate(event.id);
                    }}
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
