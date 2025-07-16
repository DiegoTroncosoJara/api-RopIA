import { DataTypes } from 'sequelize'
import sequelize from '../../db/connection.js'
import Community from './community.model.js'
import User from '../user/user.model.js'

const CommunityMember = sequelize.define('CommunityMember', {
  id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
  community_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'communities', key: 'id' } },
  user_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'users', key: 'id' } },
  role: { type: DataTypes.ENUM('member','moderator','admin'), defaultValue: 'member' },
  joined_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  is_active: { type: DataTypes.BOOLEAN, defaultValue: true }
}, {
  tableName: 'community_members',
  timestamps: false
})

Community.hasMany(CommunityMember, { foreignKey: 'community_id' })
CommunityMember.belongsTo(Community, { foreignKey: 'community_id' })
User.hasMany(CommunityMember, { foreignKey: 'user_id' })
CommunityMember.belongsTo(User, { foreignKey: 'user_id' })

export default CommunityMember
