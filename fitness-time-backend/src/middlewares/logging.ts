import { Express } from "express";
import logging from "../config/logging";

const NAMESPACE = "Server";

export default function addLogging(app: Express) {
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
}
