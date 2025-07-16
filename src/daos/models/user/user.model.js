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
    email: { type: DataTypes.STRING(255), allowNull: false, unique: true },
    password_hash: { type: DataTypes.STRING(255), allowNull: false },
    user_type: {
      type: DataTypes.ENUM("consumer", "provider"),
      allowNull: false,
      defaultValue: "consumer",
    },
    email_verified_at: { type: DataTypes.DATE, allowNull: true },
    phone: { type: DataTypes.STRING(20), allowNull: true },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
    last_login_at: { type: DataTypes.DATE, allowNull: true },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    tableName: "users",
    timestamps: false,
  }
);

export default User;
