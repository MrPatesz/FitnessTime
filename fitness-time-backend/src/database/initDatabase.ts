import { initUser, User } from "../models/userModel";
import { Event, initEvent } from "../models/eventModel";
import { sequelize } from "../database/database";
import { initParticipation } from "../models/participationModel";
import { addSeedData } from "./seedData";

export const initDatabase = () => {
  initEvent(sequelize);
  initUser(sequelize);
  initParticipation(sequelize);

  User.hasMany(Event, {
    as: "ownedEvents",
    foreignKey: "ownerId",
  });
  Event.belongsTo(User, {
    as: "owner",
    foreignKey: "ownerId",
    onDelete: "CASCADE",
  });

  Event.belongsToMany(User, {
    through: "participations",
    as: "participants",
    foreignKey: "userId",
  });
  User.belongsToMany(Event, {
    through: "participations",
    as: "participatedEvents",
    foreignKey: "eventId",
  });

  addSeedData(sequelize);
};
