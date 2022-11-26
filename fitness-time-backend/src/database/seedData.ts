import { Sequelize } from "sequelize";
import { User } from "../models/userModel";
import { Event } from "../models/eventModel";

export const addSeedData = (sequelize: Sequelize) => {
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
