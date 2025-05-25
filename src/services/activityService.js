const { Activity, User, Favorite } = require('../models');
const { Op } = require('sequelize');
const logger = require('../utils/logger');
const xss = require('xss');

class ActivityService {
    /**
     * 获取活动列表
     * @param {Object} query 查询参数
     * @returns {Promise<Object>} 分页后的活动列表
     */
    async getAllActivities(query = {}) {
        try {
            const { 
                type, 
                status, 
                startDate, 
                endDate, 
                organizer,
                keyword,
                page = 1, 
                pageSize = 10 
            } = query;

            const where = {};

            if (type) where.activity_type = type;
            if (status) where.status = status;
            if (startDate) where.start_time = { [Op.gte]: startDate };
            if (endDate) where.end_time = { [Op.lte]: endDate };
            if (organizer) where.organizer = { [Op.like]: `%${organizer}%` };
            if (keyword) {
                where[Op.or] = [
                    { title: { [Op.like]: `%${keyword}%` } },
                    { description: { [Op.like]: `%${keyword}%` } },
                    { organizer: { [Op.like]: `%${keyword}%` } }
                ];
            }

            // 自动更新活动状态
            await this.updateActivitiesStatus();

            const { count, rows: activities } = await Activity.findAndCountAll({
                where,
                attributes: [
                    'activity_id',
                    'title',
                    'start_time',
                    'end_time',
                    'location',
                    'target_audience',
                    'organizer',
                    'description',
                    'activity_type',
                    'credit_type',
                    'participation_channel',
                    'image_url',
                    'link',
                    'status',
                    'max_participants',
                    'created_at',
                    'updated_at'
                ],
                order: [['start_time', 'DESC']],
                offset: (page - 1) * pageSize,
                limit: pageSize
            });

            // 获取每个活动的收藏数
            const activitiesWithStats = await Promise.all(activities.map(async (activity) => {
                const favoriteCount = await Favorite.count({
                    where: { activity_id: activity.activity_id }
                });

                const activityData = activity.toJSON();
                return {
                    ...activityData,
                    statistics: {
                        favoriteCount
                    }
                };
            }));

            return {
                total: count,
                page: parseInt(page),
                pageSize: parseInt(pageSize),
                data: activitiesWithStats
            };
        } catch (error) {
            logger.error('获取活动列表失败:', error);
            throw new Error('获取活动列表失败');
        }
    }

    /**
     * 获取活动详情
     * @param {number} id 活动ID
     * @param {number} [userId] 当前用户ID（可选）
     * @returns {Promise<Object>} 活动详情
     */
    async getActivityById(id, userId = null) {
        try {
            const activity = await Activity.findByPk(id, {
                attributes: [
                    'activity_id',
                    'title',
                    'start_time',
                    'end_time',
                    'location',
                    'target_audience',
                    'organizer',
                    'description',
                    'activity_type',
                    'credit_type',
                    'participation_channel',
                    'image_url',
                    'link',
                    'status',
                    'max_participants',
                    'created_at',
                    'updated_at'
                ],
                include: [{
                    model: Favorite,
                    attributes: ['favorite_id'],
                    required: false,
                    where: userId ? { user_id: userId } : undefined
                }]
            });

            if (!activity) {
                throw new Error('活动不存在');
            }

            const activityData = activity.toJSON();
            const { Favorites, ...activityInfo } = activityData;  // 解构去除Favorites字段

            // 计算收藏信息
            const favorites = activityData.Favorites || [];
            const favoriteCount = await Favorite.count({
                where: { activity_id: id }
            });

            return {
                ...activityInfo,
                statistics: {
                    favoriteCount
                },
                isFavorited: favorites.length > 0
            };
        } catch (error) {
            logger.error('获取活动详情失败:', error);
            throw error;
        }
    }

    /**
     * 获取用户收藏的活动列表
     * @param {number} userId 用户ID
     * @returns {Promise<Array>} 活动列表
     */
    async getMyFavorites(userId) {
        try {
            const activities = await Activity.findAll({
                attributes: [
                    'activity_id',
                    'title',
                    'start_time',
                    'end_time',
                    'location',
                    'target_audience',
                    'organizer',
                    'description',
                    'activity_type',
                    'credit_type',
                    'participation_channel',
                    'image_url',
                    'link',
                    'status',
                    'max_participants',
                    'created_at',
                    'updated_at'
                ],
                include: [{
                    model: Favorite,
                    where: { user_id: userId },
                    required: true,
                    attributes: ['favorite_id', 'created_at']
                }],
                order: [['start_time', 'DESC']]
            });

            return activities.map(activity => {
                const activityData = activity.toJSON();
                return {
                    ...activityData,
                    favoriteTime: activityData.Favorites[0].created_at
                };
            });
        } catch (error) {
            logger.error('获取用户收藏的活动列表失败:', error);
            throw error;
        }
    }

    /**
     * 收藏活动
     * @param {number} activityId 活动ID
     * @param {number} userId 用户ID
     * @returns {Promise<Object>} 收藏记录
     */
    async favoriteActivity(activityId, userId) {
        try {
            const activity = await Activity.findByPk(activityId);
            if (!activity) {
                throw new Error('活动不存在');
            }

            // 检查是否已收藏
            const existingFavorite = await Favorite.findOne({
                where: {
                    activity_id: activityId,
                    user_id: userId
                }
            });

            if (existingFavorite) {
                throw new Error('已经收藏过该活动');
            }

            // 创建收藏记录
            const favorite = await Favorite.create({
                activity_id: activityId,
                user_id: userId
            });

            return favorite;
        } catch (error) {
            logger.error('收藏活动失败:', error);
            throw error;
        }
    }

