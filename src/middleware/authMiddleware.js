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
    logger.info('Authorization头:', { authHeader });
    
    if (authHeader) {
        const [bearer, token] = authHeader.split(' ');
        logger.info('Token解析:', { bearer, tokenPrefix: token ? token.substring(0, 20) + '...' : null });
        
        if (bearer === 'Bearer' && token) {
            return token;
        }
    }
    
    // 尝试从查询参数获取token
    const queryToken = req.query.token;
    logger.info('Query token:', { queryToken: queryToken ? queryToken.substring(0, 20) + '...' : null });
    
    return queryToken || null;
};

/**
 * 验证用户 JWT Token 的中间件
 */
const verifyToken = async (req, res, next) => {
    try {
        logger.info('请求头:', { headers: req.headers });
        const token = extractToken(req);
        
        if (!token) {
            logger.warn('未提供token');
            res.status(401).json(Response.unauthorized('请先登录'));
            return;
        }

        try {
            // 验证token
            const decoded = jwt.verify(token, config.JWT_SECRET);
            logger.info('token解析结果:', { userId: decoded.id, role: decoded.role });

            // 验证用户是否存在
            const user = await userService.verifyToken(token);
            logger.info('用户验证成功:', { userId: user.id, role: user.role });
            
            // 将用户信息添加到请求对象
            req.user = user;
            
            next();
        } catch (jwtError) {
            logger.error('JWT验证失败:', jwtError);
            if (jwtError.name === 'TokenExpiredError') {
                res.status(401).json(Response.unauthorized('登录已过期，请重新登录'));
            } else {
                res.status(401).json(Response.unauthorized('无效的登录凭证'));
            }
            return;
        }
    } catch (error) {
        logger.error('Token验证失败:', error);
        res.status(401).json(Response.unauthorized('请先登录'));
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
            res.status(403).json(Response.forbidden('无权访问此资源'));
        }
    }
];

module.exports = {
    verifyToken,
    verifyResourceOwner,
    extractToken
}; 