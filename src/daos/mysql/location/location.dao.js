import { Op, fn, col, literal } from "sequelize";
import MysqlDao from "../mysql.dao.js";
import { Location, Services } from "../../models/index.js";

class LocationDaoMysql extends MysqlDao {
  constructor() {
    super(Location);
  }

  async getLocations(userLat, userLng, radiusKm = 5, type) {
    try {
      const distanceFormula = `
        6371 * acos(
          cos(radians(${userLat}))
          * cos(radians(latitude))
          * cos(radians(longitude) - radians(${userLng}))
          + sin(radians(${userLat}))
          * sin(radians(latitude))
        )
      `;

      const whereClause = {
        [Op.and]: [literal(`${distanceFormula} <= ${radiusKm}`)],
      };

      if (type) {
        whereClause[Op.and].push({ type });
      }

      const locations = await this.model.findAll({
        attributes: {
          include: [[literal(distanceFormula), "distance_km"]],
        },
        where: whereClause,
        include: [
          {
            model: Services,
            as: "services",
          },
        ],
        order: literal("distance_km ASC"),
      });

      return locations;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export const locationDao = new LocationDaoMysql();
