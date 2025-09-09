const reminderService = require('../services/reminderService');
const { validateRequest } = require('../utils/validator');
const { Response } = require('../utils/response');
const logger = require('../utils/logger');
const { REMINDER_TYPES } = require('../config/reminderTypes');

class ReminderController {
    /**
     * 创建活动提醒
     */
    async createReminder(req, res) {
        try {
            const { activity_id, remind_start_time, remind_end_time, title } = req.body;
            const user_id = req.user.id;

            // 验证请求数据
            validateRequest({
                activity_id: { type: 'number', required: true },
                remind_start_time: { type: 'date', required: true },
                remind_end_time: { type: 'date', required: false },
                title: { type: 'string', required: false, max: 255 }
            }, req.body);

            const reminder = await reminderService.createReminder({
                activity_id,
                user_id,
                remind_start_time,
                remind_end_time,
                title
            });

            res.json(Response.success(reminder, '创建提醒成功'));
        } catch (error) {
            logger.error('创建提醒失败:', error);
            res.status(400).json(Response.badRequest(error.message || '创建提醒失败'));
        }
    }

    /**
     * 获取用户的提醒列表
     */
    async getUserReminders(req, res) {
        try {
            const user_id = req.user.id;
            const reminders = await reminderService.getUserReminders(user_id);

            res.json(Response.success(reminders, '获取提醒列表成功'));
        } catch (error) {
            logger.error('获取提醒列表失败:', error);
            res.status(400).json(Response.badRequest(error.message || '获取提醒列表失败'
            ));
        }
    }

    /**
     * 删除提醒
     */
    async deleteReminder(req, res) {
        try {
            const { reminder_id } = req.params;
            const user_id = req.user.id;

            const success = await reminderService.deleteReminder(reminder_id, user_id);
            if (!success) {
                return res.status(404).json(Response.error('提醒不存在或无权限删除', 404));
            }

            res.json({
                code: 0,
                message: '删除提醒成功'
            });
        } catch (error) {
            logger.error('删除提醒失败:', error);
            res.status(400).json(Response.badRequest(error.message || '删除提醒失败'
            ));
        }
    }

    /**
     * 创建活动开始提醒
     */
    async createActivityStartReminder(req, res) {
        try {
            const { activity_id, remind_minutes = 30 } = req.body;
            const user_id = req.user.id;

            // 验证请求数据
            validateRequest({
                activity_id: { type: 'number', required: true },
                remind_minutes: { type: 'number', required: false, min: 1, max: 1440 } // 最多提前24小时
            }, req.body);

            const reminder = await reminderService.createActivityStartReminder(
                user_id, 
                activity_id, 
                remind_minutes
            );

            res.json(Response.success(reminder, '创建活动开始提醒成功'));
        } catch (error) {
            logger.error('创建活动开始提醒失败:', error);
            res.status(400).json(Response.badRequest(error.message || '创建活动开始提醒失败'
            ));
        }
    }

    /**
     * 创建活动结束提醒
     */
    async createActivityEndReminder(req, res) {
        try {
            const { activity_id, remind_minutes = 30 } = req.body;
            const user_id = req.user.id;

            // 验证请求数据
            validateRequest({
                activity_id: { type: 'number', required: true },
                remind_minutes: { type: 'number', required: false, min: 1, max: 1440 } // 最多提前24小时
            }, req.body);

            const reminder = await reminderService.createActivityEndReminder(
                user_id, 
                activity_id, 
                remind_minutes
            );

            res.json(Response.success(reminder, '创建活动结束提醒成功'));
        } catch (error) {
            logger.error('创建活动结束提醒失败:', error);
            res.status(400).json(Response.badRequest(error.message || '创建活动结束提醒失败'
            ));
        }
    }

    /**
     * 批量创建活动提醒（开始和结束）
     */
    async createActivityReminders(req, res) {
        try {
            const { activity_id, start_remind_minutes = 30, end_remind_minutes = 30 } = req.body;
            const user_id = req.user.id;

            // 验证请求数据
            validateRequest({
                activity_id: { type: 'number', required: true },
                start_remind_minutes: { type: 'number', required: false, min: 1, max: 1440 },
                end_remind_minutes: { type: 'number', required: false, min: 1, max: 1440 }
            }, req.body);

            const results = await Promise.allSettled([
                reminderService.createActivityStartReminder(user_id, activity_id, start_remind_minutes),
                reminderService.createActivityEndReminder(user_id, activity_id, end_remind_minutes)
            ]);

            const reminders = [];
            const errors = [];

            results.forEach((result, index) => {
                if (result.status === 'fulfilled') {
                    reminders.push(result.value);
                } else {
                    errors.push({
                        type: index === 0 ? 'start' : 'end',
                        error: result.reason.message
                    });
                }
            });

            res.json({
                code: 0,
                data: {
                    reminders,
                    errors: errors.length > 0 ? errors : undefined
                },
                message: `成功创建 ${reminders.length} 个提醒${errors.length > 0 ? `，${errors.length} 个失败` : ''}`
            });
        } catch (error) {
            logger.error('批量创建活动提醒失败:', error);
            res.status(400).json(Response.badRequest(error.message || '批量创建活动提醒失败'
            ));
        }
    }

