import { Express } from "express";

export default function addErrorHandling(app: Express) {
  app.use((_req, res, _next) => {
    const error = new Error("Not found");

    res.status(404).json({
      message: error.message,
    });
  });
}
