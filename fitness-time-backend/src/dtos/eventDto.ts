import { Event } from "../models/eventModel";
import { User } from "../models/userModel";
import DtoBase from "./dtoBase";
import UserDto, { toUserDto } from "./userDto";

export default interface EventDto extends DtoBase {
  ownerId: number;
  owner?: UserDto;
  name: string;
  location: string;
  from: Date;
  to: Date;
  recurring: boolean;
  description: string | null;
  limit: number | null;
  price: number | null;
  equipment: string | null;
  participants: UserDto[];
  ownedByCaller: boolean;
}

export const toEventDto = (event: Event, callerId: number): EventDto => {
  return {
    id: event.id,
    ownerId: event.ownerId,
    name: event.name,
    location: event.location,
    from: event.from,
    to: event.to,
    recurring: event.recurring,
    description: event.description,
    limit: event.limit,
    price: event.price,
    equipment: event.equipment,
    owner: event.owner ? toUserDto(event.owner) : undefined,
    participants: event.participants
      ? event.participants.map((p: User) => toUserDto(p))
      : [],
    ownedByCaller: callerId === event.ownerId,
  };
};
