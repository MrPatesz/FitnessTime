import { Request, Response } from "express";
import EventDto from "../dtos/eventDto";
import UserDto from "../dtos/userDto";
import eventService from "../services/eventService";

const getCallerId = (req: Request): number => (req.user as UserDto).id;
const getPathId = (req: Request): number => parseInt(req.params.id ?? "");
const getEventDto = (req: Request): EventDto => req.body;

const getAll = async (_req: Request, res: Response) => {
  const events = await eventService.getAll();
  return res.status(200).json(events);
};

const getAllOwned = async (req: Request, res: Response) => {
  const callerId = getCallerId(req);
  const events = await eventService.getAllOwned(callerId);
  return res.status(200).json(events);
};

const getSingle = async (req: Request, res: Response) => {
  const id = getPathId(req);

  const event = await eventService.getSingle(id);

  if (event) {
    return res.status(200).json(event);
  } else {
    return res.status(404).send();
  }
};

const create = async (req: Request, res: Response) => {
  const callerId = getCallerId(req);
  const eventDto = getEventDto(req);

  const event = await eventService.create(eventDto, callerId);

  if (event) {
    return res.status(200).json(event);
  } else {
    return res.status(400).send();
  }
};

const update = async (req: Request, res: Response) => {
  const callerId = getCallerId(req);
  const eventDto = getEventDto(req);

  const result = await eventService.update(eventDto, callerId);

  if (result) {
    return res.status(200).json(result);
  } else {
    return res.status(404).send();
  }
};

const deleteSingle = async (req: Request, res: Response) => {
  const callerId = getCallerId(req);
  const id = getPathId(req);

  const result = await eventService.deleteSingle(id, callerId);

  if (result) {
    return res.status(200).send();
  } else {
    return res.status(404).send();
  }
};

export default { getAll, getAllOwned, getSingle, create, update, deleteSingle };
