const Redis = require('ioredis');
const logger = require('../utils/logger');

const redisEnabled = process.env.REDIS_ENABLED === 'true';

let redis = null;

if (redisEnabled) {
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
    redis = new Redis(redisConfig);

    redis.on('connect', () => {
        logger.info('Redis 连接成功');
    });

    redis.on('error', (error) => {
        logger.error('Redis 连接错误:', error);
    });
} else {
    logger.info('Redis 已禁用，相关缓存操作将跳过');
}

// 封装 Redis 操作
class RedisService {
    static async set(key, value, ttl = 3600) {
        if (!redisEnabled) return; // Redis禁用直接返回

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

    static async get(key) {
        if (!redisEnabled) return null;

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

    static async del(key) {
        if (!redisEnabled) return;

        try {
            await redis.del(key);
        } catch (error) {
            logger.error('Redis 删除缓存失败:', error);
            throw error;
        }
    }

    static async hset(key, field, value) {
        if (!redisEnabled) return;

        try {
            const stringValue = typeof value === 'object' ? JSON.stringify(value) : value;
            await redis.hset(key, field, stringValue);
        } catch (error) {
            logger.error('Redis 设置哈希表失败:', error);
            throw error;
        }
    }

    static async hget(key, field) {
        if (!redisEnabled) return null;

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

    static async incr(key, ttl = 60) {
        if (!redisEnabled) return 0;

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
