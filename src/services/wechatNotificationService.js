// 微信通知服务
const axios = require('axios');
const logger = require('../utils/logger');
const { getReminderTypeConfig } = require('../config/reminderTypes');

class WechatNotificationService {
    constructor() {
        this.appId = process.env.WECHAT_APP_ID;
        this.appSecret = process.env.WECHAT_APP_SECRET;
        this.templateId = process.env.WECHAT_TEMPLATE_ID; // 订阅消息模板ID
        this.accessToken = null;
        this.tokenExpireTime = null;
    }

    /**
     * 获取微信访问令牌
     */
    async getAccessToken() {
        try {
            // 如果token还有效，直接返回
            if (this.accessToken && this.tokenExpireTime && Date.now() < this.tokenExpireTime) {
                return this.accessToken;
            }

            const response = await axios.get('https://api.weixin.qq.com/cgi-bin/token', {
                params: {
                    grant_type: 'client_credential',
                    appid: this.appId,
                    secret: this.appSecret
                },
                timeout: 10000
            });

            if (response.data.access_token) {
                this.accessToken = response.data.access_token;
                this.tokenExpireTime = Date.now() + (response.data.expires_in - 300) * 1000; // 提前5分钟过期
                
                logger.info('微信访问令牌获取成功');
                return this.accessToken;
            } else {
                throw new Error('获取微信访问令牌失败: ' + JSON.stringify(response.data));
            }
        } catch (error) {
            logger.error('获取微信访问令牌失败:', error);
            throw error;
        }
    }

    /**
     * 发送订阅消息（小程序）
     */
    async sendSubscribeMessage(openid, templateId, data, page = '') {
        try {
            const accessToken = await this.getAccessToken();
            
            const response = await axios.post(
                `https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=${accessToken}`,
                {
                    touser: openid,
                    template_id: templateId,
                    page: page,
                    data: data
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    timeout: 10000
                }
            );

            if (response.data.errcode === 0) {
                logger.info(`订阅消息发送成功: ${openid}`);
                return { success: true, message: '发送成功' };
            } else {
                logger.error('订阅消息发送失败:', response.data);
                return { 
                    success: false, 
                    message: response.data.errmsg || '发送失败',
                    errcode: response.data.errcode
                };
            }
        } catch (error) {
            logger.error('发送订阅消息异常:', error);
            return { success: false, message: '发送异常: ' + error.message };
        }
    }

    /**
     * 发送模板消息（公众号）
     */
    async sendTemplateMessage(openid, templateId, data, url = '') {
        try {
            const accessToken = await this.getAccessToken();
            
            const response = await axios.post(
                `https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=${accessToken}`,
                {
                    touser: openid,
                    template_id: templateId,
                    url: url,
                    data: data
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    timeout: 10000
                }
            );

            if (response.data.errcode === 0) {
                logger.info(`模板消息发送成功: ${openid}`);
                return { success: true, message: '发送成功' };
            } else {
                logger.error('模板消息发送失败:', response.data);
                return { 
                    success: false, 
                    message: response.data.errmsg || '发送失败',
                    errcode: response.data.errcode
                };
            }
        } catch (error) {
            logger.error('发送模板消息异常:', error);
            return { success: false, message: '发送异常: ' + error.message };
        }
    }

    /**
     * 发送活动提醒通知
     */
    async sendActivityReminder(user, activity, reminderType = 'activity_start', reminder = null) {
        try {
            const { openid, wechat_openid } = user;
            const targetOpenid = openid || wechat_openid;
            
            if (!targetOpenid) {
                logger.warn(`用户 ${user.id} 没有绑定微信openid`);
                return { success: false, message: '用户未绑定微信' };
            }

            // 获取提醒类型配置
            const typeConfig = getReminderTypeConfig(reminderType);
            
            // 构建消息数据
            const messageData = this.buildReminderMessage(activity, reminderType, reminder);
            
            // 获取对应的模板ID
            const templateId = typeConfig.templateId || this.templateId;
            
            if (!templateId) {
                logger.warn(`提醒类型 ${reminderType} 未配置模板ID`);
                return { success: false, message: '未配置消息模板' };
            }
            
            // 尝试发送小程序订阅消息
            const result = await this.sendSubscribeMessage(
                targetOpenid,
                templateId,
                messageData,
                `pages/activity-detail/index?id=${activity.activity_id}`
            );
            
            if (result.success) {
                return result;
            }

            // 如果小程序消息发送失败，尝试公众号模板消息
            const mpTemplateId = process.env.WECHAT_MP_TEMPLATE_ID;
            if (mpTemplateId) {
                return await this.sendTemplateMessage(
                    targetOpenid,
                    mpTemplateId,
                    messageData,
                    `${process.env.FRONTEND_URL}/activity/${activity.activity_id}`
                );
            }

            return result;
            
        } catch (error) {
            logger.error('发送活动提醒失败:', error);
            return { success: false, message: '发送失败: ' + error.message };
        }
    }

