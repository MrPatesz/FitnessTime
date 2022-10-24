import express from "express";
import controller from "../controllers/userController";

const router = express.Router();

router.get("/profile", controller.getProfile);

router.get("/", controller.getAll);

router.get("/:id", controller.getSingle);

router.put("/:id", controller.update);

router.delete("/:id", controller.deleteSingle);

export default router;
