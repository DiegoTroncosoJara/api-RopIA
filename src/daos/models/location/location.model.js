import { DataTypes } from 'sequelize'
import sequelize from '../../db/connection.js'
import Provider from '../provider/provider.model.js'

const Location = sequelize.define('Location', {
  id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
  provider_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: true, references: { model: 'providers', key: 'id' } },
  name: { type: DataTypes.STRING(255), allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: true },
  address: { type: DataTypes.TEXT, allowNull: false },
  latitude: { type: DataTypes.DECIMAL(10,8), allowNull: false },
  longitude: { type: DataTypes.DECIMAL(11,8), allowNull: false },
  phone: { type: DataTypes.STRING(20), allowNull: true },
  website: { type: DataTypes.STRING(255), allowNull: true },
  email: { type: DataTypes.STRING(255), allowNull: true },
  opening_hours: { type: DataTypes.JSON, allowNull: true },
  rating: { type: DataTypes.DECIMAL(3,2), defaultValue: 0 },
  review_count: { type: DataTypes.INTEGER, defaultValue: 0 },
  photo_url: { type: DataTypes.STRING(500), allowNull: true },
  is_verified: { type: DataTypes.BOOLEAN, defaultValue: false },
  is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  tableName: 'locations',
  timestamps: false
})

Provider.hasMany(Location, { foreignKey: 'provider_id' })
Location.belongsTo(Provider, { foreignKey: 'provider_id' })

export default Location
