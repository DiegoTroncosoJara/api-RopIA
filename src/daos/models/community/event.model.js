import { DataTypes } from "sequelize";
import sequelize from "../../../db/connection.js";
import User from "../user/user.model.js";
import Community from "./community.model.js";

const Event = sequelize.define(
  "Event",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    organizer_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: { model: "users", key: "id" },
    },
    community_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      references: { model: "communities", key: "id" },
    },
    title: { type: DataTypes.STRING(255), allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    category: {
      type: DataTypes.ENUM("workshop", "lab", "collective", "course", "meetup"),
      allowNull: false,
    },
    event_date: { type: DataTypes.DATE, allowNull: false },
    start_time: { type: DataTypes.TIME, allowNull: false },
    end_time: { type: DataTypes.TIME, allowNull: false },
    location: { type: DataTypes.STRING(255), allowNull: false },
    address: { type: DataTypes.TEXT, allowNull: true },
    latitude: { type: DataTypes.DECIMAL(10, 8), allowNull: true },
    longitude: { type: DataTypes.DECIMAL(11, 8), allowNull: true },
    max_attendees: { type: DataTypes.INTEGER, allowNull: true },
    current_attendees: { type: DataTypes.INTEGER, defaultValue: 0 },
    price: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
    materials_included: { type: DataTypes.BOOLEAN, defaultValue: false },
    skill_level: {
      type: DataTypes.ENUM("beginner", "intermediate", "advanced", "all"),
      defaultValue: "all",
    },
    photo_url: { type: DataTypes.STRING(500), allowNull: true },
    requirements: { type: DataTypes.TEXT, allowNull: true },
    what_to_bring: { type: DataTypes.TEXT, allowNull: true },
    is_online: { type: DataTypes.BOOLEAN, defaultValue: false },
    meeting_url: { type: DataTypes.STRING(500), allowNull: true },
    status: {
      type: DataTypes.ENUM("draft", "published", "cancelled", "completed"),
      defaultValue: "draft",
    },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    tableName: "events",
    timestamps: false,
  }
);

User.hasMany(Event, { foreignKey: "organizer_id" });
Event.belongsTo(User, { foreignKey: "organizer_id" });
Community.hasMany(Event, { foreignKey: "community_id" });
Event.belongsTo(Community, { foreignKey: "community_id" });

export default Event;
