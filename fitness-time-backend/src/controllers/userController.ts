import { Request, Response } from "express";
import UserDto from "../dtos/userDto";
import service from "../services/userService";

const getCallerId = (req: Request): number => (req.user as UserDto).id;
const getPathId = (req: Request): number => parseInt(req.params.id ?? "");
const getUserDto = (req: Request): UserDto => req.body;

const getAll = async (_req: Request, res: Response) => {
  const users = await service.getAll();
  return res.status(200).json(users);
};

const getSingle = async (req: Request, res: Response) => {
  const id = getPathId(req);

  const user = await service.getSingle(id);

  if (user) {
    return res.status(200).json(user);
  } else {
    return res.status(404).send();
  }
};

const update = async (req: Request, res: Response) => {
  const callerId = getCallerId(req);
  const userDto = getUserDto(req);

  const result = await service.update(userDto, callerId);

  if (result) {
    return res.status(200).json(result);
  } else {
    return res.status(404).send();
  }
};

const deleteSingle = async (req: Request, res: Response) => {
  const callerId = getCallerId(req);
  const id = getPathId(req);

  const result = await service.deleteSingle(id, callerId);

  if (result) {
    return res.status(200).send();
  } else {
    return res.status(404).send();
  }
};

export default { getAll, getSingle, update, deleteSingle };
