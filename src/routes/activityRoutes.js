const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activityController');
const { verifyToken } = require('../middleware/authMiddleware');

// 所有路由都需要验证token
router.use(verifyToken);

// 活动管理路由
router.get('/activities', activityController.getAllActivities);
router.post('/activities', activityController.createActivity);
router.put('/activities/:id', activityController.updateActivity);
router.delete('/activities/:id', activityController.deleteActivity);

module.exports = router;
