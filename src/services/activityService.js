const { Activity, User, ActivityParticipant } = require('../models');
const { Op } = require('sequelize');
const logger = require('../utils/logger');

class ActivityService {
    /**
     * 获取活动列表（用户视图）
     * @param {Object} query 查询参数
     * @returns {Promise<Array>} 活动列表
     */
    async getAllActivities(query = {}) {
        try {
            const { type, status, startDate, endDate } = query;
            const where = {
                status: { [Op.ne]: '已取消' } // 不显示已取消的活动
            };

            if (type) where.activity_type = type;
            if (status) where.status = status;
            if (startDate) where.start_time = { [Op.gte]: startDate };
            if (endDate) where.end_time = { [Op.lte]: endDate };

            const activities = await Activity.findAll({
                where,
                attributes: { 
                    exclude: ['deleted_at']
                },
                include: [{
                    model: User,
                    as: 'creator',
                    attributes: ['id', 'username']
                }],
                order: [['start_time', 'DESC']]
            });

            return activities;
        } catch (error) {
            logger.error('获取活动列表失败:', error);
            throw error;
        }
    }

    /**
     * 获取活动详情（用户视图）
     * @param {number} id 活动ID
     * @returns {Promise<Object>} 活动详情
     */
    async getActivityById(id) {
        try {
            const activity = await Activity.findOne({
                where: { 
                    activity_id: id,
                    status: { [Op.ne]: '已取消' }
                },
                include: [{
                    model: User,
                    as: 'creator',
                    attributes: ['id', 'username']
                }]
            });

            return activity;
        } catch (error) {
            logger.error('获取活动详情失败:', error);
            throw error;
        }
    }

    /**
     * 获取用户参与的活动列表
     * @param {number} userId 用户ID
     * @returns {Promise<Array>} 活动列表
     */
    async getMyActivities(userId) {
        try {
            const activities = await Activity.findAll({
                include: [{
                    model: ActivityParticipant,
                    where: { user_id: userId },
                    required: true
                }, {
                    model: User,
                    as: 'creator',
                    attributes: ['id', 'username']
                }],
                order: [['start_time', 'DESC']]
            });

            return activities;
        } catch (error) {
            logger.error('获取用户参与的活动列表失败:', error);
            throw error;
        }
    }

    /**
     * 参加活动
     * @param {number} activityId 活动ID
     * @param {number} userId 用户ID
     * @returns {Promise<Object>} 参与记录
     */
    async joinActivity(activityId, userId) {
        try {
            const activity = await Activity.findByPk(activityId);
            if (!activity) {
                throw new Error('活动不存在');
            }

            if (activity.status !== '未开始') {
                throw new Error('活动已开始或已结束，无法参加');
            }

            // 检查是否已参加
            const existingParticipation = await ActivityParticipant.findOne({
                where: {
                    activity_id: activityId,
                    user_id: userId
                }
            });

            if (existingParticipation) {
                throw new Error('已经参加过该活动');
            }

            // 检查人数限制
            const participantsCount = await ActivityParticipant.count({
                where: { activity_id: activityId }
            });

            if (activity.max_participants && participantsCount >= activity.max_participants) {
                throw new Error('活动人数已满');
            }

            // 创建参与记录
            const participation = await ActivityParticipant.create({
                activity_id: activityId,
                user_id: userId,
                join_time: new Date()
            });

            return participation;
        } catch (error) {
            logger.error('参加活动失败:', error);
            throw error;
        }
    }

    /**
     * 退出活动
     * @param {number} activityId 活动ID
     * @param {number} userId 用户ID
     * @returns {Promise<boolean>} 是否成功
     */
    async leaveActivity(activityId, userId) {
        try {
            const activity = await Activity.findByPk(activityId);
            if (!activity) {
                throw new Error('活动不存在');
            }

            if (activity.status !== '未开始') {
                throw new Error('活动已开始或已结束，无法退出');
            }

            const participation = await ActivityParticipant.findOne({
                where: {
                    activity_id: activityId,
                    user_id: userId
                }
            });

            if (!participation) {
                throw new Error('未参加该活动');
            }

            await participation.destroy();
            return true;
        } catch (error) {
            logger.error('退出活动失败:', error);
            throw error;
        }
    }

