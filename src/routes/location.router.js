import { Router } from "express";
import { locationController } from "../controllers/location/location.controller.js";
const router = Router();

router.get("/getLocations/", locationController.getLocations);
router.post(
  "/createLocationsWithServices/",
  locationController.createLocationsWithServices
);

export default router;
