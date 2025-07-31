import { Router } from "express";
import { scanResultController } from "../controllers/wardrobe/scanResult.controller.js";

const router = Router();

router.post("/", scanResultController.createScanner);
router.get("/getWardrobeItems/:userId", scanResultController.getWardrobeItems);

router.post(
  "/getWardrobeItems/:userId/action",
  scanResultController.updateWardrobeItemAction
);

export default router;
