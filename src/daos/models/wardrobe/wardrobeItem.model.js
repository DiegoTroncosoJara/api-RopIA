import { DataTypes } from "sequelize";
import sequelize from "../../../db/connection.js";
import User from "../user/user.model.js";

const WardrobeItem = sequelize.define(
  "WardrobeItem",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: { model: "users", key: "id" },
    },
    name: { type: DataTypes.STRING(255), allowNull: false },
    category: { type: DataTypes.STRING(100), allowNull: true },
    brand: { type: DataTypes.STRING(100), allowNull: true },
    color: { type: DataTypes.STRING(50), allowNull: true },
    size: { type: DataTypes.STRING(20), allowNull: true },
    material: { type: DataTypes.STRING(255), allowNull: true },
    purchase_date: { type: DataTypes.DATE, allowNull: true },
    purchase_price: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
    condition_score: { type: DataTypes.TINYINT, allowNull: true },
    sustainability_score: { type: DataTypes.TINYINT, allowNull: true },
    co2_footprint: { type: DataTypes.DECIMAL(8, 2), allowNull: true },
    water_usage: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
    photo_url: { type: DataTypes.STRING(500), allowNull: true },
    qr_code: { type: DataTypes.STRING(255), allowNull: true },
    last_worn: { type: DataTypes.DATE, allowNull: true },
    times_worn: { type: DataTypes.INTEGER, defaultValue: 0 },
    needs_repair: { type: DataTypes.BOOLEAN, defaultValue: false },
    is_favorite: { type: DataTypes.BOOLEAN, defaultValue: false },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    tableName: "wardrobe_items",
    timestamps: false,
  }
);

export default WardrobeItem;
