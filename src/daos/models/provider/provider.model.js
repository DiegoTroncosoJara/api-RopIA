import { DataTypes } from "sequelize";
import sequelize from "../../db/connection.js";
import User from "../user/user.model.js";

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
    business_name: { type: DataTypes.STRING(255), allowNull: false },
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
    description: { type: DataTypes.TEXT, allowNull: true },
    address: { type: DataTypes.TEXT, allowNull: false },
    latitude: { type: DataTypes.DECIMAL(10, 8), allowNull: true },
    longitude: { type: DataTypes.DECIMAL(11, 8), allowNull: true },
    phone: { type: DataTypes.STRING(20), allowNull: false },
    website: { type: DataTypes.STRING(255), allowNull: true },
    instagram: { type: DataTypes.STRING(100), allowNull: true },
    facebook: { type: DataTypes.STRING(100), allowNull: true },
    years_experience: { type: DataTypes.INTEGER, defaultValue: 0 },
    certifications: { type: DataTypes.TEXT, allowNull: true },
    is_verified: { type: DataTypes.BOOLEAN, defaultValue: false },
    verification_date: { type: DataTypes.DATE, allowNull: true },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    tableName: "providers",
    timestamps: false,
  }
);

User.hasOne(Provider, { foreignKey: "user_id" });
Provider.belongsTo(User, { foreignKey: "user_id" });

export default Provider;
