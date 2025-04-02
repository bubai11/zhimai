// config/database.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize({
    dialect: 'mysql',  // 使用 MySQL 数据库
    host: process.env.DB_HOST, // 数据库主机地址
    username: process.env.DB_USER || 'zhimai',  // 使用环境变量，提供默认值
    password: process.env.DB_PASSWORD,      // 数据库密码
    database: process.env.DB_NAME, // 数据库名称
    port: process.env.DB_PORT || 3306,       // 数据库端口
    // 其他配置选项
    define: {
        timestamps: true, // 自动添加 createdAt 和 updatedAt 字段
        underscored: true // 使用下划线命名约定
    },
    timezone: '+08:00', // 设置为东八区
    // 连接池配置
    pool: {
        max: 5,      // 连接池中最大连接数
        min: 0,      // 连接池中最小连接数
        acquire: 30000, // 获取连接的最大等待时间（毫秒）
        idle: 10000  // 连接在释放之前可以空闲的最长时间（毫秒）
    },
    logging: console.log // 添加日志记录
});

module.exports = sequelize;