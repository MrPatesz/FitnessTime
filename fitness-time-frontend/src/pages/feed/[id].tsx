import { Stack, Button } from "@mantine/core";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { EventDetails } from "../../components/event/EventDetails";
import { QueryComponent } from "../../components/QueryComponent";
import EventService from "../../services/EventService";

export default function EventDetailsPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const { id } = router.query;

  const eventService = EventService();
  const eventQuery = eventService.useGetSingle(id?.toString());
  const participate = eventService.useParticipate();

  return (
    <QueryComponent resourceName={"Event Details"} query={eventQuery}>
      <Stack>
        <EventDetails event={eventQuery.data} />
        {eventQuery.data?.participants.find(
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
        )}
      </Stack>
    </QueryComponent>
  );
}
