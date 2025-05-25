const RedisService = require('../config/redis');
const { Response } = require('../utils/response');
const logger = require('../utils/logger');

/**
 * 创建限流中间件
 * @param {Object} options 配置选项
 * @param {number} options.maxRequests 最大请求次数
 * @param {number} options.windowMs 时间窗口（毫秒）
 * @returns {Function} 中间件函数
 */
const createRateLimiter = (options = {}) => {
    const {
        maxRequests = 100,    // 默认每个时间窗口最多 100 次请求
        windowMs = 60000      // 默认时间窗口为 1 分钟
    } = options;

    return async (req, res, next) => {
        try {
            const key = `ratelimit:${req.ip}`;
            const requests = await RedisService.incr(key, windowMs / 1000);

            // 设置响应头
            res.setHeader('X-RateLimit-Limit', maxRequests);
            res.setHeader('X-RateLimit-Remaining', Math.max(0, maxRequests - requests));

            if (requests > maxRequests) {
                logger.warn(`IP ${req.ip} 请求过于频繁`);
                return res.status(429).json(Response.error('请求过于频繁，请稍后再试'));
            }

            next();
        } catch (error) {
            logger.error('限流中间件错误:', error);
            next();  // 如果 Redis 出错，允许请求通过
        }
    };
};

module.exports = createRateLimiter; 