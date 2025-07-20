import MysqlDao from "../mysql.dao.js";
import { ScanResult } from "../../models/index.js";

class ScanResultDaoMysql extends MysqlDao {
  constructor() {
    super(ScanResult);
  }

  async getWardrobeItems(userId) {
    try {
      const data = await this.model.sequelize.query(
        `
        SELECT 
          wi.id, wi.name, wi.clothing_type, wi.composition, wi.condition_status,
          wi.action_taken, wi.action_date, wi.action_location, wi.created_at,
          wi.impact_water_saved, wi.impact_co2_saved, wi.impact_waste_saved
        FROM wardrobe_items wi
        WHERE wi.user_id = :userId AND wi.is_active = true
        ORDER BY wi.created_at DESC
        `,
        {
          type: this.model.sequelize.QueryTypes.SELECT,
          replacements: { userId: userId },
        }
      );

      return data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async calculateTotalImpact(userId) {
    try {
      const data = await this.model.sequelize.query(
        `
           SELECT 
              COALESCE(SUM(impact_water_saved), 0) as total_water,
              COALESCE(SUM(impact_co2_saved), 0) as total_co2,
              COALESCE(SUM(impact_waste_saved), 0) as total_waste
            FROM wardrobe_items
            WHERE user_id = :userId AND is_active = true
        `,
        {
          type: this.model.sequelize.QueryTypes.SELECT,
          replacements: { userId: userId },
        }
      );

      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export const scanResultDao = new ScanResultDaoMysql();
