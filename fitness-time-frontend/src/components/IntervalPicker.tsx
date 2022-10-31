import { Group } from "@mantine/core";
import { DatePicker, TimeInput } from "@mantine/dates";
import dayjs from "dayjs";
import React, { useEffect } from "react";

const calculateDateTime = (date: Date, time: Date): Date => {
  const hour = dayjs(time).hour();
  const minute = dayjs(time).minute();
  const dateAndTime = dayjs(date)
    .hour(hour)
    .minute(minute)
    .second(0)
    .millisecond(0);

  return dateAndTime.toDate();
};

export const IntervalPicker: React.FunctionComponent<{
  start: Date;
  end: Date;
  onChange: (newStart: Date, newEnd: Date) => void;
}> = ({ start, end, onChange }) => {
  useEffect(() => {
    onChange(calculateDateTime(start, start), calculateDateTime(end, end));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Group spacing="xs">
      <DatePicker
        label="On"
        value={start}
        onChange={(newDate) => {
          if (newDate) {
            onChange(
              calculateDateTime(newDate, start),
              calculateDateTime(newDate, end)
            );
          }
        }}
        clearable={false}
        minDate={new Date()}
      />
      <TimeInput
        label="From"
        value={start}
        onChange={(event) => onChange(calculateDateTime(start, event), end)}
      />
      <TimeInput
        label="To"
        value={end}
        onChange={(event) => onChange(start, calculateDateTime(end, event))}
      />
    </Group>
  );
};
