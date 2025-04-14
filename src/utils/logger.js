const winston = require('winston');
const path = require('path');

// 定义日志级别
const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4
};

// 定义日志颜色
const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white'
};

// 添加颜色配置
winston.addColors(colors);

// 自定义格式化函数
const logFormat = winston.format.printf(({ timestamp, level, message, ...meta }) => {
    let logMessage = `${timestamp} ${level}: ${message}`;
    if (Object.keys(meta).length > 0) {
        logMessage += ` ${JSON.stringify(meta)}`;
    }
    return logMessage;
});

// 定义日志格式
const format = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    winston.format.colorize({ all: true }),
    winston.format.splat(),
    winston.format.json(),
    logFormat
);

// 确保日志目录存在
const logDir = path.join(process.cwd(), 'logs');
require('fs').mkdirSync(logDir, { recursive: true });

// 定义日志传输配置
const transports = [
    // 控制台输出
    new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
        )
    }),
    // 错误日志文件
    new winston.transports.File({
        filename: path.join(logDir, 'error.log'),
        level: 'error',
        format: format
    }),
    // 组合日志文件
    new winston.transports.File({
        filename: path.join(logDir, 'combined.log'),
        format: format
    })
];

// 创建 logger 实例
const logger = winston.createLogger({
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    levels,
    format,
    defaultMeta: { service: 'user-service' },
    transports,
    // 处理异常
    exceptionHandlers: [
        new winston.transports.File({ filename: path.join(logDir, 'exceptions.log') })
    ],
    // 处理 Promise 拒绝
    rejectionHandlers: [
        new winston.transports.File({ filename: path.join(logDir, 'rejections.log') })
    ]
});

module.exports = logger;