import { Group } from "@mantine/core";
import { DatePicker, TimeInput } from "@mantine/dates";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";

const calculateDateTime = (date: Date, time: Date): Date => {
  const hour = dayjs(time).hour();
  const minute = dayjs(time).minute();
  const dateAndTime = dayjs(date).hour(hour).minute(minute);

  return dateAndTime.toDate();
};

export const DateTimePicker: React.FunctionComponent<{
  from: Date;
  to: Date;
  setFrom: (newDate: Date) => void;
  setTo: (newDate: Date) => void;
}> = ({ from, to, setFrom, setTo }) => {
  const [date, setDate] = useState<Date>(from);
  const [fromTime, setFromTime] = useState<Date>(from);
  const [toTime, setToTime] = useState<Date>(to);

  useEffect(() => {
    setFrom(calculateDateTime(date, fromTime));
    setTo(calculateDateTime(date, toTime));
  }, [date, fromTime, setFrom, setTo, toTime]);

  return (
    <Group spacing="xs">
      <DatePicker
        label="On"
        value={date}
        onChange={(event) => {
          if (event) {
            setDate(event);
          }
        }}
        clearable={false}
        minDate={new Date()}
      />
      <TimeInput
        label="From"
        value={fromTime}
        onChange={(event) => setFromTime(event)}
      />
      <TimeInput
        label="To"
        value={toTime}
        onChange={(event) => setToTime(event)}
      />
    </Group>
  );
};
