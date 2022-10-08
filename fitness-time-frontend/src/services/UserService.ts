import { useMutation, useQueryClient } from "@tanstack/react-query";
import UserDto from "../models/userDto";
import CrudServiceBase from "./CrudServiceBase";
import axios from "axios";
import LoginDto from "../models/loginDto";

export default function UserService() {
  const apiPostFix = "users";
  const crudService = CrudServiceBase<UserDto>(apiPostFix);

  const queryClient = useQueryClient();
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/${apiPostFix}`;

  const useCreate = () => {
    return useMutation(
      (newResource: LoginDto) =>
        axios.post<UserDto>(apiUrl, newResource).then((res) => res.data),
      {
        onSuccess: () => queryClient.invalidateQueries([apiPostFix]),
      }
    );
  };

  return {
    ...crudService,
    useCreate,
  };
}
