const activityService = require('../services/activityService');
const Response = require('../utils/response');
const logger = require('../utils/logger');

class ActivityController {
    /**
     * 获取活动列表（用户视图）
     * @param {Object} req 请求对象
     * @param {Object} res 响应对象
     */
    async getAllActivities(req, res) {
        try {
            const activities = await activityService.getAllActivities(req.query);
            res.json(Response.success(activities, '获取活动列表成功'));
        } catch (error) {
            logger.error('获取活动列表错误:', error);
            res.status(500).json(Response.error(error.message));
        }
    }

    /**
     * 获取活动详情（用户视图）
     * @param {Object} req 请求对象
     * @param {Object} res 响应对象
     */
    async getActivityById(req, res) {
        try {
            const { id } = req.params;
            const activity = await activityService.getActivityById(id);
            if (!activity) {
                return res.status(404).json(Response.notFound('活动不存在'));
            }
            res.json(Response.success(activity, '获取活动详情成功'));
        } catch (error) {
            logger.error('获取活动详情错误:', error);
            res.status(500).json(Response.error(error.message));
        }
    }

    /**
     * 获取我参与的活动
     * @param {Object} req 请求对象
     * @param {Object} res 响应对象
     */
    async getMyActivities(req, res) {
        try {
            const activities = await activityService.getMyActivities(req.user.id);
            res.json(Response.success(activities, '获取我的活动列表成功'));
        } catch (error) {
            logger.error('获取我的活动列表错误:', error);
            res.status(500).json(Response.error(error.message));
        }
    }

    /**
     * 参加活动
     * @param {Object} req 请求对象
     * @param {Object} res 响应对象
     */
    async joinActivity(req, res) {
        try {
            const { id } = req.params;
            const result = await activityService.joinActivity(id, req.user.id);
            res.json(Response.success(result, '参加活动成功'));
        } catch (error) {
            logger.error('参加活动错误:', error);
            if (error.message === '活动不存在') {
                res.status(404).json(Response.notFound(error.message));
            } else if (error.message === '活动人数已满' || error.message === '已经参加过该活动') {
                res.status(400).json(Response.badRequest(error.message));
            } else {
                res.status(500).json(Response.error(error.message));
            }
        }
    }

    /**
     * 退出活动
     * @param {Object} req 请求对象
     * @param {Object} res 响应对象
     */
    async leaveActivity(req, res) {
        try {
            const { id } = req.params;
            const result = await activityService.leaveActivity(id, req.user.id);
            res.json(Response.success(result, '退出活动成功'));
        } catch (error) {
            logger.error('退出活动错误:', error);
            if (error.message === '活动不存在' || error.message === '未参加该活动') {
                res.status(404).json(Response.notFound(error.message));
            } else {
                res.status(500).json(Response.error(error.message));
            }
        }
    }

    // 管理员接口
    /**
     * 获取活动列表（管理员视图）
     * @param {Object} req 请求对象
     * @param {Object} res 响应对象
     */
    async getAdminActivities(req, res) {
        try {
            const activities = await activityService.getAdminActivities(req.query);
            res.json(Response.success(activities, '获取活动列表成功'));
        } catch (error) {
            logger.error('获取活动列表错误:', error);
            res.status(500).json(Response.error(error.message));
        }
    }

    /**
     * 获取活动详情（管理员视图）
     * @param {Object} req 请求对象
     * @param {Object} res 响应对象
     */
    async getAdminActivityById(req, res) {
        try {
            const { id } = req.params;
            const activity = await activityService.getAdminActivityById(id);
            if (!activity) {
                return res.status(404).json(Response.notFound('活动不存在'));
            }
            res.json(Response.success(activity, '获取活动详情成功'));
        } catch (error) {
            logger.error('获取活动详情错误:', error);
            res.status(500).json(Response.error(error.message));
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
                created_by: req.user.id
            };
            const activity = await activityService.createActivity(activityData);
            res.json(Response.success(activity, '创建活动成功'));
        } catch (error) {
            logger.error('创建活动错误:', error);
            if (error.name === 'ValidationError') {
                res.status(400).json(Response.badRequest(error.message));
            } else {
                res.status(500).json(Response.error(error.message));
            }
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
                return res.status(404).json(Response.notFound('活动不存在'));
            }
            res.json(Response.success(result, '更新活动成功'));
        } catch (error) {
            logger.error('更新活动错误:', error);
            if (error.name === 'ValidationError') {
                res.status(400).json(Response.badRequest(error.message));
            } else {
                res.status(500).json(Response.error(error.message));
            }
        }
    }

    /**
     * 更新活动状态
     * @param {Object} req 请求对象
     * @param {Object} res 响应对象
     */
    async updateActivityStatus(req, res) {
        try {
            const { id } = req.params;
            const { status } = req.body;
            
            if (!status) {
                return res.status(400).json(Response.badRequest('状态不能为空'));
            }

            const activity = await activityService.updateActivityStatus(id, status);
            if (!activity) {
                return res.status(404).json(Response.notFound('活动不存在'));
            }
            res.json(Response.success(activity, '更新活动状态成功'));
        } catch (error) {
            logger.error('更新活动状态错误:', error);
            res.status(500).json(Response.error(error.message));
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
                return res.status(404).json(Response.notFound('活动不存在'));
            }
            res.json(Response.success(null, '删除活动成功'));
        } catch (error) {
            logger.error('删除活动错误:', error);
            res.status(500).json(Response.error(error.message));
        }
    }
}

module.exports = new ActivityController();
