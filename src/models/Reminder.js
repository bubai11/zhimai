const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Reminder = sequelize.define('Reminder', {
    reminder_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    activity_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'activities',
            key: 'activity_id'
        }
    },
    remind_start_time: {
        type: DataTypes.DATE,
        allowNull: true
    },
    remind_end_time: {
        type: DataTypes.DATE,
        allowNull: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: true
    },
    type: {
        type: DataTypes.ENUM(
            'activity_registration', 'activity_checkin', 'activity_start', 
            'activity_end', 'custom', 'system_notification'
        ),
        allowNull: false,
        defaultValue: 'activity_start',
        comment: '提醒类型：activity_registration-活动报名，activity_checkin-活动签到，activity_start-活动开始，activity_end-活动结束，custom-自定义，system_notification-系统通知'
    },
    sent: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: '是否已发送'
    },
    sent_at: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: '发送时间'
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: '提醒描述'
    },
    checkin_time: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: '签到时间（用于签到提醒）'
    },
    advance_minutes: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: '提前提醒分钟数'
    }
}, {
    tableName: 'reminders',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
    paranoid: true,  // 启用软删除
    deletedAt: 'deleted_at'
});

module.exports = Reminder; 