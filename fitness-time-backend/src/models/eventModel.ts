import * as Sequelize from "sequelize";
import { sequelize } from "../database/database";

export const Event = sequelize.define("event", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  location: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  from: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  to: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  recurring: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },

  // NULLABLE properties
  description: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  limit: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: true,
  },
  equipment: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});
