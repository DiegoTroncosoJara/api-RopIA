import { DataTypes } from 'sequelize'
import sequelize from '../../db/connection.js'
import Biotextile from './biotextile.model.js'

const BiotextileProperty = sequelize.define('BiotextileProperty', {
  id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
  biotextile_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'biotextiles', key: 'id' } },
  property_type: { type: DataTypes.ENUM('physical','chemical','aesthetic','application'), allowNull: false },
  property_name: { type: DataTypes.STRING(255), allowNull: false },
  property_value: { type: DataTypes.STRING(255), allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: true }
}, {
  tableName: 'biotextile_properties',
  timestamps: false
})

Biotextile.hasMany(BiotextileProperty, { foreignKey: 'biotextile_id' })
BiotextileProperty.belongsTo(Biotextile, { foreignKey: 'biotextile_id' })

export default BiotextileProperty
