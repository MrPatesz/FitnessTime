import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import DtoBase from "../models/dtoBase";
import { useSession } from "next-auth/react";

export default function CrudServiceBase<R extends DtoBase>(apiPostFix: string) {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/${apiPostFix}`;

  const config = {
    headers: {
      Authorization: `Bearer ${session?.user.jwt}`,
    },
  };

  const useGetAll = () => {
    return useQuery<R[]>(
      [apiPostFix],
      () => axios.get<R[]>(apiUrl, config).then((res) => res.data),
      {
        enabled: !!session,
      }
    );
  };

  const useGetSingle = (id: number | string | undefined) => {
    return useQuery<R>(
      [apiPostFix, id],
      () => axios.get<R>(`${apiUrl}/${id}`, config).then((res) => res.data),
      {
        enabled: !!id && !!session,
      }
    );
  };

  const useCreate = () => {
    return useMutation(
      (newResource: R) =>
        axios.post<R>(apiUrl, newResource, config).then((res) => res.data),
      {
        onSuccess: () => queryClient.invalidateQueries([apiPostFix]),
      }
    );
  };

  const useUpdate = () => {
    return useMutation(
      (newResource: R) =>
        axios
          .put<R>(`${apiUrl}/${newResource.id}`, newResource, config)
          .then((res) => res.data),
      {
        onSuccess: () => queryClient.invalidateQueries([apiPostFix]),
      }
    );
  };

  const useDelete = () => {
    return useMutation(
      (id: number | string | undefined) =>
        axios.delete(`${apiUrl}/${id}`, config),
      {
        onSuccess: () => queryClient.invalidateQueries([apiPostFix]),
      }
    );
  };

  return {
    useGetAll,
    useGetSingle,
    useCreate,
    useUpdate,
    useDelete,
  };
}
