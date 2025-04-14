const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Tokens = sequelize.define('Tokens', {
    token_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users', // 直接引用表名
            key: 'id'
        }
    },
    token: {
        type: DataTypes.STRING(512), // 增加长度以适应 JWT
        allowNull: false,
        unique: true
    },
    expires_at: {
        type: DataTypes.DATE,
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'tokens',
    timestamps: true,
    underscored: true,
    indexes: [
        {
            unique: true,
            fields: ['token']
        },
        {
            fields: ['user_id']
        },
        {
            fields: ['expires_at']
        }
    ]
});

module.exports = Tokens;