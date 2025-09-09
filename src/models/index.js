// src/models/index.js
const User = require('./User');
const { Activity } = require('./Activity');
const { Favorite } = require('./Favorite');
const Admin = require('./admin');
const AdminToken = require('./adminToken');
const Reminder = require('./Reminder');
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

// 活动和用户的收藏关系
Activity.belongsToMany(User, {
    through: Favorite,
    foreignKey: 'activity_id',
    otherKey: 'user_id'
});

User.belongsToMany(Activity, {
    through: Favorite,
    foreignKey: 'user_id',
    otherKey: 'activity_id'
});

// 活动提醒关联关系
Activity.hasMany(Reminder, {
    foreignKey: 'activity_id',
    as: 'reminders'
});

Reminder.belongsTo(Activity, {
    foreignKey: 'activity_id',
    as: 'activity'
});

User.hasMany(Reminder, {
    foreignKey: 'user_id',
    as: 'reminders'
});

Reminder.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user'
});

module.exports = {
    User,
    Activity,
    Favorite,
    Admin,
    AdminToken,
    Reminder
};