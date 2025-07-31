import { DataTypes } from "sequelize";
import sequelize from "../../../db/connection.js";

const Services = sequelize.define(
  "Services",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    provider_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: { model: "providers", key: "id" },
    },
    // category_id: {
    //   type: DataTypes.INTEGER.UNSIGNED,
    //   allowNull: false,
    //   references: { model: "service_categories", key: "id" },
    // },
    id_location: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      references: { model: "locations", key: "id" },
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    duration_hours: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "services",
    timestamps: false,
  }
);

// ServiceCategory.hasMany(Services, { foreignKey: "category_id" });
// Services.belongsTo(ServiceCategory, { foreignKey: "category_id" });

export default Services;
