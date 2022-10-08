import EventDto from "../models/eventDto";
import CrudServiceBase from "./CrudServiceBase";

export default function EventService() {
  const crudService = CrudServiceBase<EventDto>("events");

  return {
    ...crudService,
  };
}
