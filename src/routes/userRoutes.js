//定义用户相关的路由
const express = require('express');
const User = require('../models/User');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const querystring = require("querystring");
const {sign} = require("jsonwebtoken");
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/auth');
const { checkRole, checkPermission } = require('../middlewares/checkRole');
const { ROLES } = require('../constants/roles');

const router = express.Router();

// 微信小程序登录路由
router.post('/login', userController.wxLogin);

// 获取用户信息
router.get('/user/:openId', authMiddleware, userController.getUserInfo);

// 更新用户信息
router.put('/user/:openId', 
    authMiddleware, 
    // checkPermission(['manage_own_profile']), 
    userController.updateUserInfo
);

// 管理员路由
router.get('/roles', 
    authMiddleware, 
    checkRole([ROLES.ADMIN, ROLES.MODERATOR]), 
    userController.getRoles
);

router.put('/user/:openId/role', 
    authMiddleware, 
    checkRole([ROLES.ADMIN]), 
    checkPermission(['manage_roles']), 
    userController.updateUserRole
);

router.get('/users', 
    authMiddleware, 
    checkRole([ROLES.ADMIN, ROLES.MODERATOR]), 
    checkPermission(['manage_users']), 
    userController.getUserList
);

// 更新用户状态
router.put('/user/:openId/status',
    authMiddleware,
    checkRole([ROLES.ADMIN]),
    checkPermission(['manage_users']),
    userController.updateUserStatus
);

module.exports = router;
// app.get('/login', async(req, res) => {
//     if (!req.query.code) {
//         return res.status(400).send('Missing code parameter');
//     }
//     // res.send("hello world "+req.query.code);
//     const data = {
//         'appid': APPID,
//         'secret': APPSECRET,
//         'js_code': req.query.code,
//         // 'grant_type': 'authorization_code'
//     };
//     const queryString = querystring.stringify(data);
//     // 微信服务器接口地址
//     const wxLoginUrl = `https://api.weixin.qq.com/sns/jscode2session?${queryString}`;
//     try {
//         const wxRes = await axios.get(wxLoginUrl);//wxRes:微信api响应结果
//         const { openid, session_key } = wxRes.data;
//
//         // 在数据库中查询用户是否存在，如果不存在则创建新用户
//         // 这里假设你有一个数据库模型User，用于存储用户信息
//         let user = await User.findOne({ openid });
//         if (!user) {
//             user = new User({
//                 openid,
//                 // 其他用户信息，如昵称、头像等，可以从userInfo中获取并存储
//                 nickname: userInfo.nickName,
//                 avatarUrl: userInfo.avatarUrl,
//                 // ...其他字段
//             });
//             await user.save();
//         }
//
//         // 生成自定义登录态token（这里使用简单的JWT作为示例）
//         const token = sign({ openid }, 'YOUR_SECRET_KEY', { expiresIn: '1h' });
//
//         // 返回token给用户
//         res.json({
//             success: true,
//             token,
//             // 可以返回其他用户信息，如昵称、头像等
//             userInfo: {
//                 nickname: user.nickname,
//                 avatarUrl: user.avatarUrl,
//                 // ...其他字段
//             }
//         });
//     } catch (error) {
//         console.error('登录失败', error);
//         res.json({ success: false, message: '登录失败，请稍后再试。' });
//     }
// });
// // 获取所有用户
// router.get('/', async (req, res) => {
//     try {
//         const users = await User.find();
//         res.json(users);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });
//
// // 添加新用户
// router.post('/', async (req, res) => {
//     const { name, age } = req.body;
//     const newUser = new User({ name, age });
//
//     try {
//         const savedUser = await newUser.save();
//         res.json(savedUser);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// });

