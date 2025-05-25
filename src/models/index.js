// src/models/index.js
const User = require('./User');
const { Activity } = require('./Activity');
const { ActivityParticipant } = require('./ActivityParticipant');
const { Favorite } = require('./Favorite');
const Admin = require('./admin');
const AdminToken = require('./adminToken');
// const SystemLog = require('./SystemLog');

// 活动和参与者的关联
Activity.hasMany(ActivityParticipant, {
    foreignKey: 'activity_id',
    sourceKey: 'activity_id'
});

ActivityParticipant.belongsTo(Activity, {
    foreignKey: 'activity_id',
    targetKey: 'activity_id'
});

// 用户和参与记录的关联
User.hasMany(ActivityParticipant, {
    foreignKey: 'user_id',
    sourceKey: 'id'
});

ActivityParticipant.belongsTo(User, {
    foreignKey: 'user_id',
    targetKey: 'id'
});

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
    ActivityParticipant,
    Favorite,
    Admin,
    AdminToken
};