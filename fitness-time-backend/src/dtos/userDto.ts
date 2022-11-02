import { Event } from "../models/eventModel";
import { User } from "../models/userModel";
import DtoBase from "./dtoBase";
import EventDto, { toEventDto } from "./eventDto";

export default interface UserDto extends DtoBase {
  username: string;
  introduction: string | null;
  ownedEvents?: EventDto[];
}

export const toUserDto = (user: User, callerId: number): UserDto => {
  return {
    id: user.id,
    username: user.username,
    introduction: user.introduction,
    ownedEvents:
      user.ownedEvents?.map((e: Event) => toEventDto(e, callerId)) ?? [],
  };
};
