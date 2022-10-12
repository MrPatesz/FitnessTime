import { Button, Affix, ActionIcon, Modal, Stack, Group } from "@mantine/core";
import Link from "next/link";
import React, { useState } from "react";
import { QueryComponent } from "../../components/QueryComponent";
import { defaultEventDto } from "../../models/eventDto";
import EventService from "../../services/EventService";
import { IconPlus } from "@tabler/icons";

export default function MyEventsPage() {
  const [openCreate, setOpenCreate] = useState(false);

  const eventService = EventService();
  const eventsQuery = eventService.useGetAllOwned();
  const deleteEvent = eventService.useDelete();
  const createEvent = eventService.useCreate();

  return (
    <>
      <QueryComponent resourceName={"Events"} query={eventsQuery}>
        <Stack>
          {eventsQuery.data?.map((event) => (
            <Group key={event.id}>
              <Link href={`/events/${event.id}`}>{event.name}</Link>
              <Button onClick={() => deleteEvent.mutate(event.id)}>
                Delete
              </Button>
            </Group>
          ))}
        </Stack>
      </QueryComponent>
      <Modal
        opened={openCreate}
        onClose={() => setOpenCreate(false)}
        title="Create Event"
      >
        <Button onClick={() => createEvent.mutate(defaultEventDto)}>
          Create
        </Button>
      </Modal>
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
