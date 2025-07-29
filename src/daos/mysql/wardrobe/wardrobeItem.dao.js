import MysqlDao from "../mysql.dao.js";

import { WardrobeItem } from "../../models/index.js";

class WardrobeItemDaoMysql extends MysqlDao {
  constructor() {
    super(WardrobeItem);
  }

  async getWardrobeItemsByIditemIduser(itemId, userId) {
    try {
      const data = await this.model.findOne({
        where: {
          id: itemId,
          user_id: userId,
        },
      });
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export const wardrobeItemDao = new WardrobeItemDaoMysql();
