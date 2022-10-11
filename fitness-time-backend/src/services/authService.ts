import LoginDto from "../dtos/loginDto";
import UserDto, { toUserDto } from "../dtos/userDto";
import { User } from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AuthToken } from "../dtos/authToken";

const register = async (user: LoginDto): Promise<UserDto | null> => {
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

const login = async (user: LoginDto): Promise<string | null> => {
  const entity = await User.findOne({ where: { username: user.username } });
  if (!entity) return null;

  const passwordMatch = await bcrypt.compare(
    user.password,
    (entity as any).passwordHash
  );
  if (!passwordMatch) return null;

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) return null;

  const authToken: AuthToken = { userId: (entity as any).id };
  const jsonWebToken = jwt.sign(authToken, jwtSecret, { expiresIn: "12h" });
  return jsonWebToken;
};

export default { register, login };
