import { User } from "../models/userModel";
import DtoBase from "./dtoBase";

export default interface UserDto extends DtoBase {
  username: string;
  introduction: string | null;
}

export const toUserDto = (user: User): UserDto => {
  return {
    id: user.id,
    username: user.username,
    introduction: user.introduction,
  };
};
