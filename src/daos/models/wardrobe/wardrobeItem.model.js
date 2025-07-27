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
      type: DataTypes.STRING(128),
      allowNull: false,
      references: { model: "users", key: "clerk_user_id" },
    },
    scan_result_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      references: { model: "scan_results", key: "id" },
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    clothing_type: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    composition: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    condition_status: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    impact_water_saved: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    impact_co2_saved: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    impact_waste_saved: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    tableName: "wardrobe_items",
    timestamps: false,
  }
);

export default WardrobeItem;
