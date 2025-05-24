const Redis = require('ioredis');
const logger = require('../utils/logger');

// Redis 配置
const redisConfig = {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
    password: process.env.REDIS_PASSWORD,
    db: process.env.REDIS_DB || 0,
    retryStrategy: (times) => {
        const delay = Math.min(times * 50, 2000);
        return delay;
    }
};

// 创建 Redis 客户端
const redis = new Redis(redisConfig);

// 监听连接事件
redis.on('connect', () => {
    logger.info('Redis 连接成功');
});

redis.on('error', (error) => {
    logger.error('Redis 连接错误:', error);
});

// 封装常用的缓存操作
class RedisService {
    /**
     * 设置缓存
     * @param {string} key 键
     * @param {string|object} value 值
     * @param {number} ttl 过期时间（秒）
     */
    static async set(key, value, ttl = 3600) {
        try {
            const stringValue = typeof value === 'object' ? JSON.stringify(value) : value;
            if (ttl > 0) {
                await redis.setex(key, ttl, stringValue);
            } else {
                await redis.set(key, stringValue);
            }
        } catch (error) {
            logger.error('Redis 设置缓存失败:', error);
            throw error;
        }
    }

    /**
     * 获取缓存
     * @param {string} key 键
     * @returns {Promise<any>} 缓存值
     */
    static async get(key) {
        try {
            const value = await redis.get(key);
            if (!value) return null;
            
            try {
                return JSON.parse(value);
            } catch {
                return value;
            }
        } catch (error) {
            logger.error('Redis 获取缓存失败:', error);
            throw error;
        }
    }

    /**
     * 删除缓存
     * @param {string} key 键
     */
    static async del(key) {
        try {
            await redis.del(key);
        } catch (error) {
            logger.error('Redis 删除缓存失败:', error);
            throw error;
        }
    }

    /**
     * 设置哈希表字段
     * @param {string} key 键
     * @param {string} field 字段
     * @param {string|object} value 值
     */
    static async hset(key, field, value) {
        try {
            const stringValue = typeof value === 'object' ? JSON.stringify(value) : value;
            await redis.hset(key, field, stringValue);
        } catch (error) {
            logger.error('Redis 设置哈希表失败:', error);
            throw error;
        }
    }

    /**
     * 获取哈希表字段
     * @param {string} key 键
     * @param {string} field 字段
     * @returns {Promise<any>} 字段值
     */
    static async hget(key, field) {
        try {
            const value = await redis.hget(key, field);
            if (!value) return null;
            
            try {
                return JSON.parse(value);
            } catch {
                return value;
            }
        } catch (error) {
            logger.error('Redis 获取哈希表失败:', error);
            throw error;
        }
    }

    /**
     * 设置计数器
     * @param {string} key 键
     * @param {number} ttl 过期时间（秒）
     * @returns {Promise<number>} 计数值
     */
    static async incr(key, ttl = 60) {
        try {
            const count = await redis.incr(key);
            if (count === 1 && ttl > 0) {
                await redis.expire(key, ttl);
            }
            return count;
        } catch (error) {
            logger.error('Redis 计数器操作失败:', error);
            throw error;
        }
    }
}

module.exports = RedisService; 