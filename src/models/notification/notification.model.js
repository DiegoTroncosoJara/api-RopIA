import { DataTypes } from 'sequelize'
import sequelize from '../../db/connection.js'
import User from '../user/user.model.js'

const Notification = sequelize.define('Notification', {
  id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
  user_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'users', key: 'id' } },
  type: { type: DataTypes.STRING(100), allowNull: false },
  title: { type: DataTypes.STRING(255), allowNull: false },
  message: { type: DataTypes.TEXT, allowNull: false },
  data: { type: DataTypes.JSON, allowNull: true },
  is_read: { type: DataTypes.BOOLEAN, defaultValue: false },
  read_at: { type: DataTypes.DATE, allowNull: true },
  action_url: { type: DataTypes.STRING(500), allowNull: true },
  expires_at: { type: DataTypes.DATE, allowNull: true },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  tableName: 'notifications',
  timestamps: false
})

User.hasMany(Notification, { foreignKey: 'user_id' })
Notification.belongsTo(User, { foreignKey: 'user_id' })

export default Notification
