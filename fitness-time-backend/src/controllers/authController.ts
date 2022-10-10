import { Request, Response } from "express";
import LoginDto from "../dtos/loginDto";
import service from "../services/authService";

const register = async (req: Request, res: Response) => {
  const loginDto = req.body as LoginDto;
  const user = await service.register(loginDto);
  if (user) {
    return res.status(200).json(user);
  } else {
    return res.status(400).send();
  }
};

const login = async (req: Request, res: Response) => {
  const loginDto = req.body as LoginDto;

  const jwt = await service.login(loginDto);
  if (jwt) {
    return res.status(200).json(jwt);
  } else {
    return res.status(400).send();
  }
};

export default { register, login };
