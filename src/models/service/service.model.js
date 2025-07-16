import { DataTypes } from 'sequelize'
import sequelize from '../../db/connection.js'
import Provider from '../provider/provider.model.js'
import ServiceCategory from './serviceCategory.model.js'

const Service = sequelize.define('Service', {
  id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
  provider_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'providers', key: 'id' } },
  category_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, references: { model: 'service_categories', key: 'id' } },
  name: { type: DataTypes.STRING(255), allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: true },
  price_from: { type: DataTypes.DECIMAL(10,2), allowNull: false },
  price_to: { type: DataTypes.DECIMAL(10,2), allowNull: true },
  duration_min: { type: DataTypes.INTEGER, allowNull: true },
  duration_max: { type: DataTypes.INTEGER, allowNull: true },
  materials_included: { type: DataTypes.BOOLEAN, defaultValue: false },
  is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  tableName: 'services',
  timestamps: false
})

Provider.hasMany(Service, { foreignKey: 'provider_id' })
Service.belongsTo(Provider, { foreignKey: 'provider_id' })
ServiceCategory.hasMany(Service, { foreignKey: 'category_id' })
Service.belongsTo(ServiceCategory, { foreignKey: 'category_id' })

export default Service
