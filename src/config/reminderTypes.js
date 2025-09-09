// 提醒类型配置
const REMINDER_TYPES = {
    // 活动相关提醒
    ACTIVITY_REGISTRATION: 'activity_registration',  // 活动报名提醒
    ACTIVITY_CHECKIN: 'activity_checkin',           // 活动签到提醒
    ACTIVITY_START: 'activity_start',               // 活动开始提醒
    ACTIVITY_END: 'activity_end',                   // 活动结束提醒
    
    // 自定义提醒
    CUSTOM: 'custom',                               // 用户自定义提醒
    
    // 系统提醒
    SYSTEM_NOTIFICATION: 'system_notification'      // 系统通知
};

// 提醒类型配置
const REMINDER_TYPE_CONFIG = {
    [REMINDER_TYPES.ACTIVITY_REGISTRATION]: {
        name: '活动报名提醒',
        description: '提醒用户活动报名即将开始',
        defaultTitle: '活动报名即将开始',
        defaultAdvanceMinutes: 60, // 默认提前1小时
        maxAdvanceMinutes: 1440,   // 最多提前24小时
        minAdvanceMinutes: 5,      // 最少提前5分钟
        templateId: process.env.WX_ACTIVITY_REGISTRATION_TEMPLATE_ID,
        messageTemplate: {
            thing1: { value: '活动报名' },
            time2: { value: '{{activity.start_time}}' },
            thing3: { value: '{{activity.title}}' },
            thing4: { value: '请及时报名' }
        }
    },
    
    [REMINDER_TYPES.ACTIVITY_CHECKIN]: {
        name: '活动签到提醒',
        description: '提醒用户活动签到即将开始',
        defaultTitle: '活动签到提醒',
        defaultAdvanceMinutes: 30, // 默认提前30分钟
        maxAdvanceMinutes: 120,    // 最多提前2小时
        minAdvanceMinutes: 5,      // 最少提前5分钟
        templateId: 'qGMRjUI1DJpz_6iZm-6TwAcCHDIKsTbEh2M5g1FRBlQ', // 你提供的模板ID
        messageTemplate: {
            thing1: { value: '{{activity.title}}' },        // 活动名称
            time16: { value: '{{checkin_time}}' }            // 签到时间
        }
    },
    
    [REMINDER_TYPES.ACTIVITY_START]: {
        name: '活动开始提醒',
        description: '提醒用户活动即将开始',
        defaultTitle: '活动即将开始',
        defaultAdvanceMinutes: 30, // 默认提前30分钟
        maxAdvanceMinutes: 1440,   // 最多提前24小时
        minAdvanceMinutes: 5,      // 最少提前5分钟
        templateId: process.env.WX_ACTIVITY_START_TEMPLATE_ID,
        messageTemplate: {
            thing1: { value: '{{activity.title}}' },
            time2: { value: '{{activity.start_time}}' },
            thing3: { value: '{{activity.location}}' },
            thing4: { value: '{{activity.organizer}}' }
        }
    },
    
    [REMINDER_TYPES.ACTIVITY_END]: {
        name: '活动结束提醒',
        description: '提醒用户活动即将结束',
        defaultTitle: '活动即将结束',
        defaultAdvanceMinutes: 30, // 默认提前30分钟
        maxAdvanceMinutes: 120,    // 最多提前2小时
        minAdvanceMinutes: 5,      // 最少提前5分钟
        templateId: process.env.WX_ACTIVITY_END_TEMPLATE_ID,
        messageTemplate: {
            thing1: { value: '{{activity.title}}' },
            time2: { value: '{{activity.end_time}}' },
            thing3: { value: '活动即将结束' },
            thing4: { value: '请及时参与' }
        }
    },
    
    [REMINDER_TYPES.CUSTOM]: {
        name: '自定义提醒',
        description: '用户自定义的提醒内容',
        defaultTitle: '自定义提醒',
        defaultAdvanceMinutes: 30,
        maxAdvanceMinutes: 10080,  // 最多提前7天
        minAdvanceMinutes: 1,      // 最少提前1分钟
        templateId: process.env.WX_CUSTOM_TEMPLATE_ID,
        messageTemplate: {
            thing1: { value: '{{reminder.title}}' },
            time2: { value: '{{reminder.remind_start_time}}' },
            thing3: { value: '{{reminder.description}}' },
            thing4: { value: '请及时查看' }
        }
    },
    
    [REMINDER_TYPES.SYSTEM_NOTIFICATION]: {
        name: '系统通知',
        description: '系统发送的通知消息',
        defaultTitle: '系统通知',
        defaultAdvanceMinutes: 0,  // 立即发送
        maxAdvanceMinutes: 10080,  // 最多提前7天
        minAdvanceMinutes: 0,      // 可以立即发送
        templateId: process.env.WX_SYSTEM_TEMPLATE_ID,
        messageTemplate: {
            thing1: { value: '{{reminder.title}}' },
            time2: { value: '{{reminder.remind_start_time}}' },
            thing3: { value: '{{reminder.description}}' },
            thing4: { value: '系统通知' }
        }
    }
};

// 获取提醒类型配置
function getReminderTypeConfig(type) {
    return REMINDER_TYPE_CONFIG[type] || REMINDER_TYPE_CONFIG[REMINDER_TYPES.CUSTOM];
}

// 获取所有可用的提醒类型
function getAvailableReminderTypes() {
    return Object.keys(REMINDER_TYPE_CONFIG).map(type => ({
        type,
        ...REMINDER_TYPE_CONFIG[type]
    }));
}

// 验证提醒类型
function isValidReminderType(type) {
    return REMINDER_TYPES.hasOwnProperty(type) || REMINDER_TYPE_CONFIG.hasOwnProperty(type);
}

// 验证提前时间
function validateAdvanceTime(type, advanceMinutes) {
    const config = getReminderTypeConfig(type);
    return advanceMinutes >= config.minAdvanceMinutes && 
           advanceMinutes <= config.maxAdvanceMinutes;
}

module.exports = {
    REMINDER_TYPES,
    REMINDER_TYPE_CONFIG,
    getReminderTypeConfig,
    getAvailableReminderTypes,
    isValidReminderType,
    validateAdvanceTime
};
