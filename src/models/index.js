// src/models/index.js
const User = require('./User');
const { Activity } = require('./Activity');
const { ActivityParticipant } = require('./ActivityParticipant');
const Admin = require('./admin');
const AdminToken = require('./adminToken');
// const SystemLog = require('./SystemLog');

module.exports = {
    User,
    Activity,
    ActivityParticipant,
    Admin,
    AdminToken
};