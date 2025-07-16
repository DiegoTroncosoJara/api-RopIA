import { DataTypes } from "sequelize";
import sequelize from "../../db/connection.js";
import Request from "./request.model.js";

const RequestPhoto = sequelize.define(
  "RequestPhoto",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    request_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: { model: "requests", key: "id" },
    },
    photo_url: { type: DataTypes.STRING(500), allowNull: false },
    caption: { type: DataTypes.STRING(255), allowNull: true },
    uploaded_by: { type: DataTypes.ENUM("user", "provider"), allowNull: false },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    tableName: "request_photos",
    timestamps: false,
  }
);

Request.hasMany(RequestPhoto, { foreignKey: "request_id" });
RequestPhoto.belongsTo(Request, { foreignKey: "request_id" });

export default RequestPhoto;
