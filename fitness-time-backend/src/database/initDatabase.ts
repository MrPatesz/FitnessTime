import { initUser, User } from "../models/userModel";
import { Event, initEvent } from "../models/eventModel";
import { sequelize } from "../database/database";
import { initParticipation } from "../models/participationModel";

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

  sequelize
    .sync({ force: true })
    .then(() => {
      return User.create({
        username: "DefaultUser",
        introduction: null,
        passwordHash: "pw_hash",
      });
    })
    .then(() => {
      return User.create({
        username: "DefaultUser2",
        introduction: null,
        passwordHash: "pw_hash2",
      });
    })
    .then((user) => {
      return Event.create({
        ownerId: user.id,
        name: "Full body workout",
        longitude: 19.0633245,
        latitude: 47.4873813,
        address: "4% Fitness GYM",
        from: new Date(),
        to: new Date(),
        recurring: true,
      });
    })
    .then(async (event) => {
      const user = await User.findByPk(1);
      return (event as any).addParticipant(user);
    })
    .then(() => console.log("Database initialized"))
    .catch((err) => console.log(err.message));
};
