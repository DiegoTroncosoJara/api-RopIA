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
      type: DataTypes.STRING(128),
      allowNull: false,
      references: { model: "users", key: "clerk_user_id" },
    },
    scan_type: {
      type: DataTypes.ENUM(
        "new_item",
        "condition_check",
        "sustainability_check"
      ),
      allowNull: true,
    },
    composition: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    condition_detected: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    ai_confidence: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    recommendations: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    photo_url: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },

    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "scan_results",
    timestamps: false,
  }
);

export default ScanResult;
