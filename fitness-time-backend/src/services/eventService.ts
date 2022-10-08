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

const getSingle = async (id: number): Promise<EventDto | null> => {
  const entity = await Event.findByPk(id, {
    include: [{ model: User, as: "owner" }],
  });
  if (!entity) return null;
  else return toEventDto(entity);
};

const create = async (eventDto: EventDto): Promise<EventDto | null> => {
  if (eventDto.from > eventDto.to) return null;

  try {
    const event = await Event.create({ ...eventDto, id: undefined });
    return toEventDto(event);
  } catch (error) {
    return null;
  }
};

const update = async (eventDto: EventDto): Promise<EventDto | null> => {
  if (eventDto.from > eventDto.to) return null;

  const entity = await Event.findByPk(eventDto.id);
  if (!entity) return null;

  entity.update({ ...eventDto });
  return toEventDto(entity);
};

const deleteSingle = async (id: number): Promise<boolean> => {
  const entity = await Event.findByPk(id);
  const result = await entity?.destroy();
  return result !== undefined;
};

export default { getAll, getSingle, create, update, deleteSingle };
