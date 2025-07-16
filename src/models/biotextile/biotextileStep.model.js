import { DataTypes } from 'sequelize'
import sequelize from '../../db/connection.js'
import Biotextile from './biotextile.model.js'

const BiotextileStep = sequelize.define('BiotextileStep', {
  id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
  biotextile_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'biotextiles', key: 'id' } },
  step_number: { type: DataTypes.INTEGER, allowNull: false },
  title: { type: DataTypes.STRING(255), allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  duration_minutes: { type: DataTypes.INTEGER, allowNull: true },
  temperature: { type: DataTypes.STRING(50), allowNull: true },
  photo_url: { type: DataTypes.STRING(500), allowNull: true },
  tips: { type: DataTypes.TEXT, allowNull: true }
}, {
  tableName: 'biotextile_steps',
  timestamps: false
})

Biotextile.hasMany(BiotextileStep, { foreignKey: 'biotextile_id' })
BiotextileStep.belongsTo(Biotextile, { foreignKey: 'biotextile_id' })

export default BiotextileStep
