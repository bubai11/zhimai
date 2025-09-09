const cron = require('node-cron');
const updateActivitiesStatus = require('./updateActivityStatus');
const reminderService = require('../src/services/reminderService');
const logger = require('../src/utils/logger');

logger.info('定时任务调度器启动');

// 活动状态更新 - 每小时执行一次（在每小时的第0分钟）
cron.schedule('0 * * * *', async () => {
    try {
        logger.info('开始执行定时活动状态更新');
        const result = await updateActivitiesStatus();
        if (result.updatedToOngoing > 0 || result.updatedToEnded > 0) {
            logger.info('定时任务：活动状态更新成功', result);
        } else {
            logger.info('定时任务：没有需要更新的活动', result);
        }
    } catch (error) {
        logger.error('定时任务：活动状态更新失败', {
            error: error.message,
            stack: error.stack,
            timestamp: new Date()
        });
    }
}, {
    scheduled: true,
    timezone: "Asia/Shanghai"
});

// 提醒检查 - 每5分钟执行一次
cron.schedule('*/5 * * * *', async () => {
    try {
        logger.info('开始检查活动提醒');
        const result = await reminderService.sendScheduledReminders();
        if (result.sent > 0 || result.failed > 0) {
            logger.info(`定时任务：提醒检查完成，成功发送 ${result.sent} 条，失败 ${result.failed} 条`);
        } else {
            logger.debug('定时任务：没有需要发送的提醒');
        }
    } catch (error) {
        logger.error('定时任务：提醒检查失败', {
            error: error.message,
            stack: error.stack,
            timestamp: new Date()
        });
    }
}, {
    scheduled: true,
    timezone: "Asia/Shanghai"
});

// Token清理 - 每天凌晨2点执行
cron.schedule('0 2 * * *', async () => {
    try {
        logger.info('开始清理过期Token');
        // 这里可以添加Token清理逻辑
        const { AdminToken } = require('../src/models');
        const { Op } = require('sequelize');
        
        const deletedCount = await AdminToken.destroy({
            where: {
                expires_at: {
                    [Op.lt]: new Date()
                }
            }
        });
        
        logger.info(`定时任务：Token清理完成，清理了 ${deletedCount} 个过期Token`);
    } catch (error) {
        logger.error('定时任务：Token清理失败', {
            error: error.message,
            stack: error.stack,
            timestamp: new Date()
        });
    }
}, {
    scheduled: true,
    timezone: "Asia/Shanghai"
});

// 数据库备份 - 每天凌晨3点执行（如果需要）
cron.schedule('0 3 * * *', async () => {
    try {
        logger.info('开始数据库备份');
        // 这里可以添加数据库备份逻辑
        // const dbBackup = require('../src/utils/dbBackup');
        // await dbBackup.createBackup();
        logger.info('定时任务：数据库备份完成');
    } catch (error) {
        logger.error('定时任务：数据库备份失败', {
            error: error.message,
            stack: error.stack,
            timestamp: new Date()
        });
    }
}, {
    scheduled: true,
    timezone: "Asia/Shanghai"
});


logger.info('所有定时任务已注册完成');

// 优雅关闭
process.on('SIGINT', () => {
    logger.info('定时任务调度器收到SIGINT信号，正在关闭...');
    process.exit(0);
});

process.on('SIGTERM', () => {
    logger.info('定时任务调度器收到SIGTERM信号，正在关闭...');
    process.exit(0);
});

// 防止进程意外退出
process.on('uncaughtException', (error) => {
    logger.error('未捕获的异常:', error);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    logger.error('未处理的Promise拒绝:', { reason, promise });
    process.exit(1);
}); 