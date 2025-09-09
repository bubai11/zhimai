const express = require('express');
const router = express.Router();
const reminderController = require('../controllers/reminderController');
const { verifyToken } = require('../middleware/authMiddleware');

// 所有提醒相关的路由都需要登录
router.use(verifyToken);

// 创建提醒
router.post('/', reminderController.createReminder);

// 获取用户的提醒列表
router.get('/', reminderController.getUserReminders);

// 删除提醒
router.delete('/:reminder_id', reminderController.deleteReminder);

// 获取可用的提醒类型
router.get('/types', reminderController.getReminderTypes);

// 创建活动开始提醒
router.post('/activity/start', reminderController.createActivityStartReminder);

// 创建活动结束提醒
router.post('/activity/end', reminderController.createActivityEndReminder);

// 创建活动报名提醒
router.post('/activity/registration', reminderController.createActivityRegistrationReminder);

// 创建活动签到提醒
router.post('/activity/checkin', reminderController.createActivityCheckinReminder);

// 批量创建活动提醒（开始和结束）
router.post('/activity/batch', reminderController.createActivityReminders);

// 创建自定义提醒
router.post('/custom', reminderController.createCustomReminder);

// 手动发送提醒（测试用）
router.post('/:reminder_id/send', reminderController.sendTestReminder);

module.exports = router; 