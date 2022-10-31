import { Button, Modal } from "@mantine/core";
import React, { useState } from "react";
import EventDto, { defaultEventDto } from "../../models/eventDto";
import EventService from "../../services/EventService";
import { EventForm } from "./EventForm";

export const CreateEventDialog: React.FunctionComponent<{
  open: boolean;
  onClose: () => void;
}> = ({ open, onClose }) => {
  const [event, setEvent] = useState<EventDto>(defaultEventDto);

  const eventService = EventService();
  const useCreate = eventService.useCreate();

  return (
    <Modal
      opened={open}
      onClose={onClose}
      title="Create Event"
      closeOnClickOutside={false}
    >
      <EventForm
        event={event}
        setEvent={setEvent}
        submitButton={
          <Button
            onClick={() =>
              useCreate.mutateAsync(event).then(() => {
                onClose();
                setEvent(defaultEventDto);
              })
            }
          >
            Create
          </Button>
        }
      />
    </Modal>
  );
};
