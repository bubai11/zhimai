const adminService = require('../services/adminService');
const { Response } = require('../utils/response');
const logger = require('../utils/logger');

/**
 * 验证管理员 token 的中间件
 */
const verifyAdminToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json(Response.unauthorized('未提供token'));
        }

        const token = authHeader.split(' ')[1];
        
        // 使用 adminService 的 verifyToken 方法进行验证（包含滑动过期机制）
        const { admin, newToken } = await adminService.verifyToken(token, {
            userAgent: req.get('user-agent'),
            ipAddress: req.ip
        });
        
        // 将管理员信息添加到请求对象
        req.admin = admin;
        
        // 如果生成了新token，在响应头中返回
        if (newToken) {
            res.setHeader('X-New-Token', newToken);
        }
        
        next();
    } catch (error) {
        logger.error('管理员Token验证失败:', error);
        res.status(401).json(Response.unauthorized('无效的token'));
    }
};

/**
 * 验证超级管理员权限
 */
const verifySuperAdmin = [
    verifyAdminToken,
    (req, res, next) => {
        if (req.admin && req.admin.role === 'super_admin') {
            next();
        } else {
            return res.status(403).json(Response.forbidden('需要超级管理员权限'));
        }
    }
];

/**
 * 验证管理员权限
 * @param {Array} roles 允许的角色列表
 */
const checkAdminRole = (roles = ['admin', 'super_admin']) => [
    verifyAdminToken,
    (req, res, next) => {
        if (!req.admin) {
            return res.status(401).json(Response.unauthorized('未经过身份验证'));
        }

        if (roles.length && !roles.includes(req.admin.role)) {
            return res.status(403).json(Response.forbidden('没有足够的权限'));
        }

        next();
    }
];

module.exports = {
    verifyAdminToken,
    verifySuperAdmin,
    checkAdminRole
}; 