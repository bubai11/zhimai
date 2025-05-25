// const express = require('express');
// const router = express.Router();
// const activityController = require('../controllers/activityController');
// const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');

// // 所有路由都需要验证token
// router.use(verifyToken);

// // 用户活动路由
// router.get('/activities', activityController.getAllActivities);
// router.get('/activities/:id', activityController.getActivityById);
// router.get('/activities/my', activityController.getMyActivities);
// router.post('/activities/:id/join', activityController.joinActivity);
// router.post('/activities/:id/leave', activityController.leaveActivity);

// // 管理员活动路由 - 需要管理员权限
// const adminActivityRoutes = express.Router();

// adminActivityRoutes.use(verifyAdmin); // 添加权限校验

// adminActivityRoutes.get('/activities', activityController.getAdminActivities);
// adminActivityRoutes.post('/activities', activityController.createActivity);
// adminActivityRoutes.get('/activities/:id', activityController.getAdminActivityById);
// adminActivityRoutes.put('/activities/:id', activityController.updateActivity);
// adminActivityRoutes.put('/activities/:id/status', activityController.updateActivityStatus);
// adminActivityRoutes.delete('/activities/:id', activityController.deleteActivity);

// // 然后统一挂载
// router.use('/admin', adminActivityRoutes);

// module.exports = router;
