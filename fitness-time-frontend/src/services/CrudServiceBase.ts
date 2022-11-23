import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import DtoBase from "../models/dtoBase";
import { useSession } from "next-auth/react";
import { showNotification } from "@mantine/notifications";

export default function CrudServiceBase<R extends DtoBase>(apiPostFix: string) {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/${apiPostFix}`;

  const config = {
    headers: {
      Authorization: `Bearer ${session?.user.jwt}`,
    },
  };

  const invalidateQueries = () => {
    queryClient.invalidateQueries({
      predicate: (query) => (query.queryKey[0] as string).includes(apiPostFix),
    });
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
        onSuccess: () => invalidateQueries(),
        onError: (error: AxiosError, _variables: R) => {
          showNotification({
            color: "red",
            title: "Could not create resource!",
            message: error.message,
          });
        },
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
        onSuccess: () => invalidateQueries(),
        onError: (error: AxiosError, _variables: R) => {
          showNotification({
            color: "red",
            title: "Could not update resource!",
            message: error.message,
          });
        },
      }
    );
  };

  const useDelete = () => {
    return useMutation(
      (id: number | string | undefined) =>
        axios.delete(`${apiUrl}/${id}`, config),
      {
        onSuccess: () => invalidateQueries(),
        onError: (error: AxiosError) => {
          showNotification({
            color: "red",
            title: "Could not delete resource!",
            message: error.message,
          });
        },
      }
    );
  };

  return {
    useGetAll,
    useGetSingle,
    useCreate,
    useUpdate,
    useDelete,
    config,
    invalidateQueries,
  };
}
