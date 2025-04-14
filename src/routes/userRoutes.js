//定义用户相关的路由
const express = require('express');
const User = require('../models/User');
const querystring = require("querystring");
const {sign} = require("jsonwebtoken");
const userController = require('../controllers/userController');
const { verifyToken } = require('../middleware/authMiddleware');
// const { checkRole, checkPermission } = require('../middleware/checkRole');
const { ROLES } = require('../constants/roles');
const adminController = require('../controllers/adminController');

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

module.exports = router;

