import { showNotification } from "@mantine/notifications";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import EventDto from "../models/eventDto";
import CrudServiceBase from "./CrudServiceBase";

interface UpdateParticipationObject {
  status: boolean;
  id: number | string | undefined;
}

export default function EventService() {
  const { data: session } = useSession();
  const apiPostFix = "events";
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/${apiPostFix}`;

  const crudService = CrudServiceBase<EventDto>(apiPostFix);

  const useParticipate = () => {
    // TODO data: {eventId: id, status: true/false}
    return useMutation(
      ({ status, id }: UpdateParticipationObject) =>
        axios.post(
          `${apiUrl}/${id}/participate`,
          { status },
          crudService.config
        ),
      {
        onSuccess: (_data, _variables) => {
          crudService.invalidateQueries();
          showNotification({
            color: "green",
            title: "Updated participation!",
            message: "Your participation status has changed.",
          });
        },
        onError: (error: AxiosError, _variables: UpdateParticipationObject) => {
          showNotification({
            color: "red",
            title: "Could not update participation!",
            message: error.message,
          });
        },
      }
    );
  };

  const useGetAllOwned = () => {
    return useQuery<EventDto[]>(
      [`${apiPostFix}_owned`],
      () =>
        axios
          .get<EventDto[]>(`${apiUrl}/owned`, crudService.config)
          .then((res) => res.data),
      {
        enabled: !!session,
      }
    );
  };

  const useGetFeed = () => {
    return useQuery<EventDto[]>(
      [`${apiPostFix}_feed`],
      () =>
        axios
          .get<EventDto[]>(`${apiUrl}/feed`, crudService.config)
          .then((res) => res.data),
      {
        enabled: !!session,
      }
    );
  };

  const useGetCalendar = () => {
    return useQuery<EventDto[]>(
      [`${apiPostFix}_calendar`],
      () =>
        axios
          .get<EventDto[]>(`${apiUrl}/calendar`, crudService.config)
          .then((res) => res.data),
      {
        enabled: !!session,
      }
    );
  };

  return {
    // not exposing: config, invalidateQueries
    useGetAll: crudService.useGetAll,
    useGetSingle: crudService.useGetSingle,
    useCreate: crudService.useCreate,
    useUpdate: crudService.useUpdate,
    useDelete: crudService.useDelete,
    useParticipate,
    useGetAllOwned,
    useGetFeed,
    useGetCalendar,
  };
}
