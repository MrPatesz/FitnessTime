import UserDto from "../models/userDto";
import CrudServiceBase from "./CrudServiceBase";

export default function UserService() {
  const crudService = CrudServiceBase<UserDto>("users");

  return {
    useGetAll: crudService.useGetAll,
    useGetSingle: crudService.useGetSingle,
    useUpdate: crudService.useUpdate,
    useDelete: crudService.useDelete,
  };
}
