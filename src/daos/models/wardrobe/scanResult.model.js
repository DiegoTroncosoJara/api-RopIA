import { DataTypes } from "sequelize";
import sequelize from "../../../db/connection.js";
import User from "../user/user.model.js";
import WardrobeItem from "./wardrobeItem.model.js";

const ScanResult = sequelize.define(
  "ScanResult",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: { model: "users", key: "clerk_user_id" },
    },
    wardrobe_item_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      references: { model: "wardrobe_items", key: "id" },
    },
    scan_type: {
      type: DataTypes.ENUM(
        "new_item",
        "condition_check",
        "sustainability_check"
      ),
      allowNull: false,
    },
    photo_url: { type: DataTypes.STRING(500), allowNull: false },
    ai_analysis: { type: DataTypes.JSON, allowNull: true },
    detected_materials: { type: DataTypes.JSON, allowNull: true },
    condition_assessment: { type: DataTypes.JSON, allowNull: true },
    sustainability_metrics: { type: DataTypes.JSON, allowNull: true },
    recommendations: { type: DataTypes.JSON, allowNull: true },
    confidence_score: { type: DataTypes.DECIMAL(5, 2), allowNull: true },
    processing_time_ms: { type: DataTypes.INTEGER, allowNull: true },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    tableName: "scan_results",
    timestamps: false,
  }
);

export default ScanResult;
