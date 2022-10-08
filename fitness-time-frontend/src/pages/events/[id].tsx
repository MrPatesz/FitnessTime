import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { QueryComponent } from "../../components/QueryComponent";
import EventService from "../../services/EventService";

export default function EventDetailsPage() {
  const router = useRouter();
  const { id } = router.query;

  const eventService = EventService();
  const eventDetailsQuery = eventService.useGetSingle(id?.toString());
  const useUpdate = eventService.useUpdate();

  const [name, setName] = useState<string>("");

  useEffect(() => {
    if (eventDetailsQuery.data) {
      setName(eventDetailsQuery.data.name);
    }
  }, [eventDetailsQuery.data]);

  const updateCall = () => {
    if (eventDetailsQuery.data) {
      useUpdate.mutate({
        ...eventDetailsQuery.data,
        name,
      });
    }
  };

  return (
    <QueryComponent resourceName={"Event Details"} query={eventDetailsQuery}>
      <h1>{name}</h1>
      <input
        value={name}
        onChange={(event) => setName(event.currentTarget.value)}
      />
      <h3>{JSON.stringify(eventDetailsQuery.data)}</h3>
      <button onClick={updateCall}>Update</button>
    </QueryComponent>
  );
}
