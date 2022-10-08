import express from "express";
import controller from "../controllers/userController";

const router = express.Router();

router.get("/", controller.getAll);

router.get("/:id", controller.getSingle);

router.post("/", controller.create);

router.put("/:id", controller.update);

router.delete("/:id", controller.deleteSingle);

export default router;
