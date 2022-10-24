import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import UserDto from "../models/userDto";
import CrudServiceBase from "./CrudServiceBase";

export default function UserService() {
  const { data: session } = useSession();
  const apiPostFix = "users";
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/${apiPostFix}`;

  const crudService = CrudServiceBase<UserDto>(apiPostFix);

  const config = {
    headers: {
      Authorization: `Bearer ${session?.user.jwt}`,
    },
  };

  const useGetProfile = () => {
    return useQuery<UserDto>(
      ["profile" /*TODO [apiPostFix, session?.user.userId]*/],
      () =>
        axios.get<UserDto>(`${apiUrl}/profile`, config).then((res) => res.data),
      {
        enabled: !!session,
      }
    );
  };

  return {
    useGetAll: crudService.useGetAll,
    useGetSingle: crudService.useGetSingle,
    useUpdate: crudService.useUpdate,
    useDelete: crudService.useDelete,
    useGetProfile,
  };
}
