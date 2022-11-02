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
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { EditEventDialog } from "../../components/event/EditEventDialog";
import { QueryComponent } from "../../components/QueryComponent";
import EventService from "../../services/EventService";

export default function EventDetailsPage() {
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
              <Link
                href={"/users/[id]"}
                as={`/users/${eventQuery.data?.owner?.id}`}
                passHref
              >
                <Text size="xl" component="a" sx={{ cursor: "pointer" }}>
                  {eventQuery.data?.owner?.username}
                </Text>
              </Link>
            </Group>
            {eventQuery.data?.description && (
              <Text>{eventQuery.data?.description}</Text>
            )}
            {eventQuery.data && (
              <Text>
                {new Date(eventQuery.data.from).toLocaleDateString()}{" "}
                {new Date(eventQuery.data.from).toLocaleTimeString()} -{" "}
                {new Date(eventQuery.data.to).toLocaleTimeString()}
              </Text>
            )}
            {eventQuery.data?.location && (
              <Text>Location: {eventQuery.data?.location}</Text>
            )}
            {eventQuery.data?.equipment && (
              <Text>Equipment: {eventQuery.data?.equipment}</Text>
            )}
            {eventQuery.data?.price && (
              <Text>Price: {eventQuery.data?.price}</Text>
            )}
            {eventQuery.data?.limit && (
              <Text>Limit: {eventQuery.data?.limit}</Text>
            )}

            <Card shadow="md" radius="md" p="lg">
              <Text weight="bold">Participants</Text>
              <Stack spacing="xs">
                {eventQuery.data?.participants.map((p) => (
                  <Link
                    key={p.id}
                    href={"/users/[id]"}
                    as={`/users/${p.id}`}
                    passHref
                  >
                    <Text component="a" sx={{ cursor: "pointer" }}>
                      {p.username}
                    </Text>
                  </Link>
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
