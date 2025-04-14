const jwt = require('jsonwebtoken');
const config = require('../config');
const logger = require('../utils/logger');

/**
 * 从请求头或查询参数中获取 token
 * @param {Object} req 请求对象
 * @returns {string|null} token
 */
const extractToken = (req) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const [bearer, token] = authHeader.split(' ');
        if (bearer === 'Bearer' && token) {
            return token;
        }
    }
    return req.query.token || null;
};

/**
 * 验证 JWT Token 的中间件
 */
const verifyToken = async (req, res, next) => {
    try {
        const token = extractToken(req);

        if (!token) {
            return res.status(401).json({
                code: 401,
                message: '未提供访问令牌',
                data: null
            });
        }

        // 只验证 JWT 的有效性
        const decoded = jwt.verify(token, config.JWT_SECRET);
        
        // 将 token 和解码后的信息添加到请求对象
        req.token = token;
        req.tokenData = decoded;
        
        next();
    } catch (error) {
        logger.error('Token验证失败:', error);
        return res.status(401).json({
            code: 401,
            message: '无效的访问令牌',
            data: null
        });
    }
};

/**
 * 验证管理员权限的中间件
 */
const verifyAdmin = [
    verifyToken,
    (req, res, next) => {
        if (req.tokenData && req.tokenData.role === 'admin') {
            next();
        } else {
            return res.status(403).json({
                code: 403,
                message: '需要管理员权限',
                data: null
            });
        }
    }
];

/**
 * 验证教师权限的中间件
 */
const verifyTeacher = [
    verifyToken,
    (req, res, next) => {
        if (req.tokenData && (req.tokenData.role === 'teacher' || req.tokenData.role === 'admin')) {
            next();
        } else {
            return res.status(403).json({
                code: 403,
                message: '需要教师权限',
                data: null
            });
        }
    }
];

/**
 * 验证学生权限的中间件
 */
const verifyStudent = [
    verifyToken,
    (req, res, next) => {
        if (req.tokenData && (req.tokenData.role === 'student' || req.tokenData.role === 'admin')) {
            next();
        } else {
            return res.status(403).json({
                code: 403,
                message: '需要学生权限',
                data: null
            });
        }
    }
];

/**
 * 验证用户是否有权限访问特定资源
 * @param {string} userId - 资源所属用户ID
 */
const verifyResourceOwner = (userId) => [
    verifyToken,
    (req, res, next) => {
        if (req.tokenData && (req.tokenData.id === userId || req.tokenData.role === 'admin')) {
            next();
        } else {
            return res.status(403).json({
                code: 403,
                message: '无权访问此资源',
                data: null
            });
        }
    }
];

module.exports = {
    verifyToken,
    verifyAdmin,
    verifyTeacher,
    verifyStudent,
    verifyResourceOwner,
    extractToken
}; 