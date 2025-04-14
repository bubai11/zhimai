const cron = require('node-cron');
const userService = require('../services/userService');
const logger = require('../utils/logger');

// 每天凌晨3点执行清理任务
cron.schedule('0 3 * * *', async () => {
    logger.info('开始执行Token清理任务');
    try {
        await userService.cleanExpiredTokens();
        logger.info('Token清理任务完成');
    } catch (error) {
        logger.error('Token清理任务失败:', error);
    }
}); 