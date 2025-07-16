import { DataTypes } from "sequelize";
import sequelize from "../../../db/connection.js";
import User from "../user/user.model.js";

const Community = sequelize.define(
  "Community",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    creator_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: { model: "users", key: "id" },
    },
    name: { type: DataTypes.STRING(255), allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    category: { type: DataTypes.STRING(100), allowNull: true },
    location: { type: DataTypes.STRING(255), allowNull: true },
    is_public: { type: DataTypes.BOOLEAN, defaultValue: true },
    member_count: { type: DataTypes.INTEGER, defaultValue: 0 },
    avatar_url: { type: DataTypes.STRING(500), allowNull: true },
    cover_url: { type: DataTypes.STRING(500), allowNull: true },
    rules: { type: DataTypes.TEXT, allowNull: true },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    tableName: "communities",
    timestamps: false,
  }
);

User.hasMany(Community, { foreignKey: "creator_id" });
Community.belongsTo(User, { foreignKey: "creator_id" });

export default Community;
