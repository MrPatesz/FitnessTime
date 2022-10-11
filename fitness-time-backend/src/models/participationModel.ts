import { DataTypes, Sequelize } from "sequelize";
import { Model } from "sequelize";
import { Event } from "./eventModel";
import { User } from "./userModel";

export class Participation extends Model {
  eventId: number;
  event?: Event;
  userId: number;
  user?: User;
}

export const initParticipation = (sequelize: Sequelize) => {
  Participation.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      eventId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      // TODO maybe status, then updatedAt might be needed
    },
    {
      sequelize,
      tableName: "participations",
      timestamps: true,
      updatedAt: false,
    }
  );
};
