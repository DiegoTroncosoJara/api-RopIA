import { DataTypes } from 'sequelize'
import sequelize from '../../db/connection.js'
import Event from './event.model.js'
import User from '../user/user.model.js'

const EventAttendee = sequelize.define('EventAttendee', {
  id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
  event_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'events', key: 'id' } },
  user_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'users', key: 'id' } },
  status: { type: DataTypes.ENUM('registered','confirmed','attended','no_show','cancelled'), defaultValue: 'registered' },
  registration_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  notes: { type: DataTypes.TEXT, allowNull: true }
}, {
  tableName: 'event_attendees',
  timestamps: false
})

Event.hasMany(EventAttendee, { foreignKey: 'event_id' })
EventAttendee.belongsTo(Event, { foreignKey: 'event_id' })
User.hasMany(EventAttendee, { foreignKey: 'user_id' })
EventAttendee.belongsTo(User, { foreignKey: 'user_id' })

export default EventAttendee
