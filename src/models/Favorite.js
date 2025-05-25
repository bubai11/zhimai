const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Favorite = sequelize.define('Favorite', {
    favorite_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: '收藏记录ID'
    },
    activity_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '活动ID'
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '用户ID'
    },
    deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: '软删除时间'
    }
}, {
    tableName: 'favorites',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid: true,
    indexes: [
        {
            name: 'idx_activity_user',
            unique: true,
            fields: ['activity_id', 'user_id']
        }
    ]
});

module.exports = { Favorite }; 