import { DataTypes } from "sequelize";
import sequelize from "../../db/connection.js";
import User from "../user/user.model.js";

const NotificationSetting = sequelize.define(
  "NotificationSetting",
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
      unique: true,
    },
    push_notifications: { type: DataTypes.BOOLEAN, defaultValue: true },
    email_notifications: { type: DataTypes.BOOLEAN, defaultValue: true },
    sms_notifications: { type: DataTypes.BOOLEAN, defaultValue: false },
    event_reminders: { type: DataTypes.BOOLEAN, defaultValue: true },
    community_updates: { type: DataTypes.BOOLEAN, defaultValue: true },
    new_materials: { type: DataTypes.BOOLEAN, defaultValue: true },
    scan_results: { type: DataTypes.BOOLEAN, defaultValue: true },
    marketing_emails: { type: DataTypes.BOOLEAN, defaultValue: false },
    sound_enabled: { type: DataTypes.BOOLEAN, defaultValue: true },
    vibration_enabled: { type: DataTypes.BOOLEAN, defaultValue: true },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    tableName: "notification_settings",
    timestamps: false,
  }
);

User.hasOne(NotificationSetting, { foreignKey: "user_id" });
NotificationSetting.belongsTo(User, { foreignKey: "user_id" });

export default NotificationSetting;
