const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
    try {
        // 从请求头获取 token
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: '未提供认证token'
            });
        }

        // 验证 token 格式
        const parts = authHeader.split(' ');
        if (parts.length !== 2 || parts[0] !== 'Bearer') {
            return res.status(401).json({
                success: false,
                message: 'token格式错误'
            });
        }

        const token = parts[1];

        // 验证 token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // 检查用户是否存在
        const user = await User.findOne({ 
            where: { 
                id: decoded.userId,
                openId: decoded.openId 
            } 
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: '用户不存在或已被删除'
            });
        }

        // 检查用户状态
        if (user.status === 'inactive') {
            return res.status(403).json({
                success: false,
                message: '账户已被禁用'
            });
        }

        // 获取当前请求的路径和方法
        const path = req.path;
        const method = req.method;

        // 如果用户状态为 pending或者inactive
        if (user.status === 'pending' || user.status === 'inactive') {
            // 允许用户访问和更新自己的信息
            if (path.includes(`/user/${user.openId}`) && (method === 'GET' || method === 'PUT')) {
                // 允许访问
            } else {
                return res.status(403).json({
                    success: false,
                    message: '账户待激活'
                });
            }
        }

        // 将用户信息添加到请求对象
        req.user = {
            id: user.id,
            openId: user.openId,
            role: user.role,
            nickname: user.nickname,
            status: user.status
        };

        next();
    } catch (error) {
        console.error('Token验证失败:', error);
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'token已过期'
            });
        }
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                message: '无效的token'
            });
        }
        res.status(401).json({
            success: false,
            message: '认证失败'
        });
    }
};

module.exports = authMiddleware;
