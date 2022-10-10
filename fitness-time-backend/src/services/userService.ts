import UserDto, { toUserDto } from "../dtos/userDto";
import { User } from "../models/userModel";

const getAll = async (): Promise<UserDto[]> => {
  const entities = await User.findAll({
    order: [["username", "ASC"]],
  });
  return entities.map((e) => toUserDto(e));
};

const getSingle = async (id: number): Promise<UserDto | null> => {
  const entity = await User.findByPk(id);
  if (!entity) return null;
  else return toUserDto(entity);
};

const update = async (userDto: UserDto): Promise<UserDto | null> => {
  const entity = await User.findByPk(userDto.id);
  if (!entity) return null;

  // TODO check if caller is the updated user or not!

  try {
    entity.update({ ...userDto });
    return toUserDto(entity);
  } catch (error) {
    return null;
  }
};

const deleteSingle = async (id: number): Promise<boolean> => {
  // TODO check if caller owns the event or not!

  const entity = await User.findByPk(id);
  const result = await entity?.destroy();
  return result !== undefined;
};

export default { getAll, getSingle, update, deleteSingle };
