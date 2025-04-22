const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Admin = require('./admin');

const AdminToken = sequelize.define('AdminToken', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    adminId: {
        field: 'admin_id',
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'admins',
            key: 'id'
        }
    },
    token: {
        type: DataTypes.STRING(500),
        allowNull: false,
        unique: true
    },
    userAgent: {
        type: DataTypes.STRING(500),
        allowNull: true,
        comment: '用户代理信息'
    },
    ipAddress: {
        type: DataTypes.STRING(50),
        allowNull: true,
        comment: 'IP地址'
    },
    expiresAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    lastUsedAt: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    tableName: 'admin_tokens',
    timestamps: true,
    paranoid: true, // 启用软删除
    indexes: [
        {
            name: 'admin_tokens_token_idx',
            unique: true,
            fields: ['token']
        },
        {
            name: 'admin_tokens_admin_id_idx',
            fields: ['admin_id']
        }
    ]
});

// 定义关联关系
AdminToken.belongsTo(Admin, {
    foreignKey: 'adminId', // 指定外键字段
    as: 'admin'            // 别名，用于在查询中引用
});

Admin.hasMany(AdminToken, {
    foreignKey: 'adminId', // 指定外键字段
    as: 'tokens'            // 别名，用于在查询中引用
});

module.exports = AdminToken;