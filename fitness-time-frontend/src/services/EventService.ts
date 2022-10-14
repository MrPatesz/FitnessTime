import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import EventDto from "../models/eventDto";
import CrudServiceBase from "./CrudServiceBase";

export default function EventService() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const apiPostFix = "events";
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/${apiPostFix}`;

  // TODO getConfig util function
  const config = {
    headers: {
      Authorization: `Bearer ${session?.user.jwt}`,
    },
  };

  const useParticipate = () => {
    // TODO data: {eventId: id, status: true/false}
    return useMutation(
      ({ status, id }: { status: boolean; id: number | string | undefined }) =>
        axios.post(`${apiUrl}/${id}/participate`, { status }, config),
      {
        onSuccess: () =>
          queryClient.invalidateQueries({
            predicate: (query) =>
              (query.queryKey[0] as string).includes(apiPostFix),
          }),
      }
    );
  };

  const useGetAllOwned = () => {
    return useQuery<EventDto[]>(
      [`${apiPostFix}_owned`],
      () =>
        axios
          .get<EventDto[]>(`${apiUrl}/owned`, config)
          .then((res) => res.data),
      {
        enabled: !!session,
      }
    );
  };

  const crudService = CrudServiceBase<EventDto>(apiPostFix);

  return {
    ...crudService,
    useParticipate,
    useGetAllOwned,
  };
}
