import { DataTypes } from "sequelize";
import sequelize from "../../db/connection.js";

const ServiceCategory = sequelize.define(
  "ServiceCategory",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING(100), allowNull: false },
    slug: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    icon: { type: DataTypes.STRING(50), allowNull: true },
    color: { type: DataTypes.STRING(7), allowNull: true },
    description: { type: DataTypes.TEXT, allowNull: true },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    tableName: "service_categories",
    timestamps: false,
  }
);

export default ServiceCategory;
