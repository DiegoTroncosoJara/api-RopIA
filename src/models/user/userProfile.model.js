import { DataTypes } from 'sequelize'
import sequelize from '../../db/connection.js'
import User from './user.model.js'

const UserProfile = sequelize.define('UserProfile', {
  id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
  user_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'users', key: 'id' } },
  first_name: { type: DataTypes.STRING(100), allowNull: false },
  last_name: { type: DataTypes.STRING(100), allowNull: false },
  avatar_url: { type: DataTypes.STRING(500), allowNull: true },
  bio: { type: DataTypes.TEXT, allowNull: true },
  location: { type: DataTypes.STRING(255), allowNull: true },
  date_of_birth: { type: DataTypes.DATE, allowNull: true },
  gender: { type: DataTypes.ENUM('male', 'female', 'other', 'prefer_not_to_say'), allowNull: true },
  sustainability_level: { type: DataTypes.ENUM('beginner', 'intermediate', 'advanced'), defaultValue: 'beginner' },
  interests: { type: DataTypes.JSON, allowNull: true },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  tableName: 'user_profiles',
  timestamps: false
})

User.hasOne(UserProfile, { foreignKey: 'user_id' })
UserProfile.belongsTo(User, { foreignKey: 'user_id' })

export default UserProfile
