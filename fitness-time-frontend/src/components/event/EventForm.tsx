import {
  Checkbox,
  NumberInput,
  Stack,
  Textarea,
  TextInput,
} from "@mantine/core";
import React from "react";
import EventDto from "../../models/eventDto";
import { DateTimePicker } from "../DateTimePicker";

export const EventForm: React.FunctionComponent<{
  event: EventDto;
  setEvent: (newState: EventDto) => void;
  submitButton: JSX.Element;
}> = ({ event, setEvent, submitButton }) => {
  // TODO form: validation
  return (
    <Stack>
      <TextInput
        label="Name"
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
      <TextInput
        label="Location"
        placeholder="Where will it take place?"
        value={event.location}
        onChange={(e) =>
          setEvent({ ...event, location: e.currentTarget.value })
        }
      />
      <DateTimePicker
        from={event.from}
        to={event.to}
        setFrom={(newValue) => setEvent({ ...event, from: newValue })}
        setTo={(newValue) => setEvent({ ...event, to: newValue })}
      />
      <NumberInput
        label="Limit"
        placeholder="Is there a maximum number of participants?"
        value={event.limit ?? undefined}
        onChange={(newValue) => setEvent({ ...event, limit: newValue ?? null })}
      />
      <NumberInput
        label="Price"
        placeholder="Do participants need to pay for it?"
        value={event.price ?? undefined}
        onChange={(newValue) => setEvent({ ...event, price: newValue ?? null })}
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
      <Checkbox
        label="Is it recurring every week?"
        checked={event.recurring}
        onChange={(e) =>
          setEvent({ ...event, recurring: e.currentTarget.checked })
        }
      />
      {submitButton}
    </Stack>
  );
};
