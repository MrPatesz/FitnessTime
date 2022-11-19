import {
  Affix,
  ActionIcon,
  Stack,
  Button,
  Group,
  Text,
  Card,
  Badge,
} from "@mantine/core";
import { IconPencil } from "@tabler/icons";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { EditEventDialog } from "../../components/event/EditEventDialog";
import { QueryComponent } from "../../components/QueryComponent";
import EventService from "../../services/EventService";
import MapComponent from "../../components/MapComponent";

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
          <Group align={"start"} position={"apart"}>
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
                <Group spacing="xs">
                  <Text>
                    {new Date(eventQuery.data.from).toLocaleDateString()}
                  </Text>
                  <Text>
                    {new Date(eventQuery.data.from).toLocaleTimeString()}
                  </Text>
                  <Text>-</Text>
                  <Text>
                    {new Date(eventQuery.data.to).toLocaleTimeString()}
                  </Text>
                </Group>
              )}
              {eventQuery.data?.equipment && (
                <Text color={"violet"}>
                  {eventQuery.data?.equipment} shall be brought to the event!
                </Text>
              )}
              {eventQuery.data?.price && (
                <Text>Price: {eventQuery.data?.price}</Text>
              )}
            </Stack>
            {eventQuery.data && (
              <MapComponent locationDto={eventQuery.data.location} />
            )}
          </Group>
          <Card shadow="md" radius="md" p="lg">
            {eventQuery.data?.participants.length ? (
              <Stack>
                <Group spacing={"xs"}>
                  {eventQuery.data?.limit && (
                    <Badge color={"red"}>
                      {eventQuery.data?.participants.length}/
                      {eventQuery.data?.limit}
                    </Badge>
                  )}
                  <Text>They will also be there:</Text>
                </Group>
                <Group spacing="xs">
                  {eventQuery.data?.participants.map((p, index) => (
                    <Link
                      key={p.id}
                      href={"/users/[id]"}
                      as={`/users/${p.id}`}
                      passHref
                    >
                      <Text component="a" sx={{ cursor: "pointer" }}>
                        {p.username}
                        {index !== eventQuery.data?.participants.length - 1 && (
                          <>,</>
                        )}
                      </Text>
                    </Link>
                  ))}
                </Group>
              </Stack>
            ) : (
              <Group spacing={"xs"}>
                {eventQuery.data?.limit && (
                  <Badge color={"red"}>
                    {eventQuery.data?.participants.length}/
                    {eventQuery.data?.limit}
                  </Badge>
                )}
                <Text>There are no participants yet.</Text>
              </Group>
            )}
          </Card>
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
            eventId={parseInt(`${id?.toString()}`)}
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
