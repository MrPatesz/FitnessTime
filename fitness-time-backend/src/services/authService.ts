import LoginDto from "../dtos/loginDto";
import UserDto, { toUserDto } from "../dtos/userDto";
import { User } from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AuthToken } from "../dtos/authToken";
import { AuthDto } from "../dtos/authDto";

const register = async (user: LoginDto): Promise<UserDto | null> => {
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(user.password, saltRounds);

  try {
    const entity = await User.create({
      username: user.username,
      passwordHash,
    });
    return entity ? toUserDto(entity, -1) : null;
  } catch (error) {
    return null;
  }
};

const login = async (user: LoginDto): Promise<AuthDto | null> => {
  const entity = await User.findOne({ where: { username: user.username } });
  if (!entity) return null;

  const passwordMatch = await bcrypt.compare(
    user.password,
    (entity as any).passwordHash
  );
  if (!passwordMatch) return null;

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) return null;

  const userId = (entity as any).id;
  const authToken: AuthToken = { userId };
  const jsonWebToken = jwt.sign(authToken, jwtSecret, { expiresIn: "12h" });

  return { userId, jwt: jsonWebToken, username: user.username };
};

export default { register, login };
