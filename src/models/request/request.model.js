import { DataTypes } from 'sequelize'
import sequelize from '../../db/connection.js'
import User from '../user/user.model.js'
import Provider from '../provider/provider.model.js'
import Service from '../service/service.model.js'

const Request = sequelize.define('Request', {
  id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
  user_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'users', key: 'id' } },
  provider_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'providers', key: 'id' } },
  service_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'services', key: 'id' } },
  title: { type: DataTypes.STRING(255), allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  urgency: { type: DataTypes.ENUM('low','normal','high'), defaultValue: 'normal' },
  budget_min: { type: DataTypes.DECIMAL(10,2), allowNull: true },
  budget_max: { type: DataTypes.DECIMAL(10,2), allowNull: true },
  preferred_date: { type: DataTypes.DATE, allowNull: true },
  preferred_time: { type: DataTypes.TIME, allowNull: true },
  status: { type: DataTypes.ENUM('pending','accepted','rejected','in_progress','completed','cancelled'), defaultValue: 'pending' },
  provider_response: { type: DataTypes.TEXT, allowNull: true },
  estimated_completion: { type: DataTypes.DATE, allowNull: true },
  actual_completion_date: { type: DataTypes.DATE, allowNull: true },
  final_price: { type: DataTypes.DECIMAL(10,2), allowNull: true },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  tableName: 'requests',
  timestamps: false
})

User.hasMany(Request, { foreignKey: 'user_id' })
Provider.hasMany(Request, { foreignKey: 'provider_id' })
Service.hasMany(Request, { foreignKey: 'service_id' })
Request.belongsTo(User, { foreignKey: 'user_id' })
Request.belongsTo(Provider, { foreignKey: 'provider_id' })
Request.belongsTo(Service, { foreignKey: 'service_id' })

export default Request
