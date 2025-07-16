import { DataTypes } from 'sequelize'
import sequelize from '../../db/connection.js'
import Provider from '../provider/provider.model.js'
import Request from '../request/request.model.js'

const PortfolioItem = sequelize.define('PortfolioItem', {
  id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
  provider_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'providers', key: 'id' } },
  request_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: true, references: { model: 'requests', key: 'id' } },
  title: { type: DataTypes.STRING(255), allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: true },
  category: { type: DataTypes.STRING(100), allowNull: true },
  before_photo_url: { type: DataTypes.STRING(500), allowNull: true },
  after_photo_url: { type: DataTypes.STRING(500), allowNull: false },
  additional_photos: { type: DataTypes.JSON, allowNull: true },
  materials_used: { type: DataTypes.TEXT, allowNull: true },
  time_taken_hours: { type: DataTypes.INTEGER, allowNull: true },
  difficulty_level: { type: DataTypes.ENUM('easy','medium','hard'), allowNull: true },
  is_featured: { type: DataTypes.BOOLEAN, defaultValue: false },
  is_public: { type: DataTypes.BOOLEAN, defaultValue: true },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  tableName: 'portfolio_items',
  timestamps: false
})

Provider.hasMany(PortfolioItem, { foreignKey: 'provider_id' })
PortfolioItem.belongsTo(Provider, { foreignKey: 'provider_id' })
Request.hasMany(PortfolioItem, { foreignKey: 'request_id' })
PortfolioItem.belongsTo(Request, { foreignKey: 'request_id' })

export default PortfolioItem
