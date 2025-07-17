import Services from "../service.manager.js";
import { scanResultDao } from "../../daos/mysql/wardrobe/scanResult.dao.js";
import WardrobeItem from "../../daos/models/wardrobe/wardrobeItem.model.js";

class ScanResultService extends Services {
  constructor() {
    super(scanResultDao);
  }

  createScanner = async (data) => {
    try {
      const {
        user_id,
        composition,
        condition_detected,
        ai_confidence,
        recommendations,
        name,
        clothing_type,
        condition_status,
        impact_water_saved,
        impact_co2_saved,
        impact_waste_saved,
      } = data;
      const newScannResult = await this.dao.create({
        user_id,
        composition,
        condition_detected,
        ai_confidence,
        recommendations,
      });

      await WardrobeItem.create({
        user_id,
        scan_result_id: newScannResult.id,
        name,
        clothing_type,
        composition,
        condition_status,
        impact_water_saved,
        impact_co2_saved,
        impact_waste_saved,
      });
    } catch (error) {
      throw error;
    }
  };

  getWardrobeItems = async (userId) => {
    try {
      const items = await this.dao.getWardrobeItems(userId);

      const impactResult = await this.dao.calculateTotalImpact(userId);

      const totalImpact =
        Array.isArray(impactResult) && impactResult.length > 0
          ? impactResult[0]
          : {
              total_water: 0,
              total_co2: 0,
              total_waste: 0,
            };

      return {
        items: Array.isArray(items) ? items : [],
        totalImpact: {
          water: totalImpact.total_water,
          co2: totalImpact.total_co2,
          waste: totalImpact.total_waste,
        },
      };
    } catch (error) {
      throw error;
    }
  };
}

export const scanResultService = new ScanResultService();
