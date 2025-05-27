const cron = require('node-cron');
const updateActivitiesStatus = require('./updateActivityStatus');
const logger = require('../src/utils/logger');

logger.info('活动状态更新定时任务启动');

// 每小时执行一次活动状态更新（在每小时的第0分钟）
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
});

// 优雅关闭
process.on('SIGINT', () => {
    logger.info('定时任务收到终止信号');
    process.exit(0);
});

process.on('SIGTERM', () => {
    logger.info('定时任务收到终止信号');
    process.exit(0);
}); 