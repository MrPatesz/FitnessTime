import { User } from "../models/userModel";
import { Event } from "../models/eventModel";
import UserDto from "../dtos/userDto";
import { Sequelize } from "sequelize";

export const initDatabase = (sequelize: Sequelize) => {
  Event.belongsTo(User, {
    as: "owner",
    foreignKey: "ownerId",
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
    .then((user) => {
      const userDto = user as unknown as UserDto;
      return Event.create({
        ownerId: userDto.id,
        name: "Full body workout",
        location: "4%",
        from: new Date(),
        to: new Date(),
        recurring: true,
      });
    })
    .then(() => console.log("Database initialized"))
    .catch((err) => console.log(err.message));
};
