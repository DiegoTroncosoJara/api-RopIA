import { DataTypes } from 'sequelize'
import sequelize from '../../db/connection.js'
import Provider from './provider.model.js'

const ProviderStat = sequelize.define('ProviderStat', {
  id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
  provider_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'providers', key: 'id' }, unique: true },
  total_jobs: { type: DataTypes.INTEGER, defaultValue: 0 },
  completed_jobs: { type: DataTypes.INTEGER, defaultValue: 0 },
  cancelled_jobs: { type: DataTypes.INTEGER, defaultValue: 0 },
  average_rating: { type: DataTypes.DECIMAL(3,2), defaultValue: 0 },
  total_reviews: { type: DataTypes.INTEGER, defaultValue: 0 },
  total_earnings: { type: DataTypes.DECIMAL(10,2), defaultValue: 0 },
  response_time_hours: { type: DataTypes.INTEGER, defaultValue: 24 },
  profile_views: { type: DataTypes.INTEGER, defaultValue: 0 },
  last_updated: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  tableName: 'provider_stats',
  timestamps: false
})

Provider.hasOne(ProviderStat, { foreignKey: 'provider_id' })
ProviderStat.belongsTo(Provider, { foreignKey: 'provider_id' })

export default ProviderStat
