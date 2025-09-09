const express = require('express');
const router = express.Router();

const activityRoutes = require('./activityRoutes');
const userRoutes = require('./userRoutes');
const reminderRoutes = require('./reminderRoutes');

router.use('/activities', activityRoutes);
router.use('/users', userRoutes);
router.use('/reminders', reminderRoutes);

module.exports = router;