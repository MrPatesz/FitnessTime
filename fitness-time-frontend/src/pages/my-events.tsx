import { Affix, ActionIcon, Table, Text, Group } from "@mantine/core";
import React, { useState } from "react";
import { QueryComponent } from "../components/QueryComponent";
import EventService from "../services/EventService";
import { IconPencil, IconPlus, IconTrash } from "@tabler/icons";
import { CreateEventDialog } from "../components/event/CreateEventDialog";
import { useRouter } from "next/router";
import { EditEventDialog } from "../components/event/EditEventDialog";

export default function MyEventsPage() {
  const [openCreate, setOpenCreate] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

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
              <th>Date</th>
              <th>Interval</th>
              <th>Location</th>
              <th>Equipment</th>
              <th>Price</th>
              <th>Limit</th>
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
                <td>{new Date(event.from).toLocaleDateString()}</td>
                <td>
                  <Group spacing="xs">
                    <Text>{new Date(event.from).toLocaleTimeString()}</Text>
                    <Text>-</Text>
                    <Text>{new Date(event.to).toLocaleTimeString()}</Text>
                  </Group>
                </td>
                <td>{event.location.address}</td>
                <td>{event.equipment}</td>
                <td>$ {event.price}</td>
                <td>{event.limit}</td>
                {/* <td>{event.recurring.toString()}</td> */}
                <td>
                  <Group spacing="xs">
                    <ActionIcon
                      variant="filled"
                      size="md"
                      onClick={(e: any) => {
                        e.stopPropagation();
                        setEditId(event.id);
                      }}
                    >
                      <IconPencil />
                    </ActionIcon>
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
                    <EditEventDialog
                      open={editId === event.id}
                      onClose={() => setEditId(null)}
                      eventId={event.id}
                    />
                  </Group>
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
