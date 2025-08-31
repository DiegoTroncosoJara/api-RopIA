import { Router } from "express";
import { usersController } from "../controllers/users/users.controller.js";

const router = Router();

router.post("/", usersController.createUser);
router.put("/:idUserClerk", usersController.updateUser);

export default router;
