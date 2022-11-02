import UserDto, { toUserDto } from "../dtos/userDto";
import { Event } from "../models/eventModel";
import { User } from "../models/userModel";

const getAll = async (callerId: number): Promise<UserDto[]> => {
  const entities = await User.findAll({
    order: [["username", "ASC"]],
  });
  return entities.map((e) => toUserDto(e, callerId));
};

const getSingle = async (
  id: number,
  callerId: number
): Promise<UserDto | null> => {
  const entity = await User.findByPk(id, {
    include: [{ model: Event, as: "ownedEvents" }],
  });
  return entity ? toUserDto(entity, callerId) : null;
};

const update = async (
  userDto: UserDto,
  callerId: number
): Promise<UserDto | null> => {
  if (callerId !== userDto.id) return null;

  const entity = await User.findByPk(userDto.id);
  if (!entity) return null;

  try {
    entity.update({ ...userDto });
    return toUserDto(entity, callerId);
  } catch (error) {
    return null;
  }
};

const deleteSingle = async (id: number, callerId: number): Promise<boolean> => {
  if (callerId !== id) return false;

  const entity = await User.findByPk(id);

  const result = await entity?.destroy();
  return result !== undefined;
};

export default { getAll, getSingle, update, deleteSingle };
