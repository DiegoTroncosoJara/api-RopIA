import { DataTypes } from "sequelize";
import sequelize from "../../db/connection.js";
import User from "./user.model.js";

const Favorite = sequelize.define(
  "Favorite",
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
    favoritable_type: { type: DataTypes.STRING(100), allowNull: false },
    favoritable_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    tableName: "favorites",
    timestamps: false,
  }
);

User.hasMany(Favorite, { foreignKey: "user_id" });
Favorite.belongsTo(User, { foreignKey: "user_id" });

export default Favorite;
