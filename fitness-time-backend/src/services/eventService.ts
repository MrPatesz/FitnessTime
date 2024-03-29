import { Event } from "../models/eventModel";
import EventDto, { toEventDto } from "../dtos/eventDto";
import { User } from "../models/userModel";
import { Op } from "sequelize";

const getAll = async (callerId: number): Promise<EventDto[]> => {
  const entities = await Event.findAll({
    include: [{ model: User, as: "owner" }],
    order: [["name", "ASC"]],
  });
  return entities.map((e) => toEventDto(e, callerId));
};

const getAllOwned = async (
  ownerId: number,
  callerId: number
): Promise<EventDto[]> => {
  const entities = await Event.findAll({
    where: { ownerId },
    include: [{ model: User, as: "owner" }],
    order: [["name", "ASC"]],
  });
  return entities.map((e) => toEventDto(e, callerId));
};

const getFeed = async (callerId: number): Promise<EventDto[]> => {
  const entities = await Event.findAll({
    where: { ownerId: { [Op.ne]: callerId } },
    include: [{ model: User, as: "owner" }],
    order: [["from", "DESC"]],
  });
  return entities.map((e) => toEventDto(e, callerId));
};

const getCalendar = async (callerId: number): Promise<EventDto[]> => {
  const callerUser = await User.findByPk(callerId, {
    include: [
      { model: Event, as: "ownedEvents" },
      { model: Event, as: "participatedEvents" },
    ],
  });

  return [
    ...(callerUser?.ownedEvents ?? []),
    ...(callerUser?.participatedEvents ?? []),
  ].map((e) => toEventDto(e, callerId));
};

const getSingle = async (
  id: number,
  callerId: number
): Promise<EventDto | null> => {
  const entity = await Event.findByPk(id, {
    include: [
      { model: User, as: "owner" },
      { model: User, as: "participants" },
    ],
  });
  if (!entity) return null;
  else return toEventDto(entity, callerId);
};

const create = async (
  eventDto: EventDto,
  callerId: number
): Promise<EventDto | null> => {
  if (eventDto.from > eventDto.to) return null;

  try {
    const event = await Event.create({
      ...eventDto,
      latitude: eventDto.location.latitude,
      longitude: eventDto.location.longitude,
      address: eventDto.location.address,
      ownerId: callerId,
      id: undefined,
      location: undefined,
    });
    return toEventDto(event, callerId);
  } catch (error) {
    return null;
  }
};

const update = async (
  eventDto: EventDto,
  callerId: number
): Promise<EventDto | null> => {
  if (eventDto.from > eventDto.to) return null;
  if (callerId !== eventDto.ownerId) return null;

  const entity = await Event.findByPk(eventDto.id);
  if (!entity) return null;

  entity.update({
    ...eventDto,
    latitude: eventDto.location.latitude,
    longitude: eventDto.location.longitude,
    address: eventDto.location.address,
    location: undefined,
  });
  return toEventDto(entity, callerId);
};

const deleteSingle = async (id: number, callerId: number): Promise<boolean> => {
  const entity = await Event.findByPk(id);
  if (!entity || entity.ownerId !== callerId) return false;

  const result = await entity.destroy();
  return result !== undefined;
};

const participate = async (id: number, callerId: number): Promise<boolean> => {
  const entity = await Event.findByPk(id);
  const user = await User.findByPk(callerId);
  if (!entity || !user || entity.ownerId === callerId) return false;

  const result = await (entity as any).addParticipant(user);

  return !!result;
};

const removeParticipation = async (
  id: number,
  callerId: number
): Promise<boolean> => {
  const entity = await Event.findByPk(id);
  const user = await User.findByPk(callerId);
  if (!entity || !user || entity.ownerId === callerId) return false;

  const result = await (entity as any).removeParticipant(user);

  return !!result;
};

export default {
  getAll,
  getSingle,
  create,
  update,
  deleteSingle,
  getAllOwned,
  participate,
  removeParticipation,
  getFeed,
  getCalendar,
};
