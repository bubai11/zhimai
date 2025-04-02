const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const testRoutes = require('./routes/testRoutes');
const activityRoutes = require('./routes/activityRoutes');  // 添加活动路由

// 添加新的中间件导入
const { errorHandler } = require('./middlewares/errorHandler');
const logger = require('./utils/logger');

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

// 在所有路由之前添加日志中间件
app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`, {
        ip: req.ip,
        userId: req.user?.id
    });
    next();
});

// 路由
app.use('/api', userRoutes);
app.use('/api/test', testRoutes);
app.use('/api', activityRoutes);  // 添加活动路由

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
sequelize.authenticate()
    .then(() => {
        console.log('MySQL 连接成功');
        return sequelize.sync();
    })
    .then(() => {
        console.log('数据库同步完成');
    })
    .catch((err) => {
        console.error('数据库连接或同步失败:', err);
    });

// 启动服务器
const PORT = process.env.PORT || 3000;
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

module.exports = app;