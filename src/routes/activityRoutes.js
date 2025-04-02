const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activityController');

// 获取活动列表
router.get('/activities', activityController.getActivities);

// 获取单个活动详情
router.get('/activities/:id', activityController.getActivityById);

// 创建新活动
router.post('/activities', activityController.createActivity);

// 更新活动信息
router.put('/activities/:id', activityController.updateActivity);

// 删除活动
router.delete('/activities/:id', activityController.deleteActivity);

module.exports = router;
