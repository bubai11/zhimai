const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Notice = sequelize.define('Notice', {
    notice_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: '通知ID'
    },
    title: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: '通知标题'
    },
    publish_time: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: '发布时间'
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: '通知内容'
    },
    publisher: {
        type: DataTypes.STRING(100),
        allowNull: true,
        comment: '发布者'
    },
    campus: {
        type: DataTypes.STRING(50),
        allowNull: true,
        comment: '校区'
    },
    grade_level: {
        type: DataTypes.STRING(50),
        allowNull: true,
        comment: '年级'
    },
    college: {
        type: DataTypes.STRING(100),
        allowNull: true,
        comment: '学院'
    },
    link: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: '相关链接'
    },
    notice_type: {
        type: DataTypes.STRING(50),
        allowNull: true,
        comment: '通知类型'
    },
    deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: '软删除时间'
    }
}, {
    tableName: 'notices',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    underscored: true,
    paranoid: true,  // 启用软删除
    deletedAt: 'deleted_at',  // 指定软删除字段
    comment: '通知信息表'
});

module.exports = Notice;
