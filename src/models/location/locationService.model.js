import { DataTypes } from 'sequelize'
import sequelize from '../../db/connection.js'
import Location from './location.model.js'

const LocationService = sequelize.define('LocationService', {
  id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
  location_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'locations', key: 'id' } },
  service_type: { type: DataTypes.ENUM('donate','repair','transform','recycle','buy','sell'), allowNull: false },
  name: { type: DataTypes.STRING(255), allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: true },
  price_info: { type: DataTypes.STRING(255), allowNull: true },
  is_available: { type: DataTypes.BOOLEAN, defaultValue: true }
}, {
  tableName: 'location_services',
  timestamps: false
})

Location.hasMany(LocationService, { foreignKey: 'location_id' })
LocationService.belongsTo(Location, { foreignKey: 'location_id' })

export default LocationService
