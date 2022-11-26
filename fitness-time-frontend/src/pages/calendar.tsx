import { QueryComponent } from "../components/QueryComponent";
import EventService from "../services/EventService";
import { useState } from "react";
import { Affix, useMantineTheme } from "@mantine/core";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { CreateEventDialog } from "../components/event/CreateEventDialog";
import dynamic from "next/dynamic";
import { showNotification } from "@mantine/notifications";

const DayPilotNavigator: any = dynamic(
  () =>
    import("@daypilot/daypilot-lite-react").then(
      (mod) => mod.DayPilotNavigator
    ),
  { ssr: false }
);
const DayPilotCalendar: any = dynamic(
  () =>
    import("@daypilot/daypilot-lite-react").then((mod) => mod.DayPilotCalendar),
  { ssr: false }
);

export default function CalendarPage() {
  const [startDate, setStartDate] = useState(new Date());
  const [openCreate, setOpenCreate] = useState(false);
  const [defaultStart, setDefaultStart] = useState(new Date());
  const [defaultEnd, setDefaultEnd] = useState(new Date());

  const eventService = EventService();
  const eventsQuery = eventService.useGetCalendar();
  const updateEvent = eventService.useUpdate();
  const theme = useMantineTheme();
  const router = useRouter();

  return (
    <>
      <QueryComponent resourceName="Calendar" query={eventsQuery}>
        <DayPilotCalendar
          theme={theme.colorScheme === "dark" ? "dark" : undefined}
          viewType="Week"
          timeFormat="Clock24Hours"
          headerDateFormat="MMMM d"
          heightSpec="Full"
          eventMoveHandling="JavaScript"
          eventResizeHandling="JavaScript"
          onTimeRangeSelected={(event: {
            start: { value: string };
            end: { value: string };
          }) => {
            setDefaultStart(new Date(event.start.value));
            setDefaultEnd(new Date(event.end.value));
            setOpenCreate(true);
          }}
          onEventResize={(event: {
            e: any;
            newStart: { value: string };
            newEnd: { value: string };
          }) => {
            if (event.e.data.resource.ownedByCaller) {
              updateEvent.mutate({
                ...event.e.data.resource,
                from: new Date(event.newStart.value),
                to: new Date(event.newEnd.value),
              });
            } else {
              showNotification({
                color: "red",
                title: "Could not update event!",
                message: "You do not own this event!",
              });
            }
          }}
          onEventMove={(event: {
            e: any;
            newStart: { value: string };
            newEnd: { value: string };
            newResource: any;
            external: boolean;
            ctrl: boolean;
            shift: boolean;
          }) => {
            if (event.e.data.resource.ownedByCaller) {
              updateEvent.mutate({
                ...event.e.data.resource,
                from: new Date(event.newStart.value),
                to: new Date(event.newEnd.value),
              });
            } else {
              showNotification({
                color: "red",
                title: "Could not update event!",
                message: "You do not own this event!",
              });
            }
          }}
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
              resource: event,
            };
          })}
        />
      </QueryComponent>
      <Affix position={{ bottom: 0, left: -1 }}>
        <DayPilotNavigator
          theme={theme.colorScheme === "dark" ? "dark_navigator" : undefined}
          selectMode="week"
          onTimeRangeSelected={(args: { day: Date }) => setStartDate(args.day)}
        />
      </Affix>
      <CreateEventDialog
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        defaultStart={defaultStart}
        defaultEnd={defaultEnd}
      />
    </>
  );
}
