import { Request, Response } from "express";
import EventDto from "../dtos/eventDto";
import UserDto from "../dtos/userDto";
import eventService from "../services/eventService";

const getCallerId = (req: Request): number => (req.user as UserDto).id;
const getPathId = (req: Request): number => parseInt(req.params.id ?? "");
const getEventDto = (req: Request): EventDto => req.body;

const getAll = async (req: Request, res: Response) => {
  const callerId = getCallerId(req);
  const events = await eventService.getAll(callerId);
  return res.status(200).json(events);
};

const getAllOwned = async (req: Request, res: Response) => {
  const callerId = getCallerId(req);
  const events = await eventService.getAllOwned(callerId, callerId);
  return res.status(200).json(events);
};

const getFeed = async (req: Request, res: Response) => {
  const callerId = getCallerId(req);
  const events = await eventService.getFeed(callerId);
  return res.status(200).json(events);
};

const getSingle = async (req: Request, res: Response) => {
  const callerId = getCallerId(req);
  const id = getPathId(req);

  const event = await eventService.getSingle(id, callerId);

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

const participate = async (req: Request, res: Response) => {
  const callerId = getCallerId(req);
  const id = getPathId(req);
  const { status } = req.body as { status: boolean };

  let result = false;
  if (status) {
    result = await eventService.participate(id, callerId);
  } else {
    result = await eventService.removeParticipation(id, callerId);
  }

  if (result) {
    return res.status(200).send();
  } else {
    return res.status(400).send();
  }
};

export default {
  getAll,
  getSingle,
  create,
  update,
  deleteSingle,
  getAllOwned,
  participate,
  getFeed,
};
