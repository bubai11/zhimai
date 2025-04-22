const jwt = require('jsonwebtoken');
const config = require('../config');
const { Response } = require('../utils/response');
const logger = require('../utils/logger');
const userService = require('../services/userService');

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
 * 验证用户 JWT Token 的中间件
 */
const verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json(Response.unauthorized('未提供token'));
        }

        const token = authHeader.split(' ')[1];
        
        // 使用 userService 的 verifyToken 方法进行验证
        const { user } = await userService.verifyToken(token);
        
        // 将用户信息添加到请求对象
        req.user = user;
        
        next();
    } catch (error) {
        logger.error('Token验证失败:', error);
        res.status(401).json(Response.unauthorized('无效的token'));
    }
};

/**
 * 验证用户是否有权限访问特定资源
 * @param {string} userId - 资源所属用户ID
 */
const verifyResourceOwner = (userId) => [
    verifyToken,
    (req, res, next) => {
        if (req.user && req.user.id === userId) {
            next();
        } else {
            return res.status(403).json(Response.forbidden('无权访问此资源'));
        }
    }
];

module.exports = {
    verifyToken,
    verifyResourceOwner,
    extractToken
}; 