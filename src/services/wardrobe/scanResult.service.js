import Services from "../service.manager.js";
import { scanResultDao } from "../../daos/mysql/wardrobe/scanResult.dao.js";
import { wardrobeItemDao } from "../../daos/mysql/wardrobe/wardrobeItem.dao.js";

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
        clothing_type = "other",
        impact_water_saved,
        impact_co2_saved,
        impact_waste_saved,
        photo_url,
      } = data;
      console.log("data: ", data);

      const newScannResult = await this.dao.create({
        user_id,
        composition,
        condition_detected,
        ai_confidence,
        recommendations,
        photo_url,
      });

      await wardrobeItemDao.create({
        user_id,
        scan_result_id: newScannResult.id,
        name,
        clothing_type,
        composition,
        condition_status: condition_detected,
        impact_water_saved,
        impact_co2_saved,
        impact_waste_saved,
      });

      return newScannResult;
    } catch (error) {
      throw error;
    }
  };

  getWardrobeItems = async (userId) => {
    try {
      const items = await this.dao.getWardrobeItems(userId);

      const impactResult = await this.dao.calculateTotalImpact(userId);

      const totalImpact = impactResult ?? {
        total_water: 0,
        total_co2: 0,
        total_waste: 0,
      };

      return {
        items,
        totalImpact: {
          water: Number(totalImpact.total_water),
          co2: Number(totalImpact.total_co2),
          waste: Number(totalImpact.total_waste),
        },
      };
    } catch (error) {
      throw error;
    }
  };

  updateWardrobeItemAction = async (data, userId) => {
    try {
      console.log("entro");
      console.log("data: ", data);
      console.log("userId: ", userId);

      const { action, location, itemId } = data;
      const existItem = await wardrobeItemDao.getWardrobeItemsByIditemIduser(
        itemId,
        userId
      );
      console.log();

      if (!existItem) throw new Error("Item not found");

      const itemUpdated = await wardrobeItemDao.update(itemId, {
        action_taken: action,
        action_date: new Date(),
        action_location: location,
      });

      return itemUpdated;
    } catch (error) {
      throw error;
    }
  };
}

export const scanResultService = new ScanResultService();
