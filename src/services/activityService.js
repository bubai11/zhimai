const { Activity, User } = require('../models');
const logger = require('../utils/logger');

class ActivityService {
    /**
     * 获取所有活动列表
     * @param {Object} query 查询参数
     * @returns {Promise<Array>} 活动列表
     */
    async getAllActivities(query = {}) {
        try {
            const { type, status, startDate, endDate } = query;
            const where = {};

            if (type) where.type = type;
            if (status) where.status = status;
            if (startDate) where.startTime = { [Op.gte]: startDate };
            if (endDate) where.endTime = { [Op.lte]: endDate };

            const activities = await Activity.findAll({
                where,
                include: [{
                    model: User,
                    as: 'creator',
                    attributes: ['id', 'username']
                }],
                order: [['createdAt', 'DESC']]
            });

            return activities;
        } catch (error) {
            logger.error('获取活动列表失败:', error);
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
            const activity = await Activity.create(activityData);
            logger.info('活动创建成功:', { activityId: activity.id });
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

            await activity.update(updateData);
            logger.info('活动更新成功:', { activityId: id });
            return activity;
        } catch (error) {
            logger.error('更新活动失败:', error);
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

            await activity.destroy();
            logger.info('活动删除成功:', { activityId: id });
            return true;
        } catch (error) {
            logger.error('删除活动失败:', error);
            throw error;
        }
    }
}

module.exports = new ActivityService(); 