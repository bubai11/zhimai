//定义用户相关的路由
const express = require('express');
const userController = require('../controllers/userController');
const { verifyToken } = require('../middleware/authMiddleware');
const { checkAdminRole } = require('../middleware/adminAuthMiddleware');

const router = express.Router();

// 公开路由
router.post('/wx-login', userController.wxLogin);
router.post('/refresh-token', userController.refreshToken);

// 需要登录的路由
router.use(verifyToken);

// 用户基本功能
router.get('/info', userController.getUserInfo);           // 获取当前用户信息
router.put('/profile', userController.updateUserInfo);     // 更新当前用户信息
router.post('/logout', userController.logout);             // 退出登录
router.delete('/account', userController.deleteAccount);   // 注销账号

// 所有用户管理路由都需要管理员权限
router.use(checkAdminRole(['admin', 'super_admin']));

// 获取所有用户列表
router.get('/users', userController.getAllUsers);

// 获取用户列表（分页）
router.get('/users/list', userController.getUserList);

// 获取单个用户信息
router.get('/users/:id', userController.getUserById);

// 更新用户信息
router.put('/users/:id', userController.updateUser);

// 删除用户
router.delete('/users/:id', userController.deleteUser);

module.exports = router;

