import { Button, Modal } from "@mantine/core";
import { UseQueryResult } from "@tanstack/react-query";
import React, { useState } from "react";
import EventDto, { defaultEventDto } from "../../models/eventDto";
import EventService from "../../services/EventService";
import { QueryComponent } from "../QueryComponent";
import { EventForm } from "./EventForm";

export const EditEventDialog: React.FunctionComponent<{
  open: boolean;
  onClose: () => void;
  eventQuery: UseQueryResult<EventDto, unknown>;
}> = ({ open, onClose, eventQuery }) => {
  const [event, setEvent] = useState<EventDto>(defaultEventDto);

  const eventService = EventService();
  const useUpdate = eventService.useUpdate();

  return (
    <Modal
      opened={open}
      onClose={onClose}
      title="Edit Event"
      closeOnClickOutside={false}
    >
      <QueryComponent
        resourceName={"Event Details"}
        query={eventQuery}
        setState={setEvent}
      >
        <EventForm
          event={event}
          setEvent={setEvent}
          submitButton={
            <Button onClick={() => useUpdate.mutateAsync(event).then(onClose)}>
              Update
            </Button>
          }
        />
      </QueryComponent>
    </Modal>
  );
};
