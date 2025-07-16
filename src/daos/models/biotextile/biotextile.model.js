import { DataTypes } from "sequelize";
import sequelize from "../../db/connection.js";
import User from "../user/user.model.js";

const Biotextile = sequelize.define(
  "Biotextile",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    contributor_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      references: { model: "users", key: "id" },
    },
    name: { type: DataTypes.STRING(255), allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    category: { type: DataTypes.STRING(100), allowNull: true },
    difficulty_level: {
      type: DataTypes.ENUM("beginner", "intermediate", "advanced"),
      defaultValue: "beginner",
    },
    preparation_time_hours: { type: DataTypes.INTEGER, allowNull: true },
    drying_time_hours: { type: DataTypes.INTEGER, allowNull: true },
    cost_estimate: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
    sustainability_score: { type: DataTypes.TINYINT, allowNull: true },
    durability_score: { type: DataTypes.TINYINT, allowNull: true },
    flexibility_score: { type: DataTypes.TINYINT, allowNull: true },
    water_resistance: {
      type: DataTypes.ENUM("none", "low", "medium", "high"),
      defaultValue: "none",
    },
    photo_url: { type: DataTypes.STRING(500), allowNull: true },
    video_url: { type: DataTypes.STRING(500), allowNull: true },
    is_verified: { type: DataTypes.BOOLEAN, defaultValue: false },
    verification_date: { type: DataTypes.DATE, allowNull: true },
    view_count: { type: DataTypes.INTEGER, defaultValue: 0 },
    like_count: { type: DataTypes.INTEGER, defaultValue: 0 },
    try_count: { type: DataTypes.INTEGER, defaultValue: 0 },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    tableName: "biotextiles",
    timestamps: false,
  }
);

User.hasMany(Biotextile, { foreignKey: "contributor_id" });
Biotextile.belongsTo(User, { foreignKey: "contributor_id" });

export default Biotextile;