    /**
     * 创建活动报名提醒
     */
    async createActivityRegistrationReminder(req, res) {
        try {
            const { activity_id, advance_minutes = 60 } = req.body;
            const user_id = req.user.id;

            validateRequest({
                activity_id: { type: 'number', required: true },
                advance_minutes: { type: 'number', required: false, min: 1, max: 1440 }
            }, req.body);

            const reminder = await reminderService.createActivityRegistrationReminder(
                user_id, 
                activity_id, 
                advance_minutes
            );

            res.json(Response.success(reminder, '创建活动报名提醒成功'));
        } catch (error) {
            logger.error('创建活动报名提醒失败:', error);
            res.status(400).json(Response.badRequest(error.message || '创建活动报名提醒失败'
            ));
        }
    }

    /**
     * 创建活动签到提醒
     */
    async createActivityCheckinReminder(req, res) {
        try {
            const { activity_id, checkin_time, advance_minutes = 30 } = req.body;
            const user_id = req.user.id;

            validateRequest({
                activity_id: { type: 'number', required: true },
                checkin_time: { type: 'string', required: true },
                advance_minutes: { type: 'number', required: false, enum: [30, 60, 120] }
            }, req.body);

            const reminder = await reminderService.createActivityCheckinReminder(
                user_id, 
                activity_id, 
                checkin_time,
                advance_minutes
            );

            res.json(Response.success(reminder, '创建活动签到提醒成功'));
        } catch (error) {
            logger.error('创建活动签到提醒失败:', error);
            res.status(400).json(Response.badRequest(error.message || '创建活动签到提醒失败'
            ));
        }
    }

    /**
     * 创建自定义提醒
     */
    async createCustomReminder(req, res) {
        try {
            const { title, description, remind_start_time, advance_minutes } = req.body;
            const user_id = req.user.id;

            validateRequest({
                title: { type: 'string', required: true, max: 255 },
                description: { type: 'string', required: false, max: 1000 },
                remind_start_time: { type: 'date', required: true },
                advance_minutes: { type: 'number', required: false, min: 1, max: 10080 }
            }, req.body);

            const reminder = await reminderService.createCustomReminder(user_id, {
                title,
                description,
                remind_start_time,
                advance_minutes
            });

            res.json(Response.success(reminder, '创建自定义提醒成功'));
        } catch (error) {
            logger.error('创建自定义提醒失败:', error);
            res.status(400).json(Response.badRequest(error.message || '创建自定义提醒失败'
            ));
        }
    }

    /**
     * 获取可用的提醒类型
     */
    async getReminderTypes(req, res) {
        try {
            const types = reminderService.getAvailableReminderTypes();
            res.json(Response.success(types, '获取提醒类型成功'));
        } catch (error) {
            logger.error('获取提醒类型失败:', error);
            res.status(400).json(Response.badRequest(error.message || '获取提醒类型失败'
            ));
        }
    }

    /**
     * 手动发送提醒（测试用）
     */
    async sendTestReminder(req, res) {
        try {
            const { reminder_id } = req.params;
            const user_id = req.user.id;

            // 获取提醒详情
            const reminder = await reminderService.getReminderById(reminder_id);
            if (!reminder || reminder.user_id !== user_id) {
                return res.status(404).json(Response.error('提醒不存在或无权限', 404));
            }

            // 发送提醒
            const result = await reminderService.sendReminderNotification(reminder);

            res.json({
                code: 0,
                data: result,
                message: result.success ? '提醒发送成功' : '提醒发送失败'
            });
        } catch (error) {
            logger.error('发送测试提醒失败:', error);
            res.status(400).json(Response.badRequest(error.message || '发送测试提醒失败'
            ));
        }
    }
}

module.exports = new ReminderController(); 