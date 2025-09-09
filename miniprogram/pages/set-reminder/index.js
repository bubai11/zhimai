const app = getApp();

Page({
    data: {
        activity: null,
        reminderType: 'activity', // 默认为活动提醒
        reminderTypes: [
            { value: 'activity', label: '活动开始提醒' },
            { value: 'checkin', label: '签到提醒' },
            { value: 'custom', label: '自定义提醒' }
        ],
        reminderDate: '',
        reminderTime: '',
        customTitle: '', // 自定义提醒标题
        checkinEndTime: '', // 签到结束时间
        templateIds: {
            activity: process.env.WX_ACTIVITY_TEMPLATE_ID,
            todo: process.env.WX_TODO_TEMPLATE_ID
        }
    },

    onLoad(options) {
        const activity = app.globalData.currentActivity;
        if (!activity) {
            wx.showToast({
                title: '未找到活动信息',
                icon: 'error'
            });
            setTimeout(() => wx.navigateBack(), 1500);
            return;
        }

        // 设置默认提醒时间为活动开始前30分钟
        const startTime = new Date(activity.start_time);
        const defaultReminderTime = new Date(startTime.getTime() - 30 * 60000);
        
        this.setData({
            activity,
            reminderDate: defaultReminderTime.toLocaleDateString(),
            reminderTime: defaultReminderTime.toLocaleTimeString().slice(0, 5)
        });
    },

    // 选择提醒类型
    onReminderTypeChange(e) {
        this.setData({
            reminderType: e.detail.value
        });
    },

    // 选择提醒日期
    onDateChange(e) {
        this.setData({
            reminderDate: e.detail.value
        });
    },

    // 选择提醒时间
    onTimeChange(e) {
        this.setData({
            reminderTime: e.detail.value
        });
    },

    // 选择签到结束时间（仅签到提醒类型）
    onCheckinEndTimeChange(e) {
        this.setData({
            checkinEndTime: e.detail.value
        });
    },

    // 输入自定义提醒标题
    onCustomTitleInput(e) {
        this.setData({
            customTitle: e.detail.value
        });
    },

    // 保存提醒设置
    async saveReminder() {
        const { activity, reminderType, reminderDate, reminderTime, customTitle, checkinEndTime } = this.data;

        // 验证提醒时间
        const reminderDateTime = new Date(`${reminderDate} ${reminderTime}`);
        const now = new Date();
        if (reminderDateTime <= now) {
            wx.showToast({
                title: '提醒时间必须大于当前时间',
                icon: 'none'
            });
            return;
        }

        // 验证活动开始时间
        const activityStartTime = new Date(activity.start_time);
        if (reminderDateTime >= activityStartTime) {
            wx.showToast({
                title: '提醒时间必须早于活动开始时间',
                icon: 'none'
            });
            return;
        }

        // 根据提醒类型选择模板ID
        const templateId = reminderType === 'activity' 
            ? this.data.templateIds.activity 
            : this.data.templateIds.todo;

        // 请求订阅消息授权
        try {
            const subscribeResult = await wx.requestSubscribeMessage({
                tmplIds: [templateId]
            });

            if (subscribeResult[templateId] === 'accept') {
                // 准备提醒数据
                const reminderData = {
                    activity_id: activity.activity_id,
                    type: reminderType,
                    remind_start_time: reminderDateTime.toISOString(),
                    title: customTitle || undefined
                };

                // 如果是签到提醒，添加签到结束时间
                if (reminderType === 'checkin' && checkinEndTime) {
                    const checkinEndDateTime = new Date(`${reminderDate} ${checkinEndTime}`);
                    if (checkinEndDateTime <= reminderDateTime) {
                        wx.showToast({
                            title: '签到结束时间必须晚于提醒时间',
                            icon: 'none'
                        });
                        return;
                    }
                    reminderData.checkin_end_time = checkinEndDateTime.toISOString();
                }

                // 调用后端API创建提醒
                const response = await wx.cloud.callContainer({
                    config: {
                        env: process.env.CONTAINER_ENV
                    },
                    path: '/api/reminders',
                    method: 'POST',
                    data: reminderData
                });

                if (response.statusCode === 201) {
                    wx.showToast({
                        title: '提醒设置成功',
                        icon: 'success'
                    });
                    setTimeout(() => wx.navigateBack(), 1500);
                } else {
                    throw new Error('创建提醒失败');
                }
            } else {
                wx.showToast({
                    title: '需要授权才能设置提醒',
                    icon: 'none'
                });
            }
        } catch (error) {
            console.error('设置提醒失败:', error);
            wx.showToast({
                title: '设置提醒失败',
                icon: 'error'
            });
        }
    }
}); 