import { Text, Stack, Card, Group } from "@mantine/core";
import React from "react";
import EventDto from "../../models/eventDto";

export const EventDetails: React.FunctionComponent<{
  event: EventDto | undefined;
}> = ({ event }) => {
  if (!event) {
    return <></>;
  }
  return (
    <Stack>
      <Group align={"center"}>
        <Text weight="bold" size="xl">
          {event.name}
        </Text>
        <Text>{event.owner?.username}</Text>
      </Group>
      <Text>{event.description}</Text>
      <Text>{event.location}</Text>
      <Text>{event.equipment}</Text>
      <Text>{event.price}</Text>
      <Text>{event.limit}</Text>
      <Text>
        {new Date(event.from).toLocaleDateString()}{" "}
        {new Date(event.from).toLocaleTimeString()} -{" "}
        {new Date(event.to).toLocaleTimeString()}
      </Text>

      <Card shadow="md" radius="md" p="lg">
        <Text weight="bold">Participants</Text>
        <Stack spacing="xs">
          {event.participants.map((p) => (
            <Text key={p.id}>{p.username}</Text>
          ))}
        </Stack>
      </Card>
    </Stack>
  );
};
