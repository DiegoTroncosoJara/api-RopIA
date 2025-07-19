import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../../../db/connection.js";

const FilesStorage = sequelize.define(
  "FilesStorage",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    clerk_user_id: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    path: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    original_name: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    name_stored: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    type_extension: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "files_storage",
    timestamps: true,
  }
);

export default FilesStorage;
