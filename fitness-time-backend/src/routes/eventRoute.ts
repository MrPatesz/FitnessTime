import express from "express";
import controller from "../controllers/eventController";

const router = express.Router();

router.get("/owned", controller.getAllOwned);

router.get("/feed", controller.getFeed);

router.get("/calendar", controller.getCalendar);

router.get("/", controller.getAll);

router.get("/:id", controller.getSingle);

router.post("/", controller.create);

router.post("/:id/participate", controller.participate);

router.put("/:id", controller.update);

router.delete("/:id", controller.deleteSingle);

export default router;
