import { Request, Response } from "express";
import UserDto from "../dtos/userDto";
import service from "../services/userService";

const getAll = async (_req: Request, res: Response) => {
  const users = await service.getAll();
  return res.status(200).json(users);
};

const getSingle = async (req: Request, res: Response) => {
  const user = await service.getSingle(parseInt(req.params.id ?? ""));
  if (user) {
    return res.status(200).json(user);
  } else {
    return res.status(404).send();
  }
};

const update = async (req: Request, res: Response) => {
  const userDto = req.body as UserDto;
  const result = await service.update(userDto);
  if (result) {
    return res.status(200).json(result);
  } else {
    return res.status(404).send();
  }
};

const deleteSingle = async (req: Request, res: Response) => {
  const result = await service.deleteSingle(parseInt(req.params.id ?? ""));
  if (result) {
    return res.status(200).send();
  } else {
    return res.status(404).send();
  }
};

export default { getAll, getSingle, update, deleteSingle };
