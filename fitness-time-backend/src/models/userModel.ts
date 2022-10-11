import { DataTypes, Sequelize } from "sequelize";
import { Model } from "sequelize";

export class User extends Model {
  declare id: number;
  username: string;
  passwordHash: string;
  introduction: string | null;
}

export const initUser = (sequelize: Sequelize) => {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      passwordHash: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      // NULLABLE properties
      introduction: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    { sequelize, timestamps: true, updatedAt: false, tableName: "users" }
  );
};
