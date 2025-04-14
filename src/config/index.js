require('dotenv').config();

module.exports = {
    // JWT配置
    JWT_SECRET: process.env.JWT_SECRET || 'your-default-secret-key',
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '24h',

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
}; 