    /**
     * 获取活动列表（管理员视图）
     * @param {Object} query 查询参数
     * @returns {Promise<Array>} 活动列表
     */
    async getAdminActivities(query = {}) {
        try {
            const { type, status, startDate, endDate, organizer } = query;
            const where = {};

            if (type) where.activity_type = type;
            if (status) where.status = status;
            if (startDate) where.start_time = { [Op.gte]: startDate };
            if (endDate) where.end_time = { [Op.lte]: endDate };
            if (organizer) where.organizer = { [Op.like]: `%${organizer}%` };

            const activities = await Activity.findAll({
                where,
                include: [{
                    model: User,
                    as: 'creator',
                    attributes: ['id', 'username']
                }, {
                    model: ActivityParticipant,
                    include: [{
                        model: User,
                        attributes: ['id', 'username']
                    }]
                }],
                order: [['created_at', 'DESC']]
            });

            return activities;
        } catch (error) {
            logger.error('获取活动列表失败:', error);
            throw error;
        }
    }

    /**
     * 获取活动详情（管理员视图）
     * @param {number} id 活动ID
     * @returns {Promise<Object>} 活动详情
     */
    async getAdminActivityById(id) {
        try {
            const activity = await Activity.findOne({
                where: { activity_id: id },
                include: [{
                    model: User,
                    as: 'creator',
                    attributes: ['id', 'username']
                }, {
                    model: ActivityParticipant,
                    include: [{
                        model: User,
                        attributes: ['id', 'username', 'email']
                    }]
                }]
            });

            return activity;
        } catch (error) {
            logger.error('获取活动详情失败:', error);
            throw error;
        }
    }

    /**
     * 创建新活动
     * @param {Object} activityData 活动数据
     * @returns {Promise<Object>} 创建的活动
     */
    async createActivity(activityData) {
        try {
            // 数据验证
            this.validateActivityData(activityData);

            const activity = await Activity.create(activityData);
            logger.info('活动创建成功:', { activityId: activity.activity_id });
            return activity;
        } catch (error) {
            logger.error('创建活动失败:', error);
            throw error;
        }
    }

    /**
     * 更新活动信息
     * @param {number} id 活动ID
     * @param {Object} updateData 更新数据
     * @returns {Promise<Object>} 更新后的活动
     */
    async updateActivity(id, updateData) {
        try {
            const activity = await Activity.findByPk(id);
            if (!activity) {
                return null;
            }

            // 数据验证
            this.validateActivityData(updateData, true);

            // 如果活动已开始，只允许更新特定字段
            if (activity.status !== '未开始') {
                const allowedFields = ['description', 'image_url', 'link'];
                Object.keys(updateData).forEach(key => {
                    if (!allowedFields.includes(key)) {
                        delete updateData[key];
                    }
                });
            }

            await activity.update(updateData);
            logger.info('活动更新成功:', { activityId: id });
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
     * 删除活动
     * @param {number} id 活动ID
     * @returns {Promise<boolean>} 是否删除成功
     */
    async deleteActivity(id) {
        try {
            const activity = await Activity.findByPk(id);
            if (!activity) {
                return false;
            }

            if (activity.status !== '未开始') {
                throw new Error('只能删除未开始的活动');
            }

            await activity.destroy();
            logger.info('活动删除成功:', { activityId: id });
            return true;
        } catch (error) {
            logger.error('删除活动失败:', error);
            throw error;
        }
    }

    /**
     * 验证活动数据
     * @param {Object} data 活动数据
     * @param {boolean} isUpdate 是否是更新操作
     */
    validateActivityData(data, isUpdate = false) {
        const requiredFields = ['title', 'start_time', 'end_time', 'activity_type', 'credit_type'];
        
        if (!isUpdate) {
            requiredFields.forEach(field => {
                if (!data[field]) {
                    throw new Error(`${field} 不能为空`);
                }
            });
        }

        if (data.start_time && data.end_time) {
            const startTime = new Date(data.start_time);
            const endTime = new Date(data.end_time);
            
            if (startTime >= endTime) {
                throw new Error('结束时间必须晚于开始时间');
            }
        }

        if (data.max_participants !== null && data.max_participants !== undefined) {
            if (!Number.isInteger(data.max_participants) || data.max_participants <= 0) {
                throw new Error('最大参与人数必须是正整数');
            }
        }
    }

    /**
     * 验证状态转换的合法性
     * @param {string} currentStatus 当前状态
     * @param {string} newStatus 新状态
     */
    validateStatusTransition(currentStatus, newStatus) {
        const validStatus = ['未开始', '进行中', '已结束', '已取消'];
        if (!validStatus.includes(newStatus)) {
            throw new Error('无效的状态值');
        }

        // 定义状态转换规则
        const validTransitions = {
            '未开始': ['进行中', '已取消'],
            '进行中': ['已结束', '已取消'],
            '已结束': [],
            '已取消': []
        };

        if (!validTransitions[currentStatus].includes(newStatus)) {
            throw new Error('非法的状态转换');
        }
    }
}

module.exports = new ActivityService(); 