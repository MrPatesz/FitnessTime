import { Request, Response } from "express";
import EventDto from "../dtos/eventDto";
import eventService from "../services/eventService";

const getAll = async (_req: Request, res: Response) => {
  const events = await eventService.getAll();
  return res.status(200).json(events);
};

const getSingle = async (req: Request, res: Response) => {
  const event = await eventService.getSingle(parseInt(req.params.id ?? ""));
  if (event) {
    return res.status(200).json(event);
  } else {
    return res.status(404).send();
  }
};

const create = async (req: Request, res: Response) => {
  const eventDto = req.body as EventDto;
  const event = await eventService.create(eventDto);
  if (event) {
    return res.status(200).json(event);
  } else {
    return res.status(400).send();
  }
};

const update = async (req: Request, res: Response) => {
  const eventDto = req.body as EventDto;
  const result = await eventService.update(eventDto);
  if (result) {
    return res.status(200).json(result);
  } else {
    return res.status(404).send();
  }
};

const deleteSingle = async (req: Request, res: Response) => {
  const result = await eventService.deleteSingle(parseInt(req.params.id ?? ""));
  if (result) {
    return res.status(200).send();
  } else {
    return res.status(404).send();
  }
};

export default { getAll, getSingle, create, update, deleteSingle };
