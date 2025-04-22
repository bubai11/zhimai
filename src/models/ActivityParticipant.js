const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const { Activity } = require('./Activity');
const { User } = require('./User');

const ActivityParticipant = sequelize.define('ActivityParticipant', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: '参与记录ID'
    },
    activity_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Activity,
            key: 'activity_id'
        },
        comment: '活动ID'
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        },
        comment: '用户ID'
    },
    join_time: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        comment: '参加时间'
    },
    status: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: '已报名',
        comment: '参与状态（已报名/已签到/已完成等）'
    },
    check_in_time: {
        type: DataTypes.DATE,
        comment: '签到时间'
    },
    check_out_time: {
        type: DataTypes.DATE,
        comment: '签退时间'
    },
    feedback: {
        type: DataTypes.TEXT,
        comment: '活动反馈'
    },
    credit_status: {
        type: DataTypes.STRING(20),
        defaultValue: '未认定',
        comment: '学分认定状态（未认定/已认定/不予认定）'
    },
    credit_value: {
        type: DataTypes.DECIMAL(3, 1),
        comment: '获得学分值'
    }
}, {
    tableName: 'activity_participants',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
        {
            name: 'idx_activity_user',
            unique: true,
            fields: ['activity_id', 'user_id']
        },
        {
            name: 'idx_user_status',
            fields: ['user_id', 'status']
        }
    ]
});

// 建立关联关系
Activity.hasMany(ActivityParticipant, {
    foreignKey: 'activity_id',
    as: 'participants'
});

ActivityParticipant.belongsTo(Activity, {
    foreignKey: 'activity_id'
});

User.hasMany(ActivityParticipant, {
    foreignKey: 'user_id',
    as: 'participatedActivities'
});

ActivityParticipant.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = { ActivityParticipant }; 