import { DataTypes } from "sequelize";
import sequelize from "../../../db/connection.js";

const Provider = sequelize.define(
  "Provider",
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
    business_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    business_type: {
      type: DataTypes.ENUM(
        "atelier",
        "repair",
        "upcycling",
        "recycling",
        "courses",
        "consultant"
      ),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    latitude: {
      type: DataTypes.DECIMAL(10, 8),
      allowNull: true,
    },
    longitude: {
      type: DataTypes.DECIMAL(11, 8),
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    website: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    instagram: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    facebook: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    years_experience: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    certifications: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    specialties: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    service_radius_km: {
      type: DataTypes.INTEGER,
      defaultValue: 10,
    },
    is_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    onboarding_completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    onboarding_step: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
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
    tableName: "providers",
    timestamps: false,
  }
);

export default Provider;
