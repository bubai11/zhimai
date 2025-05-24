//定义用户相关的路由
const express = require('express');
const userController = require('../controllers/userController');
const { verifyToken } = require('../middleware/authMiddleware');
const { verifyAdminToken, checkAdminRole } = require('../middleware/adminAuthMiddleware');

const router = express.Router();

// 公开接口
router.post('/wx-login', userController.wxLogin);

// 管理员接口（需要管理员token认证）
router.get('/users', verifyAdminToken, checkAdminRole(['admin', 'super_admin']), userController.getAllUsers);         // 获取所有用户
router.get('/users/list', verifyAdminToken, checkAdminRole(['admin', 'super_admin']), userController.getUserList);    // 获取用户列表（分页）
router.get('/users/:id', verifyAdminToken, checkAdminRole(['admin', 'super_admin']), userController.getUserById);     // 获取指定用户信息
// router.put('/users/:id/status', verifyAdminToken, checkAdminRole(['admin', 'super_admin']), userController.updateUserStatus);   // 更新用户状态
// router.put('/users/:id/role', verifyAdminToken, checkAdminRole(['admin', 'super_admin']), userController.updateUserRole);       // 更新用户角色

// 用户接口（需要用户token认证）
router.use(verifyToken);  // 应用用户认证中间件到以下所有路由

// 用户信息相关
router.get('/current', userController.getCurrentUser);     // 获取当前用户基本信息
router.get('/profile', userController.getUserProfile);     // 获取用户详细资料
router.put('/profile', userController.updateUserProfile);  // 更新用户详细资料

module.exports = router;

