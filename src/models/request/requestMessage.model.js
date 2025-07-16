import { DataTypes } from 'sequelize'
import sequelize from '../../db/connection.js'
import Request from './request.model.js'
import User from '../user/user.model.js'

const RequestMessage = sequelize.define('RequestMessage', {
  id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
  request_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'requests', key: 'id' } },
  sender_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'users', key: 'id' } },
  message: { type: DataTypes.TEXT, allowNull: false },
  is_read: { type: DataTypes.BOOLEAN, defaultValue: false },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  tableName: 'request_messages',
  timestamps: false
})

Request.hasMany(RequestMessage, { foreignKey: 'request_id' })
RequestMessage.belongsTo(Request, { foreignKey: 'request_id' })
User.hasMany(RequestMessage, { foreignKey: 'sender_id' })
RequestMessage.belongsTo(User, { foreignKey: 'sender_id' })

export default RequestMessage
