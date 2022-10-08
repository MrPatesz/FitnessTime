import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import DtoBase from "../models/dtoBase";

export default function CrudServiceBase<R extends DtoBase>(apiPostFix: string) {
  const queryClient = useQueryClient();
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/${apiPostFix}`;

  const useGetAll = () => {
    return useQuery<R[]>([apiPostFix], () =>
      axios.get<R[]>(apiUrl).then((res) => res.data)
    );
  };

  const useGetSingle = (id: number | string | undefined) => {
    return useQuery<R>(
      [apiPostFix, id],
      () => axios.get<R>(`${apiUrl}/${id}`).then((res) => res.data),
      {
        enabled: !!id,
      }
    );
  };

  const useCreate = () => {
    return useMutation(
      (newResource: R) =>
        axios.post<R>(apiUrl, newResource).then((res) => res.data),
      {
        onSuccess: () => queryClient.invalidateQueries([apiPostFix]),
      }
    );
  };

  const useUpdate = () => {
    return useMutation(
      (newResource: R) =>
        axios
          .put<R>(`${apiUrl}/${newResource.id}`, newResource)
          .then((res) => res.data),
      {
        onSuccess: () => queryClient.invalidateQueries([apiPostFix]),
      }
    );
  };

  const useDelete = () => {
    return useMutation(
      (id: number | string | undefined) => axios.delete(`${apiUrl}/${id}`),
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
