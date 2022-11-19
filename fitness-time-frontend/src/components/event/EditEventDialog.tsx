import { Button, Modal } from "@mantine/core";
import React, { useState } from "react";
import EventDto, { defaultEventDto } from "../../models/eventDto";
import EventService from "../../services/EventService";
import { QueryComponent } from "../QueryComponent";
import { EventForm } from "./EventForm";

export const EditEventDialog: React.FunctionComponent<{
  open: boolean;
  onClose: () => void;
  eventId: number;
}> = ({ open, onClose, eventId }) => {
  const [event, setEvent] = useState<EventDto>(defaultEventDto);

  const eventService = EventService();
  const useUpdate = eventService.useUpdate();
  const eventQuery = eventService.useGetSingle(eventId);

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
            <Button
              disabled={!event.name || !event.location.address}
              onClick={() => useUpdate.mutateAsync(event).then(onClose)}
            >
              Update
            </Button>
          }
        />
      </QueryComponent>
    </Modal>
  );
};
