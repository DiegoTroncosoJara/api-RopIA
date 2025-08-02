import Services from "../service.manager.js";
import { locationDao } from "../../daos/mysql/location/location.dao.js";

class LocationService extends Services {
  constructor() {
    super(locationDao);
  }

  getLocations = async (data) => {
    try {
      const { userLat, userLng, radiusKm = 5 } = data;

      const locations = await this.dao.getLocations(userLat, userLng, radiusKm);

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
        services: loc.Services.map((s) => s.name),
        isFavorite: false,
        distance_km: loc.get("distance_km"),
      }));

      return locationsWithServices;
    } catch (error) {
      throw error;
    }
  };
}

export const locationService = new LocationService();
