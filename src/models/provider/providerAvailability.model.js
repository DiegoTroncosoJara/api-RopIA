import { DataTypes } from 'sequelize'
import sequelize from '../../db/connection.js'
import Provider from './provider.model.js'

const ProviderAvailability = sequelize.define('ProviderAvailability', {
  id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
  provider_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'providers', key: 'id' } },
  day_of_week: { type: DataTypes.TINYINT, allowNull: false },
  start_time: { type: DataTypes.TIME, allowNull: false },
  end_time: { type: DataTypes.TIME, allowNull: false },
  is_available: { type: DataTypes.BOOLEAN, defaultValue: true },
  break_start: { type: DataTypes.TIME, allowNull: true },
  break_end: { type: DataTypes.TIME, allowNull: true },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  tableName: 'provider_availability',
  timestamps: false
})

Provider.hasMany(ProviderAvailability, { foreignKey: 'provider_id' })
ProviderAvailability.belongsTo(Provider, { foreignKey: 'provider_id' })

export default ProviderAvailability
