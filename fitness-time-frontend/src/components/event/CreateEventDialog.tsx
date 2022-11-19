import { Button, Modal } from "@mantine/core";
import React, { useEffect, useState } from "react";
import EventDto, { defaultEventDto } from "../../models/eventDto";
import EventService from "../../services/EventService";
import { EventForm } from "./EventForm";

export const CreateEventDialog: React.FunctionComponent<{
  open: boolean;
  onClose: () => void;
  defaultStart?: Date;
  defaultEnd?: Date;
}> = ({ open, onClose, defaultStart, defaultEnd }) => {
  const [event, setEvent] = useState<EventDto>(defaultEventDto);

  const eventService = EventService();
  const useCreate = eventService.useCreate();

  useEffect(() => {
    if (defaultStart && defaultEnd) {
      setEvent({ ...event, from: defaultStart, to: defaultEnd });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultStart, defaultEnd]);

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
            disabled={!event.name || !event.location.address}
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
