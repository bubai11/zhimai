const { Reminder, Activity, User } = require('../models');
const { Op } = require('sequelize');
const logger = require('../utils/logger');
const wechatNotificationService = require('./wechatNotificationService');
const { 
    REMINDER_TYPES, 
    getReminderTypeConfig, 
    isValidReminderType, 
    validateAdvanceTime 
} = require('../config/reminderTypes');

// 移除旧的提醒类型枚举，使用配置文件中的

class ReminderService {
    /**
     * 创建提醒
     * @param {Object} data 提醒数据
     * @returns {Promise<Object>} 创建的提醒记录
     */
    async createReminder(data) {
        try {
            // 验证提醒类型
            if (!isValidReminderType(data.type)) {
                throw new Error('无效的提醒类型');
            }

            // 获取活动信息（如果有关联活动）
            let activity = null;
            if (data.activity_id) {
                activity = await Activity.findByPk(data.activity_id);
                if (!activity) {
                    throw new Error('活动不存在');
                }
            }

            // 获取提醒类型配置
            const typeConfig = getReminderTypeConfig(data.type);

            // 如果没有提供标题，根据类型自动生成
            if (!data.title) {
                if (activity) {
                    data.title = `${activity.title} - ${typeConfig.name}`;
                } else {
                    data.title = typeConfig.defaultTitle;
                }
            }

            // 验证提前时间
            if (data.advance_minutes) {
                if (!validateAdvanceTime(data.type, data.advance_minutes)) {
                    throw new Error(`提前时间必须在 ${typeConfig.minAdvanceMinutes} 到 ${typeConfig.maxAdvanceMinutes} 分钟之间`);
                }
            }

            // 计算提醒时间
            if (data.advance_minutes && activity) {
                const targetTime = this.getTargetTimeForReminderType(data.type, activity);
                data.remind_start_time = new Date(targetTime.getTime() - data.advance_minutes * 60 * 1000);
            }

            // 如果没有提供提醒结束时间，根据类型设置
            if (!data.remind_end_time) {
                if (activity) {
                    data.remind_end_time = this.getTargetTimeForReminderType(data.type, activity);
                } else {
                    data.remind_end_time = data.remind_start_time;
                }
            }

            return await Reminder.create(data);
        } catch (error) {
            logger.error('创建提醒失败:', error);
            throw error;
        }
    }

    /**
     * 根据提醒类型获取目标时间
     */
    getTargetTimeForReminderType(type, activity) {
        switch (type) {
            case REMINDER_TYPES.ACTIVITY_REGISTRATION:
                // 活动报名提醒，假设活动开始前1小时开始报名
                return new Date(activity.start_time.getTime() - 60 * 60 * 1000);
            case REMINDER_TYPES.ACTIVITY_CHECKIN:
                // 活动签到提醒，活动开始时间
                return new Date(activity.start_time);
            case REMINDER_TYPES.ACTIVITY_START:
                // 活动开始提醒，活动开始时间
                return new Date(activity.start_time);
            case REMINDER_TYPES.ACTIVITY_END:
                // 活动结束提醒，活动结束时间
                return new Date(activity.end_time);
            default:
                return new Date(activity.start_time);
        }
    }

    /**
     * 获取用户的所有提醒
     * @param {number} userId 用户ID
     * @returns {Promise<Array>} 提醒列表
     */
    async getUserReminders(userId) {
        try {
            return await Reminder.findAll({
                where: { user_id: userId },
                include: [{
                    model: Activity,
                    as: 'activity',
                    attributes: ['activity_id', 'title', 'start_time', 'end_time', 'location']
                }],
                order: [['remind_start_time', 'ASC']]
            });
        } catch (error) {
            logger.error('获取用户提醒列表失败:', error);
            throw error;
        }
    }

    /**
     * 检查并发送到期提醒
     */
    async checkAndSendReminders() {
        try {
            const now = new Date();
            // 查找需要发送的提醒
            const reminders = await Reminder.findAll({
                where: {
                    remind_start_time: {
                        [Op.lte]: now
                    },
                    remind_end_time: {
                        [Op.gt]: now
                    }
                },
                include: [
                    {
                        model: Activity,
                        as: 'activity',
                        attributes: ['title', 'start_time', 'location']
                    },
                    {
                        model: User,
                        as: 'user',
                        attributes: ['openid']
                    }
                ]
            });

            // 发送提醒
            for (const reminder of reminders) {
                await this.sendReminderNotification(reminder);
            }

            return reminders.length;
        } catch (error) {
            logger.error('检查和发送提醒失败:', error);
            throw error;
        }
    }

