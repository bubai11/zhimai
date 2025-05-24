//定义用户模型
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: '用户唯一标识'
    },
    openid: {
        field: 'open_id',
        type: DataTypes.STRING(64),
        unique: true,
        allowNull: false,
        comment: '微信openId'
    },
    unionid: {
        field: 'union_id',
        type: DataTypes.STRING(64),
        unique: true,
        allowNull: true,
        comment: '微信unionId'
    },
    nickname: {
        field: 'nickname',
        type: DataTypes.STRING(50),
        allowNull: true,
        comment: '用户昵称'
    },
    avatarUrl: {
        field: 'avatar_url',
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null,
        comment: '用户头像URL'
    },
    email: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: true,
        comment: '用户邮箱'
    },
    phone: {
        type: DataTypes.STRING(20),
        unique: true,
        allowNull: true,
        comment: '用户手机号'
    },
    campus: {
        type: DataTypes.STRING(50),
        allowNull: true,
        comment: '所在校区'
    },
    grade: {
        type: DataTypes.STRING(20),
        allowNull: true,
        comment: '年级'
    },
    major: {
        type: DataTypes.STRING(50),
        allowNull: true,
        comment: '专业'
    },
    role: {
        type: DataTypes.ENUM('user', 'student', 'teacher', 'moderator', 'admin'),
        defaultValue: 'user',
        allowNull: false,
        comment: '用户角色'
    },
    status: {
        type: DataTypes.ENUM('active', 'inactive', 'pending'),
        defaultValue: 'pending',
        allowNull: false,
        comment: '用户状态'
    },
    lastLoginAt: {
        field: 'last_login_at',
        type: DataTypes.DATE,
        allowNull: true,
        comment: '最后登录时间'
    }
}, {
    tableName: 'users',
    timestamps: true,
    paranoid: false,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = User;
