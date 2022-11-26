import { DataTypes, Sequelize } from "sequelize";
import { Model } from "sequelize";
import { User } from "./userModel";

export class Event extends Model {
  declare id: number;
  ownerId: number;
  owner?: User;
  name: string;
  latitude: number;
  longitude: number;
  address: string;
  from: Date;
  to: Date;
  // recurring: boolean;
  description: string | null;
  limit: number | null;
  price: number | null;
  equipment: string | null;
  participants?: User[];
}

export const initEvent = (sequelize: Sequelize) => {
  Event.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      latitude: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      longitude: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      from: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      to: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      /* recurring: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      }, */

      // NULLABLE properties
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      limit: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      equipment: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    { sequelize, tableName: "events" }
  );
};
