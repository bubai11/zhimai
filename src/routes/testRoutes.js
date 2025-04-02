const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middlewares/auth');
const { checkRole, checkPermission } = require('../middlewares/checkRole');
const { ROLES } = require('../constants/roles');

// 测试登录接口
router.post('/login-test', (req, res) => {
    try {
        const { username, role = 'user' } = req.body;
        
        // 生成测试用的token
        const token = jwt.sign(
            {
                id: 1,
                openId: 'test_openid_' + Date.now(),
                role: role,
                nickname: username
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({
            success: true,
            message: '测试登录成功',
            token,
            userInfo: {
                username,
                role
            }
        });
    } catch (error) {
        console.error('测试登录失败:', error);
        res.status(500).json({
            success: false,
            message: '测试登录失败'
        });
    }
});

// 公开测试接口
router.get('/public', (req, res) => {
    res.json({
        success: true,
        message: '这是一个公开的测试接口',
        timestamp: new Date()
    });
});

// 需要认证的测试接口
router.get('/auth-test', authMiddleware, (req, res) => {
    res.json({
        success: true,
        message: '认证成功',
        user: {
            id: req.user.id,
            openId: req.user.openId,
            role: req.user.role,
            nickname: req.user.nickname
        }
    });
});

// 测试不同角色的接口
router.get('/role-test', 
    authMiddleware,
    checkRole([ROLES.ADMIN, ROLES.MODERATOR]),
    (req, res) => {
        res.json({
            success: true,
            message: '角色验证成功',
            userRole: req.user.role,
            permissions: req.userPermissions
        });
    }
);

// 测试特定权限的接口
router.get('/permission-test',
    authMiddleware,
    checkPermission(['manage_users']),
    (req, res) => {
        res.json({
            success: true,
            message: '权限验证成功',
            permissions: req.userPermissions
        });
    }
);

module.exports = router; 