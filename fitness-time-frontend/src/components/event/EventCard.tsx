import { Badge, Button, Group, Card, Text, Stack } from "@mantine/core";
import Link from "next/link";
import React from "react";
import EventDto from "../../models/eventDto";

export const EventCard: React.FunctionComponent<{
  event: EventDto;
}> = ({ event }) => {
  return (
    <Card shadow="md" radius="md" p="lg">
      <Stack spacing="xs">
        <Text weight="bold">{event.name}</Text>
        <Group>
          {!event.price && (
            <Badge color="green" variant="light">
              Free
            </Badge>
          )}
          {event.equipment && (
            <Badge color="yellow" variant="light">
              Equipment
            </Badge>
          )}
          {event.limit && (
            <Badge color="red" variant="light">
              Limited
            </Badge>
          )}
          {/* {event.recurring && (
            <Badge color="violet" variant="light">
              Recurring
            </Badge>
          )} */}
        </Group>
        <Text>{event.description}</Text>
        <Link href={"/events/[id]"} as={`/events/${event.id}`} passHref>
          <Button component="a">Details</Button>
        </Link>
      </Stack>
    </Card>
  );
};
