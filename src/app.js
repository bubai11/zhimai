const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
require('dotenv').config();
const cron = require('node-cron');
const userService = require('./services/userService');

const userRoutes = require('./routes/userRoutes');
// const testRoutes = require('./routes/testRoutes');
const activityRoutes = require('./routes/activityRoutes');  // 添加活动路由
const adminRoutes = require('./routes/adminRoutes');  // 添加管理员路由

// 添加新的中间件导入
// const { errorHandler } = require('./middlewares/errorHandler');
const logger = require('./utils/logger');
const requestLogger = require('./middleware/requestLogger');  // 导入请求日志中间件

const app = express();

// 配置 CORS
const corsOptions = {
    origin: [
        'http://localhost:3000',
        'http://localhost:8080',
        'http://127.0.0.1:3000',
        'http://127.0.0.1:*',
        'http://localhost:*',
        'http://172.20.10.3:3000',
        'http://10.235.68.105:3000',  // 添加你的IP
        'http://10.235.71.254:3000',  // 添加你的IP
        'http://10.205.27.253:3000',  // 添加你的IP
        '*'  // 允许所有来源
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200
};

// 应用 CORS 中间件
app.use(cors(corsOptions));

// 添加预检请求的处理
app.options('*', cors(corsOptions));

// 中间件
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 使用请求日志中间件
app.use(requestLogger);

// 路由
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/activity', activityRoutes);
// app.use('/api/test', testRoutes);

// 测试路由
app.get('/hello', (req, res) => {
    const clientInfo = {
        ip: req.ip,
        originalUrl: req.originalUrl,
        protocol: req.protocol,
        hostname: req.hostname,
        headers: req.headers,
        connection: {
            remoteAddress: req.connection.remoteAddress,
            remotePort: req.connection.remotePort
        }
    };

    res.json({
        message: 'Hello World',
        timestamp: new Date().toISOString(),
        serverInfo: {
            nodeVersion: process.version,
            platform: process.platform,
            uptime: process.uptime()
        },
        clientInfo
    });
});

// 基础健康检查接口
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date(),
        uptime: process.uptime()
    });
});

// 错误处理中间件应该放在所有路由之后
// app.use(errorHandler);

// 数据库连接和同步
async function initializeDatabase() {
    try {
        // 测试数据库连接
        await sequelize.authenticate();
        console.log('MySQL 连接成功');

        // 同步数据库模型
        await sequelize.sync();
        console.log('数据库模型同步完成');

        return true;
    } catch (error) {
        console.error('数据库初始化失败:', error);
        // 在生产环境中，你可能想要在这里优雅地关闭应用
        if (process.env.NODE_ENV === 'production') {
            console.error('生产环境中数据库错误，应用将退出');
            process.exit(1);
        }
        return false;
    }
}

// 设置定时任务，每天凌晨 3 点清理过期 token
cron.schedule('0 3 * * *', async () => {
    logger.info('开始执行过期 token 清理任务');
    try {
        await userService.cleanExpiredTokens();
        logger.info('过期 token 清理任务完成');
    } catch (error) {
        logger.error('过期 token 清理任务失败:', error);
    }
});

// 启动服务器
const PORT = process.env.PORT || 3000;

// 先初始化数据库，然后再启动服务器
initializeDatabase().then((dbSuccess) => {
    if (dbSuccess || process.env.NODE_ENV !== 'production') {
        const server = app.listen(PORT, '0.0.0.0', () => {
            const address = server.address();
            const networkInterfaces = require('os').networkInterfaces();
            const addresses = [];
            
            console.log('网络环境检测:');
            console.log('----------------------------------------');
            
            // 获取并显示所有网络接口信息
            Object.keys(networkInterfaces).forEach(interfaceName => {
                console.log(`\n接口 ${interfaceName}:`);
                networkInterfaces[interfaceName].forEach(interface => {
                    if (interface.family === 'IPv4') {
                        console.log(`  - IP地址: ${interface.address}`);
                        console.log(`  - 子网掩码: ${interface.netmask}`);
                        console.log(`  - 内部地址: ${interface.internal ? '是' : '否'}`);
                        if (!interface.internal) {
                            addresses.push(interface.address);
                        }
                    }
                });
            });

            console.log('\n----------------------------------------');
            console.log('服务器启动成功:');
            console.log(`- 端口: ${address.port}`);
            console.log(`- 监听地址: ${address.address}`);
            console.log(`- 协议类型: ${address.family}`);
            console.log('\n可访问地址:');
            console.log(`- 本地访问: http://localhost:${PORT}`);
            addresses.forEach(ip => {
                console.log(`- 局域网访问: http://${ip}:${PORT}`);
            });
            console.log('\n注意事项:');
            console.log('1. 如果使用校园网，设备间可能被隔离，建议使用手机热点');
            console.log('2. 确保手机和电脑在同一网络环境下');
            console.log('3. 如果无法访问，可以尝试使用内网穿透工具');
        });

        server.on('error', (error) => {
            console.error('服务器错误:', error);
            if (error.code === 'EADDRINUSE') {
                console.error(`端口 ${PORT} 已被占用`);
            }
        });
    }
});

module.exports = app;