import {
  Affix,
  ActionIcon,
  Stack,
  Button,
  Group,
  Text,
  Card,
} from "@mantine/core";
import { IconPencil } from "@tabler/icons";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { EditEventDialog } from "../../components/event/EditEventDialog";
import { QueryComponent } from "../../components/QueryComponent";
import EventService from "../../services/EventService";

export default function MyEventDetailsPage() {
  const [openEdit, setOpenEdit] = useState(false);

  const { data: session } = useSession();
  const router = useRouter();
  const { id } = router.query;

  const eventService = EventService();
  const eventQuery = eventService.useGetSingle(id?.toString());
  const participate = eventService.useParticipate();

  return (
    <>
      <QueryComponent resourceName={"Event Details"} query={eventQuery}>
        <Stack>
          <Stack>
            <Group align={"center"}>
              <Text weight="bold" size="xl">
                {eventQuery.data?.name}
              </Text>
              <Text>{eventQuery.data?.owner?.username}</Text>
            </Group>
            <Text>{eventQuery.data?.description}</Text>
            <Text>{eventQuery.data?.location}</Text>
            <Text>{eventQuery.data?.equipment}</Text>
            <Text>{eventQuery.data?.price}</Text>
            <Text>{eventQuery.data?.limit}</Text>
            {eventQuery.data && (
              <Text>
                {new Date(eventQuery.data.from).toLocaleDateString()}{" "}
                {new Date(eventQuery.data.from).toLocaleTimeString()} -{" "}
                {new Date(eventQuery.data.to).toLocaleTimeString()}
              </Text>
            )}

            <Card shadow="md" radius="md" p="lg">
              <Text weight="bold">Participants</Text>
              <Stack spacing="xs">
                {eventQuery.data?.participants.map((p) => (
                  <Text key={p.id}>{p.username}</Text>
                ))}
              </Stack>
            </Card>
          </Stack>
          {!eventQuery.data?.ownedByCaller &&
            (eventQuery.data?.participants.find(
              (p) => p.id === session?.user.userId
            ) ? (
              <Button
                onClick={() =>
                  participate.mutate({ id: id?.toString(), status: false })
                }
              >
                Remove participation
              </Button>
            ) : (
              <Button
                onClick={() =>
                  participate.mutate({ id: id?.toString(), status: true })
                }
              >
                Participate
              </Button>
            ))}
        </Stack>
      </QueryComponent>
      {eventQuery.data?.ownedByCaller && (
        <>
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
      )}
    </>
  );
}
