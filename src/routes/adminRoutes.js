const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { verifySuperAdmin, checkAdminRole } = require('../middleware/adminAuthMiddleware');
const scheduler = require('../utils/scheduler');
const { Response } = require('../utils/response');

// =====================
// 公开路由 - 无需验证
// =====================
router.post('/login', adminController.login);
router.post('/initialize-super-admin', adminController.initializeSuperAdmin);

// =====================
// 超级管理员路由 - 需要超级管理员权限
// =====================

// 管理员管理
router.get('/admins', verifySuperAdmin, adminController.getAdminList);
router.post('/admins', verifySuperAdmin, adminController.createAdmin);
router.get('/admins/:id', verifySuperAdmin, adminController.getAdminById);
router.put('/admins/:id', verifySuperAdmin, adminController.updateAdmin);
router.delete('/admins/:id', verifySuperAdmin, adminController.deleteAdmin);
router.post('/admins/:id/restore', verifySuperAdmin, adminController.restoreAdmin);
router.post('/admins/:id/reset-password', verifySuperAdmin, adminController.resetAdminPassword);

// 系统管理
router.post('/backup', verifySuperAdmin, adminController.backupDatabase);
router.get('/system-logs', verifySuperAdmin, adminController.getSystemLogs);

// 手动触发清理过期token
router.post('/clean-expired-tokens', verifySuperAdmin, async (req, res) => {
    try {
        try {
            await scheduler.triggerJob('cleanExpiredTokens');
            res.json(Response.success('清理任务已通过调度器触发'));
        } catch (schedulerError) {
            const count = await adminController.cleanExpiredTokens();
            res.json(Response.success(`手动清理完成，共清理 ${count} 个token`));
        }
    } catch (error) {
        res.status(500).json(Response.error(error.message));
    }
});

// =====================
// 基础管理员路由 - 需要管理员权限
// =====================

// 添加基础管理员权限中间件
const basicAdminRoutes = express.Router();
basicAdminRoutes.use(checkAdminRole(['admin', 'super_admin']));

// 个人相关
basicAdminRoutes.post('/logout', adminController.logout);
basicAdminRoutes.get('/profile', adminController.getProfile);
basicAdminRoutes.put('/profile', adminController.updateProfile);
basicAdminRoutes.put('/change-password', adminController.changePassword);

// 基础功能
basicAdminRoutes.get('/stats', adminController.getSystemStats);

// // 活动管理
// basicAdminRoutes.get('/activities', adminController.getActivities);
// basicAdminRoutes.get('/activities/:id', adminController.getActivityById);
// basicAdminRoutes.put('/activities/:id/status', adminController.updateActivityStatus);

// 将基础路由添加到主路由
router.use('/', basicAdminRoutes);

module.exports = router; 