    /**
     * 发送提醒通知
     * @param {Object} reminder 提醒对象
     */
    async sendReminderNotification(reminder) {
        try {
            const { user, activity } = reminder;
            if (!user || !activity) {
                logger.warn('提醒缺少必要信息，跳过发送');
                return;
            }

            // 使用新的微信通知服务发送提醒
            const result = await wechatNotificationService.sendActivityReminder(
                user, 
                activity, 
                reminder.type || 'start'
            );

            if (result.success) {
                logger.info('提醒发送成功', {
                    reminder_id: reminder.reminder_id,
                    user_id: reminder.user_id,
                    activity_id: reminder.activity_id
                });
            } else {
                logger.warn('提醒发送失败', {
                    reminder_id: reminder.reminder_id,
                    user_id: reminder.user_id,
                    error: result.message
                });
            }

            return result;
        } catch (error) {
            logger.error('发送提醒通知失败:', error);
            throw error;
        }
    }

    /**
     * 删除提醒
     * @param {number} reminderId 提醒ID
     * @param {number} userId 用户ID（用于验证权限）
     */
    async deleteReminder(reminderId, userId) {
        try {
            const result = await Reminder.destroy({
                where: {
                    reminder_id: reminderId,
                    user_id: userId
                }
            });
            return result > 0;
        } catch (error) {
            logger.error('删除提醒失败:', error);
            throw error;
        }
    }

    /**
     * 创建活动开始提醒
     * @param {number} userId 用户ID
     * @param {number} activityId 活动ID
     * @param {number} advanceMinutes 提前提醒分钟数，默认30分钟
     */
    async createActivityStartReminder(userId, activityId, advanceMinutes = 30) {
        try {
            return await this.createReminder({
                user_id: userId,
                activity_id: activityId,
                type: REMINDER_TYPES.ACTIVITY_START,
                advance_minutes: advanceMinutes
            });
        } catch (error) {
            logger.error('创建活动开始提醒失败:', error);
            throw error;
        }
    }

    /**
     * 创建活动报名提醒
     * @param {number} userId 用户ID
     * @param {number} activityId 活动ID
     * @param {number} advanceMinutes 提前提醒分钟数，默认60分钟
     */
    async createActivityRegistrationReminder(userId, activityId, advanceMinutes = 60) {
        try {
            return await this.createReminder({
                user_id: userId,
                activity_id: activityId,
                type: REMINDER_TYPES.ACTIVITY_REGISTRATION,
                advance_minutes: advanceMinutes
            });
        } catch (error) {
            logger.error('创建活动报名提醒失败:', error);
            throw error;
        }
    }

    /**
     * 创建活动签到提醒
     * @param {number} userId 用户ID
     * @param {number} activityId 活动ID
     * @param {string} checkinTime 签到时间
     * @param {number} advanceMinutes 提前提醒分钟数（30分钟、60分钟、120分钟）
     */
    async createActivityCheckinReminder(userId, activityId, checkinTime, advanceMinutes = 30) {
        try {
            // 验证提前时间选项（只允许30分钟、60分钟、120分钟）
            const allowedAdvanceMinutes = [30, 60, 120];
            if (!allowedAdvanceMinutes.includes(advanceMinutes)) {
                throw new Error('提前时间只能是30分钟、60分钟或120分钟');
            }

            // 计算提醒时间
            const checkinDateTime = new Date(checkinTime);
            const remindTime = new Date(checkinDateTime.getTime() - advanceMinutes * 60 * 1000);

            // 检查提醒时间是否已过
            if (remindTime <= new Date()) {
                throw new Error('提醒时间已过，无法设置提醒');
            }

            // 直接创建提醒，避免通用方法重新计算时间
            const reminderData = {
                user_id: userId,
                activity_id: activityId,
                type: REMINDER_TYPES.ACTIVITY_CHECKIN,
                checkin_time: checkinTime,
                remind_start_time: remindTime,
                remind_end_time: checkinDateTime, // 签到提醒的结束时间就是签到时间
                advance_minutes: advanceMinutes,
                title: `活动签到提醒 - 提前${advanceMinutes}分钟`,
                description: `活动签到提醒，将在签到时间前${advanceMinutes}分钟通知您`,
                sent: false
            };

            return await Reminder.create(reminderData);
        } catch (error) {
            logger.error('创建活动签到提醒失败:', error);
            throw error;
        }
    }

