import { Model } from "sequelize";
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
  // participants: UserDto[];
}

export const toEventDto = (eventModel: Model<any, any>): EventDto => {
  const event = eventModel as unknown as EventDto;
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
    owner: event.owner
      ? toUserDto(event.owner as unknown as Model<any, any>)
      : undefined,
  };
};
