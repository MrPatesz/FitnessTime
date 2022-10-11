import express from "express";
import controller from "../controllers/eventController";

const router = express.Router();

router.get("/", controller.getAll);

router.get("/:id", controller.getSingle);

router.post("/", controller.create);

router.put("/:id", controller.update);

router.delete("/:id", controller.deleteSingle);

router.get("/owned", controller.getAllOwned);

router.post("/:id/participate", controller.participate);

export default router;
