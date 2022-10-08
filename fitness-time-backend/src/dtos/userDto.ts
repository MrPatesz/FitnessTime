import { Model } from "sequelize";
import DtoBase from "./dtoBase";

export default interface UserDto extends DtoBase {
  username: string;
  introduction: string | null;
}

export const toUserDto = (userModel: Model<any, any>): UserDto => {
  const user = userModel as unknown as UserDto;
  return {
    id: user.id,
    username: user.username,
    introduction: user.introduction,
  };
};
