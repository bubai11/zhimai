const cron = require('node-cron');
const adminService = require('../services/adminService');
const userService = require('../services/userService');
const logger = require('./logger');

class Scheduler {
    constructor() {
        this.jobs = new Map();
    }

    /**
     * 初始化所有定时任务
     */
    initializeJobs() {
        // 每天凌晨3点执行清理过期token
        this.addJob('cleanExpiredTokens', '0 3 * * *', async () => {
            try {
                const adminCount = await adminService.cleanExpiredTokens();
                const userCount = await userService.cleanExpiredTokens();
                logger.info(`定时清理过期token完成，共清理 ${adminCount} 个管理员token和 ${userCount} 个用户token`);
            } catch (error) {
                logger.error('定时清理过期token失败:', error);
            }
        });

        // 这里可以添加其他定时任务
    }

    /**
     * 添加定时任务
     * @param {string} name 任务名称
     * @param {string} schedule cron表达式
     * @param {Function} task 任务函数
     */
    addJob(name, schedule, task) {
        if (this.jobs.has(name)) {
            this.jobs.get(name).stop();
        }

        const job = cron.schedule(schedule, task, {
            scheduled: true,
            timezone: "Asia/Shanghai"
        });

        this.jobs.set(name, job);
        logger.info(`定时任务 [${name}] 已添加，调度: ${schedule}`);
    }

    /**
     * 停止指定任务
     * @param {string} name 任务名称
     */
    stopJob(name) {
        const job = this.jobs.get(name);
        if (job) {
            job.stop();
            this.jobs.delete(name);
            logger.info(`定时任务 [${name}] 已停止`);
        }
    }

    /**
     * 停止所有任务
     */
    stopAllJobs() {
        for (const [name, job] of this.jobs) {
            job.stop();
            logger.info(`定时任务 [${name}] 已停止`);
        }
        this.jobs.clear();
    }

    /**
     * 手动触发任务
     * @param {string} name 任务名称
     */
    async triggerJob(name) {
        const job = this.jobs.get(name);
        if (job) {
            try {
                await job.job();
                logger.info(`定时任务 [${name}] 已手动触发`);
            } catch (error) {
                logger.error(`手动触发任务 [${name}] 失败:`, error);
                throw error;
            }
        } else {
            throw new Error(`任务 [${name}] 不存在`);
        }
    }
}

const scheduler = new Scheduler();

module.exports = scheduler; 