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
        wi.id,
        wi.name,
        wi.clothing_type AS type,
        wi.composition,
        wi.condition_status AS \`condition\`, 
        wi.action_taken AS action,
        wi.action_date,
        wi.action_location,
        wi.created_at AS dateAdded,
        wi.impact_water_saved AS impactWater,
        wi.impact_co2_saved AS impactCO2,
        wi.impact_waste_saved AS impactWaste,
        sr.recommendations,
        sr.photo_url as photoUrl
      FROM wardrobe_items wi
      JOIN scan_results sr ON wi.scan_result_id = sr.id
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

      return data[0];
    } catch (error) {
      throw new Error(error);
    }
  }
}

export const scanResultDao = new ScanResultDaoMysql();
