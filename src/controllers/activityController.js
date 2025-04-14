const activityService = require('../services/activityService');

class ActivityController {
    /**
     * 获取所有活动列表
     * @param {Object} req 请求对象
     * @param {Object} res 响应对象
     */
    async getAllActivities(req, res) {
        try {
            const activities = await activityService.getAllActivities();
            res.json({
                code: 200,
                message: '获取活动列表成功',
                data: activities
            });
        } catch (error) {
            console.error('获取活动列表错误:', error);
            res.status(500).json({
                code: 500,
                message: '服务器内部错误',
                data: null
            });
        }
    }

    /**
     * 创建新活动
     * @param {Object} req 请求对象
     * @param {Object} res 响应对象
     */
    async createActivity(req, res) {
        try {
            const activityData = {
                ...req.body,
                createdBy: req.user.id
            };
            const activity = await activityService.createActivity(activityData);
            res.json({
                code: 200,
                message: '创建活动成功',
                data: activity
            });
        } catch (error) {
            console.error('创建活动错误:', error);
            res.status(500).json({
                code: 500,
                message: '服务器内部错误',
                data: null
            });
        }
    }

    /**
     * 更新活动信息
     * @param {Object} req 请求对象
     * @param {Object} res 响应对象
     */
    async updateActivity(req, res) {
        try {
            const { id } = req.params;
            const result = await activityService.updateActivity(id, req.body);
            
            if (!result) {
                return res.status(404).json({
                    code: 404,
                    message: '活动不存在',
                    data: null
                });
            }

            res.json({
                code: 200,
                message: '更新活动成功',
                data: result
            });
        } catch (error) {
            console.error('更新活动错误:', error);
            res.status(500).json({
                code: 500,
                message: '服务器内部错误',
                data: null
            });
        }
    }

    /**
     * 删除活动
     * @param {Object} req 请求对象
     * @param {Object} res 响应对象
     */
    async deleteActivity(req, res) {
        try {
            const { id } = req.params;
            const result = await activityService.deleteActivity(id);

            if (!result) {
                return res.status(404).json({
                    code: 404,
                    message: '活动不存在',
                    data: null
                });
            }

            res.json({
                code: 200,
                message: '删除活动成功',
                data: null
            });
        } catch (error) {
            console.error('删除活动错误:', error);
            res.status(500).json({
                code: 500,
                message: '服务器内部错误',
                data: null
            });
        }
    }
}

module.exports = new ActivityController();