    /**
     * 构建提醒消息数据
     */
    buildReminderMessage(activity, reminderType, reminder = null) {
        // 获取提醒类型配置
        const typeConfig = getReminderTypeConfig(reminderType);
        
        // 使用配置中的消息模板
        const template = typeConfig.messageTemplate;
        const messageData = {};
        
        // 处理模板变量
        for (const [key, value] of Object.entries(template)) {
            let processedValue = value.value;
            
            // 替换活动相关变量
            if (processedValue.includes('{{activity.')) {
                processedValue = processedValue.replace(/\{\{activity\.(\w+)\}\}/g, (match, field) => {
                    switch (field) {
                        case 'title':
                            return activity.title || '未知活动';
                        case 'start_time':
                            return new Date(activity.start_time).toLocaleString('zh-CN', {
                                month: '2-digit',
                                day: '2-digit',
                                hour: '2-digit',
                                minute: '2-digit'
                            });
                        case 'end_time':
                            return new Date(activity.end_time).toLocaleString('zh-CN', {
                                month: '2-digit',
                                day: '2-digit',
                                hour: '2-digit',
                                minute: '2-digit'
                            });
                        case 'location':
                            return activity.location || '线上';
                        case 'organizer':
                            return activity.organizer || '主办方';
                        default:
                            return activity[field] || '';
                    }
                });
            }
            
            // 替换签到时间变量
            if (processedValue.includes('{{checkin_time}}')) {
                if (reminder && reminder.checkin_time) {
                    processedValue = processedValue.replace(/\{\{checkin_time\}\}/g, 
                        new Date(reminder.checkin_time).toLocaleString('zh-CN', {
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit'
                        })
                    );
                } else if (activity) {
                    // 如果没有指定签到时间，使用活动开始时间
                    processedValue = processedValue.replace(/\{\{checkin_time\}\}/g, 
                        new Date(activity.start_time).toLocaleString('zh-CN', {
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit'
                        })
                    );
                }
            }
            
            // 替换提醒相关变量
            if (processedValue.includes('{{reminder.')) {
                processedValue = processedValue.replace(/\{\{reminder\.(\w+)\}\}/g, (match, field) => {
                    if (reminder) {
                        switch (field) {
                            case 'title':
                                return reminder.title || '提醒';
                            case 'description':
                                return reminder.description || '';
                            case 'remind_start_time':
                                return new Date(reminder.remind_start_time).toLocaleString('zh-CN', {
                                    month: '2-digit',
                                    day: '2-digit',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                });
                            default:
                                return reminder[field] || '';
                        }
                    }
                    return '';
                });
            }
            
            messageData[key] = { value: processedValue };
        }
        
        return messageData;
    }

    /**
     * 批量发送提醒
     */
    async sendBatchReminders(reminders) {
        const results = [];
        
        for (const reminder of reminders) {
            try {
                const result = await this.sendActivityReminder(
                    reminder.user,
                    reminder.activity,
                    reminder.type
                );
                
                results.push({
                    reminder_id: reminder.reminder_id,
                    user_id: reminder.user_id,
                    success: result.success,
                    message: result.message
                });
                
                // 避免请求过于频繁
                await new Promise(resolve => setTimeout(resolve, 100));
                
            } catch (error) {
                logger.error(`发送提醒失败 ${reminder.reminder_id}:`, error);
                results.push({
                    reminder_id: reminder.reminder_id,
                    user_id: reminder.user_id,
                    success: false,
                    message: error.message
                });
            }
        }
        
        return results;
    }
}

module.exports = new WechatNotificationService();
