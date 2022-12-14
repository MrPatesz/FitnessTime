import DtoBase from "./dtoBase";
import { LocationDto } from "./locationDto";
import UserDto from "./userDto";

export default interface EventDto extends DtoBase {
  ownerId: number;
  owner?: UserDto;
  name: string;
  location: LocationDto;
  from: Date;
  to: Date;
  // recurring: boolean;
  description: string | null;
  limit: number | null;
  price: number | null;
  equipment: string | null;
  participants: UserDto[];
  ownedByCaller: boolean;
}

export const defaultEventDto: EventDto = {
  id: 0,
  ownerId: 0,
  owner: undefined,
  name: "",
  location: {
    longitude: 0,
    latitude: 0,
    address: "",
  },
  from: new Date(),
  to: new Date(),
  // recurring: false,
  description: null,
  limit: null,
  price: null,
  equipment: null,
  participants: [],
  ownedByCaller: true,
};
