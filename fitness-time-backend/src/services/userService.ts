import LoginDto from "../dtos/loginDto";
import UserDto, { toUserDto } from "../dtos/userDto";
import { User } from "../models/userModel";
import bcrypt from "bcrypt";

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

const create = async (user: LoginDto): Promise<UserDto | null> => {
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(user.password, saltRounds);

  try {
    const entity = await User.create({
      username: user.username,
      passwordHash,
    });
    if (!entity) return null;
    else return toUserDto(entity);
  } catch (error) {
    return null;
  }
};

const update = async (userDto: UserDto): Promise<UserDto | null> => {
  const entity = await User.findByPk(userDto.id);
  if (!entity) return null;

  try {
    entity.update({ ...userDto });
    return toUserDto(entity);
  } catch (error) {
    return null;
  }
};

const deleteSingle = async (id: number): Promise<boolean> => {
  const entity = await User.findByPk(id);
  const result = await entity?.destroy();
  return result !== undefined;
};

export default { getAll, getSingle, create, update, deleteSingle };
