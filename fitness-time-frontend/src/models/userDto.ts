import DtoBase from "./dtoBase";

export default interface UserDto extends DtoBase {
  username: string;
  introduction: string | null;
}
