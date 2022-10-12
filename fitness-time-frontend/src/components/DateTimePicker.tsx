import { Group } from "@mantine/core";
import { DatePicker, TimeInput } from "@mantine/dates";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";

export const DateTimePicker: React.FunctionComponent<{
  // TODO default values for from and to
  setFrom: (newDate: Date) => void;
  setTo: (newDate: Date) => void;
}> = ({ setFrom, setTo }) => {
  const now = new Date();
  const nowPlusOneHour = dayjs(now)
    .hour(dayjs(now).hour() + 1)
    .toDate();

  const [date, setDate] = useState<Date>(now);
  const [fromTime, setFromTime] = useState<Date>(now);
  const [toTime, setToTime] = useState<Date>(nowPlusOneHour);

  useEffect(() => {
    setFrom(calculateDateTime(date, fromTime));
    setTo(calculateDateTime(date, toTime));
  }, [date, fromTime, setFrom, setTo, toTime]);

  const calculateDateTime = (date: Date, time: Date): Date => {
    const hour = dayjs(time).hour();
    const minute = dayjs(time).minute();
    const dateAndTime = dayjs(date).hour(hour).minute(minute);

    return dateAndTime.toDate();
  };

  return (
    <Group spacing="xs">
      <DatePicker
        label="On"
        value={date}
        onChange={(event) => setDate(event ?? now)}
        clearable={false}
        minDate={now}
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
