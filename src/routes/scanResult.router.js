import { Router } from "express";
import { scanResultController } from "../controllers/wardrobe/scanResult.controller.js";

const router = Router();

router.get("/getWardrobeItems/:userId", scanResultController.getWardrobeItems);
router.post("/", scanResultController.createScanner);

router.post(
  "/getWardrobeItems/:userId/action",
  scanResultController.updateWardrobeItemAction
);

export default router;
