const activityService = require('../services/activityService');
const { Response } = require('../utils/response');
const logger = require('../utils/logger');

class ActivityController {
    /**
     * 获取活动列表
     */
    async getActivities(req, res) {
        try {
            const activities = await activityService.getAllActivities(req.query);
            res.json(Response.success(activities, '获取活动列表成功'));
        } catch (error) {
            logger.error('获取活动列表失败:', {
                error: error.message,
                stack: error.stack,
                query: req.query
            });
            res.status(500).json(Response.error(error.message || '获取活动列表失败'));
        }
    }

    /**
     * 获取活动详情
     */
    async getActivityById(req, res) {
        try {
            const activity = await activityService.getActivityById(
                req.params.id,
                req.user?.id // 传入当前用户ID（如果已登录）
            );
            if (!activity) {
                return res.status(404).json(Response.notFound('活动不存在'));
            }
            res.json(Response.success(activity, '获取活动详情成功'));
        } catch (error) {
            logger.error('获取活动详情失败:', {
                error: error.message,
                stack: error.stack,
                activityId: req.params.id
            });
            res.status(500).json(Response.error(error.message || '获取活动详情失败'));
        }
    }

    /**
     * 获取我收藏的活动列表
     */
    async getMyFavorites(req, res) {
        try {
            const userId = req.user?.id;
            if (!userId) {
                return res.status(401).json(Response.unauthorized('请先登录'));
            }

            const activities = await activityService.getMyFavorites(userId);
            res.json(Response.success(activities, '获取我的收藏列表成功'));
        } catch (error) {
            logger.error('获取我的收藏列表失败:', {
                error: error.message,
                stack: error.stack,
                userId: req.user?.id
            });
            res.status(500).json(Response.error('获取我的收藏列表失败'));
        }
    }

    /**
     * 收藏活动
     */
    async favoriteActivity(req, res) {
        try {
            const userId = req.user?.id;
            if (!userId) {
                return res.status(401).json(Response.unauthorized('请先登录'));
            }

            const activityId = req.params.id;
            const result = await activityService.favoriteActivity(activityId, userId);
            res.json(Response.success(result, '收藏活动成功'));
        } catch (error) {
            logger.error('收藏活动失败:', {
                error: error.message,
                stack: error.stack,
                userId: req.user?.id,
                activityId: req.params.id
            });

            if (error.message === '活动不存在') {
                res.status(404).json(Response.notFound(error.message));
            } else if (error.message === '该活动已在您的收藏列表中') {
                res.status(400).json(Response.badRequest(error.message));
            } else {
                res.status(500).json(Response.error('收藏活动失败，请稍后重试'));
            }
        }
    }

    /**
     * 取消收藏活动
     */
    async unfavoriteActivity(req, res) {
        try {
            const userId = req.user?.id;
            if (!userId) {
                return res.status(401).json(Response.unauthorized('请先登录'));
            }

            const activityId = req.params.id;
            await activityService.unfavoriteActivity(activityId, userId);
            res.json(Response.success(null, '取消收藏成功'));
        } catch (error) {
            logger.error('取消收藏失败:', {
                error: error.message,
                stack: error.stack,
                userId: req.user?.id,
                activityId: req.params.id
            });

            if (error.message === '未收藏该活动') {
                res.status(404).json(Response.notFound(error.message));
            } else {
                res.status(500).json(Response.error('取消收藏失败'));
            }
        }
    }

    /**
     * 创建活动（管理员）
     */
    async createActivity(req, res) {
        try {
            const activity = await activityService.createActivity(req.body);
            res.status(201).json(Response.success(activity, '创建活动成功'));
        } catch (error) {
            logger.error('创建活动失败:', {
                error: error.message,
                stack: error.stack,
                data: req.body
            });
            res.status(400).json(Response.badRequest(error.message || '创建活动失败'));
        }
    }

    /**
     * 更新活动（管理员）
     */
    async updateActivity(req, res) {
        try {
            const activity = await activityService.updateActivity(req.params.id, req.body);
            res.json(Response.success(activity, '更新活动成功'));
        } catch (error) {
            logger.error('更新活动失败:', {
                error: error.message,
                stack: error.stack,
                activityId: req.params.id,
                data: req.body
            });

            if (error.message === '活动不存在') {
                res.status(404).json(Response.notFound(error.message));
            } else {
                res.status(400).json(Response.badRequest(error.message || '更新活动失败'));
            }
        }
    }

    /**
     * 更新活动状态（管理员）
     */
    async updateActivityStatus(req, res) {
        try {
            const { status } = req.body;
            if (!status) {
                return res.status(400).json(Response.badRequest('状态不能为空'));
            }

            const activity = await activityService.updateActivityStatus(req.params.id, status);
            if (!activity) {
                return res.status(404).json(Response.notFound('活动不存在'));
            }
            res.json(Response.success(activity, '更新活动状态成功'));
        } catch (error) {
            logger.error('更新活动状态失败:', {
                error: error.message,
                stack: error.stack,
                activityId: req.params.id,
                status: req.body.status
            });
            res.status(400).json(Response.badRequest(error.message || '更新活动状态失败'));
        }
    }

    /**
     * 删除活动（管理员）
     */
    async deleteActivity(req, res) {
        try {
            await activityService.deleteActivity(req.params.id);
            res.json(Response.success(null, '删除活动成功'));
        } catch (error) {
            logger.error('删除活动失败:', {
                error: error.message,
                stack: error.stack,
                activityId: req.params.id
            });

            if (error.message === '活动不存在') {
                res.status(404).json(Response.notFound(error.message));
            } else {
                res.status(500).json(Response.error('删除活动失败'));
            }
        }
    }

    /**
     * 获取活动统计信息
     */
    async getActivityStatistics(req, res) {
        try {
            const statistics = await activityService.getActivityStatistics();
            res.json(Response.success(statistics, '获取活动统计成功'));
        } catch (error) {
            logger.error('获取活动统计失败:', {
                error: error.message,
                stack: error.stack
            });
            res.status(500).json(Response.error('获取活动统计失败'));
        }
    }

    /**
     * 获取热门活动
     */
    async getPopularActivities(req, res) {
        try {
            const { limit = 10 } = req.query;
            const activities = await activityService.getPopularActivities(limit);
            res.json(Response.success(activities, '获取热门活动成功'));
        } catch (error) {
            logger.error('获取热门活动失败:', {
                error: error.message,
                stack: error.stack,
                query: req.query
            });
            res.status(500).json(Response.error('获取热门活动失败'));
        }
    }

    /**
     * 获取活动分类信息
     */
    async getActivityCategories(req, res) {
        try {
            const categories = await activityService.getActivityCategories();
            res.json(Response.success(categories, '获取活动分类成功'));
        } catch (error) {
            logger.error('获取活动分类失败:', {
                error: error.message,
                stack: error.stack
            });
            res.status(500).json(Response.error('获取活动分类失败'));
        }
    }
}

module.exports = new ActivityController();
