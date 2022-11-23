import { Affix, ActionIcon, Table, Group, Stack } from "@mantine/core";
import React, { useState } from "react";
import { QueryComponent } from "../components/QueryComponent";
import EventService from "../services/EventService";
import { IconPencil, IconPlus, IconTrash } from "@tabler/icons";
import { CreateEventDialog } from "../components/event/CreateEventDialog";
import { useRouter } from "next/router";
import { EditEventDialog } from "../components/event/EditEventDialog";
import { getIntervalString } from "../util/utilFunctions";
import EventDto from "../models/eventDto";
import { FilterEventsComponent } from "../components/event/FilterEventsComponent";
import { ConfirmDialog } from "../components/ConfirmDialog";

export default function MyEventsPage() {
  const [filteredList, setFilteredList] = useState<EventDto[]>([]);
  const [openCreate, setOpenCreate] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const router = useRouter();

  const eventService = EventService();
  const eventsQuery = eventService.useGetAllOwned();
  const deleteEvent = eventService.useDelete();

  return (
    <>
      <Stack>
        <FilterEventsComponent
          events={eventsQuery.data ?? []}
          setFilteredEvents={setFilteredList}
          filterKey="MyEventsPageFilter"
        />
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
              {filteredList.map((event) => (
                <tr
                  key={event.id}
                  onClick={() => router.replace(`events/${event.id}`)}
                  style={{ cursor: "pointer" }}
                >
                  <td>{event.name}</td>
                  <td>{new Date(event.from).toLocaleDateString()}</td>
                  <td>{getIntervalString(event.from, event.to)}</td>
                  <td>{event.location.address}</td>
                  <td>{event.equipment}</td>
                  <td>{event.price && <>$ {event.price}</>}</td>
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
                          setDeleteId(event.id);
                        }}
                      >
                        <IconTrash />
                      </ActionIcon>
                      <EditEventDialog
                        open={editId === event.id}
                        onClose={() => setEditId(null)}
                        eventId={event.id}
                      />
                      <ConfirmDialog
                        title={`Are you sure you want to delete this event: ${event.name}?`}
                        open={deleteId === event.id}
                        onClose={() => setDeleteId(null)}
                        onConfirm={() => deleteEvent.mutate(event.id)}
                      />
                    </Group>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </QueryComponent>
      </Stack>
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
