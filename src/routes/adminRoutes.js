const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { verifyAdmin } = require('../middleware/authMiddleware');

// 管理员登录（不需要验证）
router.post('/login', adminController.login);

// 所有其他路由都需要管理员权限
router.use(verifyAdmin);

// 用户管理
router.get('/users', adminController.getAllUsers);
router.get('/users/:id', adminController.getUserById);
router.put('/users/:id', adminController.updateUser);
router.delete('/users/:id', adminController.deleteUser);

// 角色管理
// router.get('/roles', adminController.getRoleList);
// router.get('/permissions', adminController.getPermissionList);
// router.put('/roles/:roleId/permissions', adminController.updateRolePermissions);

// 系统管理
router.get('/system/stats', adminController.getSystemStats);
router.post('/system/backup', adminController.backupDatabase);
//router.get('/system/logs', adminController.getSystemLogs);

module.exports = router; 