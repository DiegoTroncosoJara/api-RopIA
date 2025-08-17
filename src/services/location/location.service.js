import Services from "../service.manager.js";
import { locationDao } from "../../daos/mysql/location/location.dao.js";
import { servicesDao } from "../../daos/mysql/services/services.dao.js";

class LocationService extends Services {
  constructor() {
    super(locationDao);
  }

  getLocations = async (data) => {
    try {
      const { userLat, userLng, radiusKm = 5, type = null } = data;

      const locations = await this.dao.getLocations(
        userLat,
        userLng,
        radiusKm,
        type
      );

      const locationsWithServices = locations.map((loc) => ({
        id: loc.id,
        name: loc.name,
        type: loc.type,
        rating: loc.rating,
        address: loc.address,
        phone: loc.phone,
        hours: loc.opening_hours,
        description: loc.description,
        price: loc.price,
        latitude: loc.latitude,
        longitude: loc.longitude,
        services: loc.services.map((s) => s.name),
        isFavorite: false,
        distance_km: loc.get("distance_km"),
      }));

      return locationsWithServices;
    } catch (error) {
      throw error;
    }
  };

  createLocationsWithServices = async (data) => {
    try {
      const {
        address,
        description,
        email,
        is_public,
        latitude,
        longitude,
        name,
        phone,
        type,
        website,
        services,
        opening_hours,
        opening_hours_json,
      } = data;

      const newLocation = await this.dao.create({
        address,
        description,
        email,
        is_public,
        latitude,
        longitude,
        name,
        phone,
        type,
        website,
        opening_hours,
        opening_hours_json,
      });

      const servicePromises = services.map((service) =>
        servicesDao.create({
          location_id: newLocation.id,
          category: service.category,
          description: service.description,
          duration_hours: service.duration_hours,
          name: service.name,
          price: service.price,
        })
      );

      await Promise.all(servicePromises);

      return newLocation;
    } catch (error) {
      throw error;
    }
  };
}

export const locationService = new LocationService();
