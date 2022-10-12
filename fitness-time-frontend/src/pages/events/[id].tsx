import {
  Button,
  TextInput,
  Text,
  Affix,
  ActionIcon,
  Stack,
} from "@mantine/core";
import { IconPencil } from "@tabler/icons";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { DateTimePicker } from "../../components/DateTimePicker";
import { QueryComponent } from "../../components/QueryComponent";
import EventService from "../../services/EventService";

export default function EventDetailsPage() {
  const router = useRouter();
  const { id } = router.query;

  const eventService = EventService();
  const eventDetailsQuery = eventService.useGetSingle(id?.toString());
  const useUpdate = eventService.useUpdate();

  const [name, setName] = useState<string>("");
  const [from, setFrom] = useState<Date>(new Date());
  const [to, setTo] = useState<Date>(new Date());

  useEffect(() => {
    if (eventDetailsQuery.data) {
      setName(eventDetailsQuery.data.name);
      setFrom(eventDetailsQuery.data.from);
      setTo(eventDetailsQuery.data.to);
    }
  }, [eventDetailsQuery.data]);

  const updateCall = () => {
    if (eventDetailsQuery.data) {
      useUpdate.mutate({
        ...eventDetailsQuery.data,
        name,
        from,
        to,
      });
    }
  };

  return (
    <>
      <QueryComponent resourceName={"Event Details"} query={eventDetailsQuery}>
        <Stack>
          <Text weight="bold" size="xl">
            {name}
          </Text>
          <TextInput
            value={name}
            onChange={(event) => setName(event.currentTarget.value)}
          />
          <DateTimePicker setFrom={setFrom} setTo={setTo} />
          <Text>{JSON.stringify(eventDetailsQuery.data)}</Text>
          <Button onClick={updateCall}>Update</Button>
        </Stack>
      </QueryComponent>
      <Affix position={{ bottom: 20, right: 20 }}>
        <ActionIcon
          variant="filled"
          size="xl"
          onClick={() => {
            /*TODO open edit modal*/
          }}
        >
          <IconPencil />
        </ActionIcon>
      </Affix>
    </>
  );
}
