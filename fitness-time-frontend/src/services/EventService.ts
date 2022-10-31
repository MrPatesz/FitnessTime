import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import EventDto from "../models/eventDto";
import CrudServiceBase from "./CrudServiceBase";

export default function EventService() {
  const { data: session } = useSession();
  const apiPostFix = "events";
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/${apiPostFix}`;

  const crudService = CrudServiceBase<EventDto>(apiPostFix);

  const useParticipate = () => {
    // TODO data: {eventId: id, status: true/false}
    return useMutation(
      ({ status, id }: { status: boolean; id: number | string | undefined }) =>
        axios.post(
          `${apiUrl}/${id}/participate`,
          { status },
          crudService.config
        ),
      { onSuccess: () => crudService.invalidateQueries() }
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
  };
}
