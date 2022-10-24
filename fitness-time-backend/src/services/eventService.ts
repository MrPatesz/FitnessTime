import { Event } from "../models/eventModel";
import EventDto, { toEventDto } from "../dtos/eventDto";
import { User } from "../models/userModel";

const getAll = async (): Promise<EventDto[]> => {
  const entities = await Event.findAll({
    include: [{ model: User, as: "owner" }],
    order: [["name", "ASC"]],
  });
  return entities.map((e) => toEventDto(e));
};

const getAllOwned = async (ownerId: number): Promise<EventDto[]> => {
  const entities = await Event.findAll({
    where: { ownerId },
    include: [{ model: User, as: "owner" }],
    order: [["name", "ASC"]],
  });
  return entities.map((e) => toEventDto(e));
};

const getSingle = async (id: number): Promise<EventDto | null> => {
  const entity = await Event.findByPk(id, {
    include: [
      { model: User, as: "owner" },
      { model: User, as: "participants" },
    ],
  });
  if (!entity) return null;
  else return toEventDto(entity);
};

const create = async (
  eventDto: EventDto,
  callerId: number
): Promise<EventDto | null> => {
  if (eventDto.from > eventDto.to) return null;

  try {
    const event = await Event.create({
      ...eventDto,
      ownerId: callerId,
      id: undefined,
    });
    return toEventDto(event);
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

  entity.update({ ...eventDto });
  return toEventDto(entity);
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
};
