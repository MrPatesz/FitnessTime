import { Text, Affix, ActionIcon, Stack } from "@mantine/core";
import { IconPencil } from "@tabler/icons";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { EditEventDialog } from "../../components/event/EditEventDialog";
import { QueryComponent } from "../../components/QueryComponent";
import EventService from "../../services/EventService";

export default function MyEventDetailsPage() {
  const [openEdit, setOpenEdit] = useState(false);

  const router = useRouter();
  const { id } = router.query;

  const eventService = EventService();
  const eventQuery = eventService.useGetSingle(id?.toString());

  return (
    <>
      <QueryComponent resourceName={"Event Details"} query={eventQuery}>
        <Stack>
          <Text weight="bold" size="xl">
            {eventQuery.data?.name}
          </Text>
          <Text>{JSON.stringify(eventQuery.data)}</Text>
        </Stack>
      </QueryComponent>
      <EditEventDialog
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        eventQuery={eventQuery}
      />
      <Affix position={{ bottom: 20, right: 20 }}>
        <ActionIcon
          variant="filled"
          size="xl"
          onClick={() => setOpenEdit(true)}
        >
          <IconPencil />
        </ActionIcon>
      </Affix>
    </>
  );
}