    /**
     * 取消收藏活动
     * @param {number} activityId 活动ID
     * @param {number} userId 用户ID
     * @returns {Promise<boolean>} 是否成功
     */
    async unfavoriteActivity(activityId, userId) {
        try {
            const favorite = await Favorite.findOne({
                where: {
                    activity_id: activityId,
                    user_id: userId
                }
            });

            if (!favorite) {
                throw new Error('未收藏该活动');
            }

            await favorite.destroy();
            return true;
        } catch (error) {
            logger.error('取消收藏活动失败:', error);
            throw error;
        }
    }

    /**
     * 创建活动
     * @param {Object} activityData 活动数据
     * @returns {Promise<Object>} 创建的活动
     */
    async createActivity(activityData) {
        try {
            // 数据验证
            this.validateActivityData(activityData);

            // XSS过滤
            const sanitizedData = {
                ...activityData,
                title: xss(activityData.title),
                description: activityData.description ? xss(activityData.description) : null,
                location: activityData.location ? xss(activityData.location) : null,
                organizer: activityData.organizer ? xss(activityData.organizer) : null
            };

            const activity = await Activity.create(sanitizedData);
            return activity;
        } catch (error) {
            logger.error('创建活动失败:', error);
            throw error;
        }
    }

    /**
     * 更新活动
     * @param {number} id 活动ID
     * @param {Object} updateData 更新数据
     * @returns {Promise<Object>} 更新后的活动
     */
    async updateActivity(id, updateData) {
        try {
            const activity = await Activity.findByPk(id);

            if (!activity) {
                throw new Error('活动不存在');
            }

            // 数据验证
            this.validateActivityData(updateData, true);

            // XSS过滤
            const sanitizedData = {
                ...updateData,
                title: updateData.title ? xss(updateData.title) : undefined,
                description: updateData.description ? xss(updateData.description) : undefined,
                location: updateData.location ? xss(updateData.location) : undefined,
                organizer: updateData.organizer ? xss(updateData.organizer) : undefined
            };

            await activity.update(sanitizedData);
            return activity;
        } catch (error) {
            logger.error('更新活动失败:', error);
            throw error;
        }
    }

    /**
     * 更新活动状态
     * @param {number} id 活动ID
     * @param {string} status 新状态
     * @returns {Promise<Object>} 更新后的活动
     */
    async updateActivityStatus(id, status) {
        try {
            const activity = await Activity.findByPk(id);
            if (!activity) {
                return null;
            }

            // 验证状态转换的合法性
            this.validateStatusTransition(activity.status, status);

            await activity.update({ status });
            logger.info('活动状态更新成功:', { activityId: id, status });
            return activity;
        } catch (error) {
            logger.error('更新活动状态失败:', error);
            throw error;
        }
    }

    /**
     * 删除活动（软删除）
     * @param {number} id 活动ID
     * @returns {Promise<boolean>} 是否成功
     */
    async deleteActivity(id) {
        try {
            const activity = await Activity.findByPk(id);

            if (!activity) {
                throw new Error('活动不存在');
            }

            await activity.destroy();
            return true;
        } catch (error) {
            logger.error('删除活动失败:', error);
            throw error;
        }
    }

    /**
     * 自动更新活动状态
     * @private
     */
    async updateActivitiesStatus() {
        try {
            const now = new Date();

            // 更新进行中的活动
            await Activity.update(
                { status: '进行中' },
                {
                    where: {
                        start_time: { [Op.lte]: now },
                        end_time: { [Op.gt]: now },
                        status: '未开始'
                    }
                }
            );

            // 更新已结束的活动
            await Activity.update(
                { status: '已结束' },
                {
                    where: {
                        end_time: { [Op.lte]: now },
                        status: '进行中'
                    }
                }
            );
        } catch (error) {
            logger.error('更新活动状态失败:', error);
        }
    }

    /**
     * 验证活动数据
     * @param {Object} data 活动数据
     * @param {boolean} isUpdate 是否是更新操作
     * @private
     */
    validateActivityData(data, isUpdate = false) {
        const errors = [];

        if (!isUpdate || data.title !== undefined) {
            if (!data.title || data.title.trim().length === 0) {
                errors.push('活动标题不能为空');
            }
            if (data.title && data.title.length > 100) {
                errors.push('活动标题不能超过100个字符');
            }
        }

        if (!isUpdate || data.start_time !== undefined) {
            if (!data.start_time) {
                errors.push('开始时间不能为空');
            }
        }

        if (!isUpdate || data.end_time !== undefined) {
            if (!data.end_time) {
                errors.push('结束时间不能为空');
            }
            if (data.start_time && data.end_time && new Date(data.end_time) <= new Date(data.start_time)) {
                errors.push('结束时间必须晚于开始时间');
            }
        }

        if (errors.length > 0) {
            throw new Error(errors.join('; '));
        }
    }

    /**
     * 验证状态转换的合法性
     * @param {string} currentStatus 当前状态
     * @param {string} newStatus 新状态
     */
    validateStatusTransition(currentStatus, newStatus) {
        const validStatus = ['未开始', '进行中', '已结束'];
        if (!validStatus.includes(newStatus)) {
            throw new Error('无效的状态值');
        }

        // 定义状态转换规则
        const validTransitions = {
            '未开始': ['进行中'],
            '进行中': ['已结束'],
            '已结束': []
        };

        if (!validTransitions[currentStatus].includes(newStatus)) {
            throw new Error('非法的状态转换');
        }
    }
}

module.exports = new ActivityService(); 