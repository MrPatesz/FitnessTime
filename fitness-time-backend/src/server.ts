import http from "http";
import bodyParser from "body-parser";
import express from "express";
import config from "./config/config";
import eventRoutes from "./routes/eventRoute";
import userRoutes from "./routes/userRoute";
import authRoutes from "./routes/authRoute";
import { initDatabase } from "./database/initDatabase";
import passport from "passport";
import initPassport from "./auth/authentication";
import addLogging from "./middlewares/logging";
import addErrorHandling from "./middlewares/errorHandling";
import addResponseHeaders from "./middlewares/responseHeaders";

initDatabase();
initPassport(passport);

const app = express();

addLogging(app);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

addResponseHeaders(app);

app.use("/api/auth", authRoutes);
app.use(
  "/api/users",
  passport.authenticate("jwt", { session: false }),
  userRoutes
);
app.use(
  "/api/events",
  passport.authenticate("jwt", { session: false }),
  eventRoutes
);

addErrorHandling(app);

const httpServer = http.createServer(app);

httpServer.listen(config.server.port, () =>
  console.log(
    `Server is running ${config.server.hostname}:${config.server.port}`
  )
);
