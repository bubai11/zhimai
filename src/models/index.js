// src/models/index.js
const User = require('./User');
const { Activity } = require('./Activity');
const { Favorite } = require('./Favorite');
const Admin = require('./admin');
const AdminToken = require('./adminToken');
// const SystemLog = require('./SystemLog');

// 活动和收藏的关联
Activity.hasMany(Favorite, {
    foreignKey: 'activity_id',
    sourceKey: 'activity_id'
});

Favorite.belongsTo(Activity, {
    foreignKey: 'activity_id',
    targetKey: 'activity_id'
});

// 用户和收藏的关联
User.hasMany(Favorite, {
    foreignKey: 'user_id',
    sourceKey: 'id'
});

Favorite.belongsTo(User, {
    foreignKey: 'user_id',
    targetKey: 'id'
});

module.exports = {
    User,
    Activity,
    Favorite,
    Admin,
    AdminToken
};