import http from "http";
import bodyParser from "body-parser";
import express from "express";
import logging from "./config/logging";
import config from "./config/config";
import eventRoutes from "./routes/eventRoute";
import userRoutes from "./routes/userRoute";
import { initDatabase } from "./database/initDatabase";

initDatabase();

const NAMESPACE = "Server";
const app = express();

app.use((req, res, next) => {
  logging.info(
    NAMESPACE,
    `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`
  );

  res.on("finish", () => {
    logging.info(
      NAMESPACE,
      `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`
    );
  });

  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method == "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }

  next();
});

app.use("/api/events", eventRoutes);
app.use("/api/users", userRoutes);

app.use((_req, res, _next) => {
  const error = new Error("Not found");

  res.status(404).json({
    message: error.message,
  });
});

const httpServer = http.createServer(app);

httpServer.listen(config.server.port, () =>
  console.log(
    `Server is running ${config.server.hostname}:${config.server.port}`
  )
);
