import DtoBase from "./dtoBase";
import EventDto from "./eventDto";

export default interface UserDto extends DtoBase {
  username: string;
  introduction: string | null;
  ownedEvents?: EventDto[];
}
