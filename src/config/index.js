require('dotenv').config();

// 微信相关配置
const wechatConfig = {
    APP_ID: process.env.WECHAT_APP_ID,
    APP_SECRET: process.env.WECHAT_APP_SECRET,
    TOKEN: process.env.WECHAT_TOKEN,
    ENCODING_AES_KEY: process.env.WECHAT_ENCODING_AES_KEY,
    API_BASE_URL: 'https://api.weixin.qq.com/cgi-bin',
    ACCESS_TOKEN_URL: 'https://api.weixin.qq.com/cgi-bin/token',
    OAUTH_BASE_URL: 'https://open.weixin.qq.com/connect/oauth2',
    OAUTH_REDIRECT_URL: process.env.WECHAT_OAUTH_REDIRECT_URL,
    MESSAGE_TEMPLATE_IDS: {
        ACTIVITY_REMINDER: process.env.WECHAT_TEMPLATE_ID_ACTIVITY_REMINDER,
        SIGN_UP_SUCCESS: process.env.WECHAT_TEMPLATE_ID_SIGN_UP_SUCCESS,
        CREDIT_GRANTED: process.env.WECHAT_TEMPLATE_ID_CREDIT_GRANTED
    }
};

// 默认使用一个固定的开发环境密钥，确保开发时token不会因为重启服务而失效
const DEV_JWT_SECRET = 'campus-service-dev-secret-key-2024';

const database = require('./database');
const email = require('./email');

module.exports = {
    // JWT配置
    JWT_SECRET: process.env.JWT_SECRET || DEV_JWT_SECRET,
    JWT_EXPIRES_IN: '7d',  // 7天
    JWT_EXPIRES_IN_ADMIN: '2h',  // 2小时
    
    // 数据库配置
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_PORT: process.env.DB_PORT || 3306,
    DB_NAME: process.env.DB_NAME || 'your_database_name',
    DB_USER: process.env.DB_USER || 'root',
    DB_PASSWORD: process.env.DB_PASSWORD || '',

    // 微信小程序配置
    WX_APPID: process.env.WX_APPID,
    WX_SECRET: process.env.WX_SECRET,

    // 环境配置
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 3000,
    ...wechatConfig,
    database,
    email
}; 