import { QueryComponent } from "../components/QueryComponent";
import EventService from "../services/EventService";
import {
  DayPilotCalendar,
  DayPilotNavigator,
} from "@daypilot/daypilot-lite-react";
import { useState } from "react";
import { useMantineTheme } from "@mantine/core";
import dayjs from "dayjs";
import { useRouter } from "next/router";

export default function CalendarPage() {
  const [startDate, setStartDate] = useState(new Date());

  const eventService = EventService();
  const eventsQuery = eventService.useGetAll(); // TODO getCalendarEvents
  const theme = useMantineTheme();
  const router = useRouter();

  return (
    <>
      <QueryComponent resourceName="Calendar" query={eventsQuery}>
        <DayPilotCalendar
          viewType="Week"
          timeFormat="Clock24Hours"
          headerDateFormat="MMMM d"
          eventMoveHandling="Disabled"
          eventResizeHandling="Disabled"
          timeRangeSelectedHandling="Disabled"
          durationBarVisible={false}
          businessBeginsHour={8}
          businessEndsHour={17}
          startDate={startDate}
          onEventClick={(e: any) => router.replace(`events/${e.e.data.id}`)}
          events={eventsQuery.data?.map((event) => {
            const offsetInHours =
              (new Date(event.from).getTimezoneOffset() / 60) * -1;
            const start = dayjs(event.from)
              .hour(dayjs(event.from).hour() + offsetInHours)
              .toDate();
            const end = dayjs(event.to)
              .hour(dayjs(event.to).hour() + offsetInHours)
              .toDate();
            return {
              id: event.id,
              text: event.name,
              start,
              end,
              backColor: event.ownedByCaller
                ? theme.colors.violet[8]
                : theme.colors.blue[8],
              fontColor: "white",
            };
          })}
        />
      </QueryComponent>
      <DayPilotNavigator
        selectMode="week"
        onTimeRangeSelected={(args: { day: Date }) => setStartDate(args.day)}
      />
    </>
  );
}
