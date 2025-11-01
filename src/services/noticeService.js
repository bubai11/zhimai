const { Notice } = require('../models');
const { Op } = require('sequelize');
const logger = require('../utils/logger');

class NoticeService {
    /**
     * 获取通知列表
     * @param {Object} query 查询参数
     * @returns {Promise<Object>} 分页后的通知列表
     */
    async getAllNotices(query = {}) {
        try {
            const { 
                keyword,        // 关键词搜索
                notice_type,    // 通知类型
                campus,         // 校区
                college,        // 学院
                publisher,      // 发布者
                startDate,      // 开始日期筛选
                endDate,        // 结束日期筛选
                sortBy = 'publish_time',    // 排序字段
                sortOrder = 'DESC',         // 排序方向
                page = 1, 
                pageSize = 10 
            } = query;

            const where = {};

            // 基础筛选条件
            if (notice_type) where.notice_type = notice_type;
            if (campus) where.campus = campus;
            if (college) where.college = college;
            if (publisher) where.publisher = { [Op.like]: `%${publisher}%` };
            
            // 时间范围筛选
            if (startDate) where.publish_time = { [Op.gte]: startDate };
            if (endDate) where.publish_time = { [Op.lte]: endDate };
            
            // 关键词搜索（标题、内容、发布者）
            if (keyword) {
                where[Op.or] = [
                    { title: { [Op.like]: `%${keyword}%` } },
                    { content: { [Op.like]: `%${keyword}%` } },
                    { publisher: { [Op.like]: `%${keyword}%` } },
                    { campus: { [Op.like]: `%${keyword}%` } },
                    { college: { [Op.like]: `%${keyword}%` } },
                    { notice_type: { [Op.like]: `%${keyword}%` } }
                ];
            }

            // 排序配置
            const validSortFields = ['publish_time', 'created_at', 'title', 'notice_type'];
            const validSortOrders = ['ASC', 'DESC'];
            const orderBy = validSortFields.includes(sortBy) ? sortBy : 'publish_time';
            const orderDir = validSortOrders.includes(sortOrder.toUpperCase()) ? sortOrder.toUpperCase() : 'DESC';

            const { count, rows: notices } = await Notice.findAndCountAll({
                where,
                attributes: [
                    'notice_id',
                    'title',
                    'publish_time',
                    'content',
                    'publisher',
                    'campus',
                    'grade_level',
                    'college',
                    'link',
                    'notice_type',
                    'created_at',
                    'updated_at'
                ],
                order: [[orderBy, orderDir]],
                offset: (parseInt(page) - 1) * parseInt(pageSize),
                limit: parseInt(pageSize)
            });

            return {
                notices,
                pagination: {
                    total: count,
                    page: parseInt(page),
                    pageSize: parseInt(pageSize),
                    totalPages: Math.ceil(count / parseInt(pageSize))
                }
            };

        } catch (error) {
            logger.error('获取通知列表失败:', error);
            throw error;
        }
    }

    /**
     * 根据ID获取通知详情
     * @param {number} noticeId 通知ID
     * @returns {Promise<Object|null>} 通知详情
     */
    async getNoticeById(noticeId) {
        try {
            const notice = await Notice.findByPk(noticeId);
            return notice;
        } catch (error) {
            logger.error('获取通知详情失败:', error);
            throw error;
        }
    }

    /**
     * 创建通知
     * @param {Object} noticeData 通知数据
     * @returns {Promise<Object>} 创建的通知
     */
    async createNotice(noticeData) {
        try {
            const notice = await Notice.create(noticeData);
            return notice;
        } catch (error) {
            logger.error('创建通知失败:', error);
            throw error;
        }
    }

    /**
     * 更新通知
     * @param {number} noticeId 通知ID
     * @param {Object} updateData 更新数据
     * @returns {Promise<Object|null>} 更新后的通知
     */
    async updateNotice(noticeId, updateData) {
        try {
            const [affectedCount] = await Notice.update(updateData, {
                where: { notice_id: noticeId }
            });

            if (affectedCount === 0) {
                return null;
            }

            return await this.getNoticeById(noticeId);
        } catch (error) {
            logger.error('更新通知失败:', error);
            throw error;
        }
    }

    /**
     * 软删除通知
     * @param {number} noticeId 通知ID
     * @returns {Promise<boolean>} 是否删除成功
     */
    async deleteNotice(noticeId) {
        try {
            const result = await Notice.destroy({
                where: { notice_id: noticeId }
            });
            return result > 0;
        } catch (error) {
            logger.error('删除通知失败:', error);
            throw error;
        }
    }

    /**
     * 恢复软删除的通知
     * @param {number} noticeId 通知ID
     * @returns {Promise<boolean>} 是否恢复成功
     */
    async restoreNotice(noticeId) {
        try {
            const result = await Notice.restore({
                where: { notice_id: noticeId }
            });
            return result > 0;
        } catch (error) {
            logger.error('恢复通知失败:', error);
            throw error;
        }
    }

    /**
     * 获取软删除的通知列表
     * @param {Object} query 查询参数
     * @returns {Promise<Object>} 软删除的通知列表
     */
    async getDeletedNotices(query = {}) {
        try {
            const { page = 1, pageSize = 10 } = query;

            const { count, rows: notices } = await Notice.findAndCountAll({
                where: {
                    deleted_at: { [Op.ne]: null }
                },
                attributes: [
                    'notice_id',
                    'title',
                    'publish_time',
                    'publisher',
                    'campus',
                    'college',
                    'notice_type',
                    'created_at',
                    'updated_at',
                    'deleted_at'
                ],
                order: [['deleted_at', 'DESC']],
                offset: (parseInt(page) - 1) * parseInt(pageSize),
                limit: parseInt(pageSize),
                paranoid: false  // 包含软删除的记录
            });

            return {
                notices,
                pagination: {
                    total: count,
                    page: parseInt(page),
                    pageSize: parseInt(pageSize),
                    totalPages: Math.ceil(count / parseInt(pageSize))
                }
            };
        } catch (error) {
            logger.error('获取软删除通知列表失败:', error);
            throw error;
        }
    }

    /**
     * 永久删除通知
     * @param {number} noticeId 通知ID
     * @returns {Promise<boolean>} 是否删除成功
     */
    async forceDeleteNotice(noticeId) {
        try {
            const result = await Notice.destroy({
                where: { notice_id: noticeId },
                force: true  // 永久删除
            });
            return result > 0;
        } catch (error) {
            logger.error('永久删除通知失败:', error);
            throw error;
        }
    }
}

module.exports = new NoticeService();
