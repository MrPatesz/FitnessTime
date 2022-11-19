import { NumberInput, Stack, Textarea, TextInput } from "@mantine/core";
import React from "react";
import EventDto from "../../models/eventDto";
import { IntervalPicker } from "../IntervalPicker";
import { LocationPicker } from "../LocationPicker";

export const EventForm: React.FunctionComponent<{
  event: EventDto;
  setEvent: (newState: EventDto) => void;
  submitButton: JSX.Element;
}> = ({ event, setEvent, submitButton }) => {
  // TODO form: validation
  return (
    <Stack>
      <TextInput
        withAsterisk
        label="Name"
        placeholder="What is the event called?"
        value={event.name}
        onChange={(e) => setEvent({ ...event, name: e.currentTarget.value })}
      />
      <Textarea
        label="Description"
        placeholder="What are the plans?"
        value={event.description ?? "" /*TODO not nullable?*/}
        onChange={(e) =>
          setEvent({ ...event, description: e.currentTarget.value })
        }
      />
      <LocationPicker
        defaultLocation={event.location.address}
        setLocation={(newLocation) =>
          setEvent({
            ...event,
            location: newLocation,
          })
        }
      />
      <IntervalPicker
        start={new Date(event.from)}
        end={new Date(event.to)}
        onChange={(newStart, newEnd) =>
          setEvent({ ...event, from: newStart, to: newEnd })
        }
      />
      <NumberInput
        label="Limit"
        placeholder="Is there a maximum number of participants?"
        value={event.limit ?? undefined}
        onChange={(newValue) => setEvent({ ...event, limit: newValue ?? null })}
        min={1}
      />
      <NumberInput
        label="Price"
        placeholder="Do participants need to pay for it?"
        value={event.price ?? undefined}
        onChange={(newValue) => setEvent({ ...event, price: newValue ?? null })}
        min={1}
        // TODO formatter
      />
      <TextInput
        label="Equipment"
        placeholder="Is any equipment needed?"
        value={event.equipment ?? ""}
        onChange={(e) =>
          setEvent({ ...event, equipment: e.currentTarget.value })
        }
      />
      {/* <Checkbox
        label="Is it recurring every week?"
        checked={event.recurring}
        onChange={(e) =>
          setEvent({ ...event, recurring: e.currentTarget.checked })
        }
      /> */}
      {submitButton}
    </Stack>
  );
};
