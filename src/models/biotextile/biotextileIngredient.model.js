import { DataTypes } from 'sequelize'
import sequelize from '../../db/connection.js'
import Biotextile from './biotextile.model.js'

const BiotextileIngredient = sequelize.define('BiotextileIngredient', {
  id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
  biotextile_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'biotextiles', key: 'id' } },
  name: { type: DataTypes.STRING(255), allowNull: false },
  quantity: { type: DataTypes.STRING(100), allowNull: false },
  unit: { type: DataTypes.STRING(50), allowNull: true },
  is_optional: { type: DataTypes.BOOLEAN, defaultValue: false },
  notes: { type: DataTypes.TEXT, allowNull: true },
  order_index: { type: DataTypes.INTEGER, defaultValue: 0 }
}, {
  tableName: 'biotextile_ingredients',
  timestamps: false
})

Biotextile.hasMany(BiotextileIngredient, { foreignKey: 'biotextile_id' })
BiotextileIngredient.belongsTo(Biotextile, { foreignKey: 'biotextile_id' })

export default BiotextileIngredient
