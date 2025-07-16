import { DataTypes } from 'sequelize'
import sequelize from '../../db/connection.js'
import Provider from './provider.model.js'

const AvailabilityException = sequelize.define('AvailabilityException', {
  id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
  provider_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'providers', key: 'id' } },
  exception_date: { type: DataTypes.DATE, allowNull: false },
  is_available: { type: DataTypes.BOOLEAN, defaultValue: false },
  start_time: { type: DataTypes.TIME, allowNull: true },
  end_time: { type: DataTypes.TIME, allowNull: true },
  reason: { type: DataTypes.STRING(255), allowNull: true },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  tableName: 'availability_exceptions',
  timestamps: false
})

Provider.hasMany(AvailabilityException, { foreignKey: 'provider_id' })
AvailabilityException.belongsTo(Provider, { foreignKey: 'provider_id' })

export default AvailabilityException
