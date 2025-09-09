Page({
    data: {
        reminders: []
    },

    onLoad() {
        this.loadReminders();
    },

    onShow() {
        this.loadReminders();
    },

    onPullDownRefresh() {
        this.loadReminders();
    },

    async loadReminders() {
        wx.showLoading({ title: '加载中...' });

        try {
            const result = await wx.cloud.callContainer({
                config: {
                    env: 'prod-7gn27kj6bba4c923'
                },
                path: '/api/reminders',
                header: {
                    'X-WX-TOKEN': wx.getStorageSync('token')
                },
                method: 'GET'
            });

            if (result.data.code === 0) {
                // 格式化日期显示
                const reminders = result.data.data.map(item => ({
                    ...item,
                    remind_start_time: new Date(item.remind_start_time).toLocaleString(),
                    'activity.start_time': new Date(item.activity.start_time).toLocaleString()
                }));

                this.setData({ reminders });
            } else {
                throw new Error(result.data.message);
            }
        } catch (error) {
            wx.showToast({
                title: error.message || '加载失败',
                icon: 'none'
            });
        } finally {
            wx.hideLoading();
            wx.stopPullDownRefresh();
        }
    },

    async handleDelete(e) {
        const { id } = e.currentTarget.dataset;

        wx.showModal({
            title: '确认删除',
            content: '确定要删除这个提醒吗？',
            success: async (res) => {
                if (res.confirm) {
                    wx.showLoading({ title: '删除中...' });

                    try {
                        const result = await wx.cloud.callContainer({
                            config: {
                                env: 'prod-7gn27kj6bba4c923'
                            },
                            path: `/api/reminders/${id}`,
                            header: {
                                'X-WX-TOKEN': wx.getStorageSync('token')
                            },
                            method: 'DELETE'
                        });

                        if (result.data.code === 0) {
                            wx.showToast({
                                title: '删除成功',
                                icon: 'success'
                            });
                            this.loadReminders();
                        } else {
                            throw new Error(result.data.message);
                        }
                    } catch (error) {
                        wx.showToast({
                            title: error.message || '删除失败',
                            icon: 'none'
                        });
                    } finally {
                        wx.hideLoading();
                    }
                }
            }
        });
    }
}); 