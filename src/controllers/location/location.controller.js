import Controllers from "../controller.manager.js";
import { locationService } from "../../services/location/location.service.js";

class LocationController extends Controllers {
  constructor() {
    super(locationService);
  }

  getLocations = async (req, res, next) => {
    try {
      const userLat = req.query.userLat;
      const userLng = req.query.userLng;
      const radiusKm = req.query?.radiusKm ?? 5;
      const type = req.query?.type ?? null;
      const locations = await this.service.getLocations({
        userLat,
        userLng,
        radiusKm,
        type,
      });
      res.json(locations);
    } catch (error) {
      next(error);
    }
  };

  createLocationsWithServices = async (req, res, next) => {
    try {
      const locations = await this.service.createLocationsWithServices(
        req.body
      );
      res.json(locations);
    } catch (error) {
      next(error);
    }
  };
}

export const locationController = new LocationController();
