import { DataTypes } from 'sequelize'
import sequelize from '../../db/connection.js'
import Request from './request.model.js'
import User from '../user/user.model.js'

const Review = sequelize.define('Review', {
  id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
  request_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'requests', key: 'id' } },
  reviewer_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'users', key: 'id' } },
  reviewed_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'users', key: 'id' } },
  rating: { type: DataTypes.TINYINT, allowNull: false },
  title: { type: DataTypes.STRING(255), allowNull: true },
  comment: { type: DataTypes.TEXT, allowNull: true },
  is_anonymous: { type: DataTypes.BOOLEAN, defaultValue: false },
  is_verified: { type: DataTypes.BOOLEAN, defaultValue: false },
  helpful_count: { type: DataTypes.INTEGER, defaultValue: 0 },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  tableName: 'reviews',
  timestamps: false
})

Request.hasMany(Review, { foreignKey: 'request_id' })
Review.belongsTo(Request, { foreignKey: 'request_id' })
User.hasMany(Review, { foreignKey: 'reviewer_id' })
Review.belongsTo(User, { as: 'reviewer', foreignKey: 'reviewer_id' })
Review.belongsTo(User, { as: 'reviewed', foreignKey: 'reviewed_id' })

export default Review
