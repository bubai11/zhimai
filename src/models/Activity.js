const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Activity = sequelize.define('Activity', {
    activity_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: '活动唯一标识'
    },
    title: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: '活动标题'
    },
    start_time: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: '活动开始时间'
    },
    end_time: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: '活动结束时间'
    },
    location: {
        type: DataTypes.STRING(100),
        comment: '活动地点'
    },
    target_audience: {
        type: DataTypes.STRING(50),
        comment: '活动对象（院系/全校）'
    },
    organizer: {
        type: DataTypes.STRING(100),
        comment: '主办单位'
    },
    description: {
        type: DataTypes.TEXT,
        comment: '活动介绍'
    },
    activity_type: {
        type: DataTypes.STRING(50),
        comment: '活动类型（二课/综测/二课综测）'
    },
    credit_type: {
        type: DataTypes.STRING(50),
        comment: '活动板块（学分类型）'
    },
    participation_channel: {
        type: DataTypes.STRING(50),
        comment: '参与渠道（线上/线下/两者都有）'
    },
    image_url: {
        type: DataTypes.STRING(255),
        comment: '活动相关图片的URL'
    },
    link: {
        type: DataTypes.STRING(255),
        comment: '活动链接'
    },
    status: {
        type: DataTypes.ENUM('未开始', '进行中', '已结束'),
        defaultValue: '未开始',
        comment: '活动状态'
    },
    max_participants: {
        type: DataTypes.INTEGER,
        comment: '最大参与人数，NULL表示不限'
    },
    deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: '软删除时间'
    }
}, {
    tableName: 'activities',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid: true,
    indexes: [
        {
            name: 'idx_activity_type',
            fields: ['activity_type']
        },
        {
            name: 'idx_status',
            fields: ['status']
        },
        {
            name: 'idx_start_time',
            fields: ['start_time']
        }
    ]
});

module.exports = { Activity };
