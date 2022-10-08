import { Sequelize } from "sequelize";
import config from "../config/config";

export const sequelize = new Sequelize(
  config.database.database_name ?? "",
  config.database.user ?? "",
  config.database.password,
  {
    dialect: "postgres",
    host: config.database.hostname,
  }
);
