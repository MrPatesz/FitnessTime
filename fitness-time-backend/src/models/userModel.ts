import * as Sequelize from "sequelize";
import { sequelize } from "../database/database";

export const User = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  passwordHash: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  passwordSalt: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  // NULLABLE properties
  introduction: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});
