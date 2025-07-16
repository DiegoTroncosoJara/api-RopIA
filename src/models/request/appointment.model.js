import { DataTypes } from 'sequelize'
import sequelize from '../../db/connection.js'
import Request from './request.model.js'
import Provider from '../provider/provider.model.js'
import User from '../user/user.model.js'

const Appointment = sequelize.define('Appointment', {
  id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
  request_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'requests', key: 'id' } },
  provider_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'providers', key: 'id' } },
  user_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'users', key: 'id' } },
  appointment_date: { type: DataTypes.DATE, allowNull: false },
  start_time: { type: DataTypes.TIME, allowNull: false },
  end_time: { type: DataTypes.TIME, allowNull: false },
  status: { type: DataTypes.ENUM('scheduled','confirmed','in_progress','completed','cancelled','no_show'), defaultValue: 'scheduled' },
  notes: { type: DataTypes.TEXT, allowNull: true },
  reminder_sent: { type: DataTypes.BOOLEAN, defaultValue: false },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  tableName: 'appointments',
  timestamps: false
})

Request.hasMany(Appointment, { foreignKey: 'request_id' })
Provider.hasMany(Appointment, { foreignKey: 'provider_id' })
User.hasMany(Appointment, { foreignKey: 'user_id' })
Appointment.belongsTo(Request, { foreignKey: 'request_id' })
Appointment.belongsTo(Provider, { foreignKey: 'provider_id' })
Appointment.belongsTo(User, { foreignKey: 'user_id' })

export default Appointment
