import { Router } from "express";
import { scanResultController } from "../controllers/wardrobe/scanResult.controller.js";

const router = Router();

router.post("/", scanResultController.createScanner);
router.post("/getWardrobeItems/:userId", scanResultController.getWardrobeItems);

export default router;
