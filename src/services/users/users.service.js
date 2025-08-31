import Services from "../service.manager.js";

import { usersDao } from "../../daos/mysql/users/users.dao.js";
import { User } from "../../daos/models/index.js";

class UsersService extends Services {
  constructor() {
    super(usersDao);
  }

  // createScanner = async (data) => {
  //   try {
  //     const {
  //       user_id,
  //       composition,
  //       condition_detected,
  //       ai_confidence,
  //       recommendations,
  //       name,
  //       clothing_type = "other",
  //       impact_water_saved,
  //       impact_co2_saved,
  //       impact_waste_saved,
  //       photo_url,
  //     } = data;

  //     const params = {
  //       user_id,
  //       condition_detected,
  //       ai_confidence,
  //       photo_url,
  //       // Asegurado como string
  //       composition:
  //         typeof composition === "string"
  //           ? composition
  //           : JSON.stringify(composition ?? null),
  //       recommendations:
  //         typeof recommendations === "string"
  //           ? recommendations
  //           : JSON.stringify(recommendations ?? []),
  //     };

  //     const newScannResult = await this.dao.create(params);

  //     const wardrobeItem = await wardrobeItemDao.create({
  //       user_id,
  //       scan_result_id: newScannResult.id,
  //       name,
  //       clothing_type,
  //       composition:
  //         typeof composition === "string"
  //           ? composition
  //           : JSON.stringify(composition ?? null),
  //       condition_status: condition_detected,
  //       impact_water_saved,
  //       impact_co2_saved,
  //       impact_waste_saved,
  //     });

  //     return wardrobeItem;
  //   } catch (error) {
  //     throw error;
  //   }
  // };

  // getWardrobeItems = async (userId) => {
  //   try {
  //     const items = await this.dao.getWardrobeItems(userId);

  //     const impactResult = await this.dao.calculateTotalImpact(userId);

  //     const totalImpact = impactResult ?? {
  //       total_water: 0,
  //       total_co2: 0,
  //       total_waste: 0,
  //     };

  //     return {
  //       items,
  //       totalImpact: {
  //         water: Number(totalImpact.total_water),
  //         co2: Number(totalImpact.total_co2),
  //         waste: Number(totalImpact.total_waste),
  //       },
  //     };
  //   } catch (error) {
  //     throw error;
  //   }
  // };

  // updateWardrobeItemAction = async (data, userId) => {
  //   try {
  //     const { action, location, itemId } = data;
  //     const existItem = await wardrobeItemDao.getWardrobeItemsByIditemIduser(
  //       itemId,
  //       userId
  //     );

  //     if (!existItem) throw new Error("Item not found");

  //     const itemUpdated = await wardrobeItemDao.update(itemId, {
  //       action_taken: action,
  //       action_date: new Date(),
  //       action_location: location,
  //     });

  //     return itemUpdated;
  //   } catch (error) {
  //     throw error;
  //   }
  // };

  createUser = async (data) => {
    try {
      const newUser = await this.dao.create(data);
      return newUser;
    } catch (error) {
      throw error;
    }
  };

  updateUser = async (idUserClerk, data) => {
    try {
      const user = await User.findOne({
        where: { clerk_user_id: idUserClerk },
      });
      if (!user) throw new Error("User not found");

      const updatedUser = await this.dao.update(user.id, data);
      return updatedUser;
    } catch (error) {
      throw error;
    }
  };
}

export const usersService = new UsersService();
