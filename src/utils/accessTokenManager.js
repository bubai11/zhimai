// const axios = require('axios');
// const config = require('../config');
// const logger = require('./logger');
// const { redis } = require('./redis');

// class AccessTokenManager {
//     constructor() {
//         this.accessToken = null;
//         this.expiresAt = null;
//         this.isRefreshing = false;
//         this.subscribers = [];
        
//         // Redis key for access token
//         this.REDIS_KEY = 'global:access_token';
//         this.REDIS_EXPIRE_KEY = 'global:access_token_expires';
//     }

//     /**
//      * 初始化 access_token 管理器
//      */
//     async init() {
//         try {
//             // 尝试从 Redis 获取缓存的 token
//             const [cachedToken, cachedExpires] = await Promise.all([
//                 redis.get(this.REDIS_KEY),
//                 redis.get(this.REDIS_EXPIRE_KEY)
//             ]);

//             if (cachedToken && cachedExpires && Date.now() < parseInt(cachedExpires)) {
//                 this.accessToken = cachedToken;
//                 this.expiresAt = parseInt(cachedExpires);
//                 logger.info('Successfully loaded access_token from cache');
//             } else {
//                 // 如果没有缓存或已过期，重新获取
//                 await this.refreshAccessToken();
//             }

//             // 设置定时刷新
//             this.setupAutoRefresh();
//         } catch (error) {
//             logger.error('Failed to initialize access_token manager:', error);
//             throw error;
//         }
//     }

//     /**
//      * 获取 access_token
//      * @returns {Promise<string>} access_token
//      */
//     async getAccessToken() {
//         try {
//             // 如果 token 不存在或即将过期（5分钟内），刷新 token
//             if (!this.accessToken || Date.now() >= this.expiresAt - 5 * 60 * 1000) {
//                 return await this.refreshAccessToken();
//             }
//             return this.accessToken;
//         } catch (error) {
//             logger.error('Failed to get access_token:', error);
//             throw error;
//         }
//     }

//     /**
//      * 刷新 access_token
//      * @returns {Promise<string>} 新的 access_token
//      */
//     async refreshAccessToken() {
//         // 如果已经在刷新中，等待刷新完成
//         if (this.isRefreshing) {
//             return new Promise((resolve, reject) => {
//                 this.subscribers.push({ resolve, reject });
//             });
//         }

//         this.isRefreshing = true;

//         try {
//             const response = await axios.get(config.ACCESS_TOKEN_URL, {
//                 params: {
//                     grant_type: 'client_credential',
//                     appid: config.APP_ID,
//                     secret: config.APP_SECRET
//                 }
//             });

//             if (response.data.errcode) {
//                 throw new Error(`Failed to get access_token: ${response.data.errmsg}`);
//             }

//             const { access_token, expires_in } = response.data;
            
//             // 更新内存中的 token 和过期时间
//             this.accessToken = access_token;
//             this.expiresAt = Date.now() + (expires_in - 300) * 1000; // 提前5分钟过期

//             // 更新 Redis 缓存
//             await Promise.all([
//                 redis.set(this.REDIS_KEY, access_token),
//                 redis.set(this.REDIS_EXPIRE_KEY, this.expiresAt.toString()),
//                 redis.expire(this.REDIS_KEY, expires_in),
//                 redis.expire(this.REDIS_EXPIRE_KEY, expires_in)
//             ]);

//             // 通知所有等待的请求
//             this.subscribers.forEach(({ resolve }) => resolve(access_token));
//             this.subscribers = [];

//             logger.info('Successfully refreshed access_token');
//             return access_token;
//         } catch (error) {
//             // 通知所有等待的请求发生错误
//             this.subscribers.forEach(({ reject }) => reject(error));
//             this.subscribers = [];
            
//             logger.error('Failed to refresh access_token:', error);
//             throw error;
//         } finally {
//             this.isRefreshing = false;
//         }
//     }

//     /**
//      * 设置自动刷新
//      */
//     setupAutoRefresh() {
//         // 每小时检查一次是否需要刷新
//         setInterval(async () => {
//             try {
//                 if (Date.now() >= this.expiresAt - 5 * 60 * 1000) {
//                     await this.refreshAccessToken();
//                 }
//             } catch (error) {
//                 logger.error('Auto refresh access_token failed:', error);
//             }
//         }, 60 * 60 * 1000); // 1小时
//     }

//     /**
//      * 强制刷新 access_token
//      */
//     async forceRefresh() {
//         try {
//             await this.refreshAccessToken();
//             logger.info('Successfully force refreshed access_token');
//         } catch (error) {
//             logger.error('Force refresh access_token failed:', error);
//             throw error;
//         }
//     }
// }

// // 创建单例
// const accessTokenManager = new AccessTokenManager();

// module.exports = accessTokenManager; 