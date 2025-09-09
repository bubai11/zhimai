const reminderService = require('../src/services/reminderService');
const logger = require('../src/utils/logger');

async function checkReminders() {
    try {
        logger.info('开始检查提醒...');
        const count = await reminderService.checkAndSendReminders();
        logger.info(`提醒检查完成，发送了 ${count} 条提醒`);
        process.exit(0);
    } catch (error) {
        logger.error('提醒检查失败:', error);
        process.exit(1);
    }
}

// 如果直接运行脚本则执行检查
if (require.main === module) {
    checkReminders();
}

module.exports = checkReminders; 