    /**
     * 创建活动结束提醒
     * @param {number} userId 用户ID
     * @param {number} activityId 活动ID
     * @param {number} advanceMinutes 提前提醒分钟数，默认30分钟
     */
    async createActivityEndReminder(userId, activityId, advanceMinutes = 30) {
        try {
            return await this.createReminder({
                user_id: userId,
                activity_id: activityId,
                type: REMINDER_TYPES.ACTIVITY_END,
                advance_minutes: advanceMinutes
            });
        } catch (error) {
            logger.error('创建活动结束提醒失败:', error);
            throw error;
        }
    }

    /**
     * 创建自定义提醒
     * @param {number} userId 用户ID
     * @param {Object} data 提醒数据
     */
    async createCustomReminder(userId, data) {
        try {
            return await this.createReminder({
                user_id: userId,
                type: REMINDER_TYPES.CUSTOM,
                title: data.title,
                description: data.description,
                remind_start_time: data.remind_start_time,
                advance_minutes: data.advance_minutes
            });
        } catch (error) {
            logger.error('创建自定义提醒失败:', error);
            throw error;
        }
    }

    /**
     * 获取可用的提醒类型
     */
    getAvailableReminderTypes() {
        const { getAvailableReminderTypes } = require('../config/reminderTypes');
        return getAvailableReminderTypes();
    }

    /**
     * 获取需要发送的提醒
     */
    async getPendingReminders() {
        try {
            const now = new Date();
            const fiveMinutesLater = new Date(now.getTime() + 5 * 60 * 1000); // 5分钟后

            const reminders = await Reminder.findAll({
                where: {
                    remind_start_time: {
                        [Op.between]: [now, fiveMinutesLater]
                    },
                    sent: false // 假设添加了sent字段来标记是否已发送
                },
                include: [
                    {
                        model: User,
                        as: 'user',
                        attributes: ['id', 'openid', 'nickname']
                    },
                    {
                        model: Activity,
                        as: 'activity',
                        attributes: ['activity_id', 'title', 'start_time', 'end_time', 'location', 'organizer']
                    }
                ]
            });

            return reminders;
        } catch (error) {
            logger.error('获取待发送提醒失败:', error);
            throw error;
        }
    }

    /**
     * 根据ID获取提醒详情
     */
    async getReminderById(reminderId) {
        try {
            const reminder = await Reminder.findByPk(reminderId, {
                include: [
                    {
                        model: User,
                        as: 'user',
                        attributes: ['id', 'username', 'openid']
                    },
                    {
                        model: Activity,
                        as: 'activity',
                        attributes: ['activity_id', 'title', 'start_time', 'end_time', 'location']
                    }
                ]
            });

            return reminder;
        } catch (error) {
            logger.error('获取提醒详情失败:', error);
            throw error;
        }
    }

    /**
     * 发送定时提醒
     */
    async sendScheduledReminders() {
        try {
            logger.info('开始检查定时提醒...');
            
            const pendingReminders = await this.getPendingReminders();
            
            if (pendingReminders.length === 0) {
                logger.info('没有需要发送的提醒');
                return { sent: 0, failed: 0 };
            }

            logger.info(`找到 ${pendingReminders.length} 个待发送提醒`);

            // 准备发送数据
            const remindersToSend = pendingReminders.map(reminder => ({
                reminder_id: reminder.reminder_id,
                user_id: reminder.user_id,
                user: reminder.user,
                activity: reminder.activity,
                type: reminder.type 
            }));

            // 批量发送微信通知
            const results = await wechatNotificationService.sendBatchReminders(remindersToSend);

            // 更新发送状态
            let sentCount = 0;
            let failedCount = 0;

            for (const result of results) {
                try {
                    await Reminder.update(
                        { sent: true, sent_at: new Date() },
                        { where: { reminder_id: result.reminder_id } }
                    );
                    
                    if (result.success) {
                        sentCount++;
                        logger.info(`提醒发送成功: ${result.reminder_id}`);
                    } else {
                        failedCount++;
                        logger.warn(`提醒发送失败: ${result.reminder_id} - ${result.message}`);
                    }
                } catch (error) {
                    failedCount++;
                    logger.error(`更新提醒状态失败: ${result.reminder_id}`, error);
                }
            }

            logger.info(`定时提醒发送完成: 成功 ${sentCount} 个，失败 ${failedCount} 个`);
            return { sent: sentCount, failed: failedCount };

        } catch (error) {
            logger.error('发送定时提醒失败:', error);
            throw error;
        }
    }
}

module.exports = new ReminderService(); 