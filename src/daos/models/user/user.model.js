import { DataTypes } from "sequelize";
import sequelize from "../../../db/connection.js";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    clerk_user_id: {
      // ← ID de Clerk (obligatorio y único)
      type: DataTypes.STRING(128),
      allowNull: false,
      unique: true,
    },
    email: {
      // opcional, útil para referencias
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    user_type: {
      type: DataTypes.ENUM("consumer", "provider"),
      allowNull: false,
      defaultValue: "consumer",
    },
    phone: {
      type: DataTypes.STRING(20),
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
    tableName: "users",
    timestamps: false,
  }
);

export default User;
