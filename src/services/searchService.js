const { Activity, Notice } = require('../models');
const { Op } = require('sequelize');
const sequelize = require('../config/database');
const logger = require('../utils/logger');

class SearchService {
    /**
     * 统一搜索服务 - 支持活动和通知的综合搜索
     * @param {Object} query 查询参数
     * @returns {Promise<Object>} 搜索结果
     */
    async unifiedSearch(query = {}) {
        try {
            const { 
                keyword,        // 关键词搜索
                type = 'all',   // 搜索类型：all(全部), activity(活动), notice(通知)
                page = 1, 
                pageSize = 10,
                sortBy = 'relevance',  // 排序：relevance(相关性), time(时间)
                sortOrder = 'DESC'
            } = query;

            if (!keyword || keyword.trim() === '') {
                return {
                    activities: { count: 0, rows: [] },
                    notices: { count: 0, rows: [] },
                    total: 0,
                    page: parseInt(page),
                    pageSize: parseInt(pageSize)
                };
            }

            const searchKeyword = keyword.trim();
            const offset = (parseInt(page) - 1) * parseInt(pageSize);
            const limit = parseInt(pageSize);

            let activitiesResult = { count: 0, rows: [] };
            let noticesResult = { count: 0, rows: [] };

            // 根据搜索类型决定搜索哪些内容
            if (type === 'all' || type === 'activity') {
                activitiesResult = await this.searchActivities(searchKeyword, offset, limit, sortBy, sortOrder);
            }

            if (type === 'all' || type === 'notice') {
                noticesResult = await this.searchNotices(searchKeyword, offset, limit, sortBy, sortOrder);
            }

            // 计算总数
            const total = activitiesResult.count + noticesResult.count;

            return {
                activities: activitiesResult,
                notices: noticesResult,
                total,
                page: parseInt(page),
                pageSize: parseInt(pageSize),
                keyword: searchKeyword
            };

        } catch (error) {
            logger.error('统一搜索失败:', error);
            throw error;
        }
    }

    /**
     * 搜索活动
     * @param {string} keyword 关键词
     * @param {number} offset 偏移量
     * @param {number} limit 限制数量
     * @param {string} sortBy 排序字段
     * @param {string} sortOrder 排序方向
     * @returns {Promise<Object>} 搜索结果
     */
    async searchActivities(keyword, offset, limit, sortBy, sortOrder) {
        try {
            const where = {
                [Op.or]: [
                    { title: { [Op.like]: `%${keyword}%` } },
                    { description: { [Op.like]: `%${keyword}%` } },
                    { organizer: { [Op.like]: `%${keyword}%` } },
                    { location: { [Op.like]: `%${keyword}%` } },
                    { activity_type: { [Op.like]: `%${keyword}%` } },
                    { credit_type: { [Op.like]: `%${keyword}%` } },
                    { target_audience: { [Op.like]: `%${keyword}%` } }
                ]
            };

            // 排序配置
            let order = [];
            if (sortBy === 'time') {
                order = [['start_time', sortOrder]];
            } else {
                // 默认按时间排序，避免复杂的相关性排序
                order = [['start_time', 'DESC']];
            }

            const { count, rows } = await Activity.findAndCountAll({
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
                    'created_at'
                ],
                order,
                offset,
                limit
            });

            return { count, rows };

        } catch (error) {
            logger.error('搜索活动失败:', error);
            throw error;
        }
    }

    /**
     * 搜索通知
     * @param {string} keyword 关键词
     * @param {number} offset 偏移量
     * @param {number} limit 限制数量
     * @param {string} sortBy 排序字段
     * @param {string} sortOrder 排序方向
     * @returns {Promise<Object>} 搜索结果
     */
    async searchNotices(keyword, offset, limit, sortBy, sortOrder) {
        try {
            const where = {
                [Op.or]: [
                    { title: { [Op.like]: `%${keyword}%` } },
                    { content: { [Op.like]: `%${keyword}%` } },
                    { publisher: { [Op.like]: `%${keyword}%` } },
                    { campus: { [Op.like]: `%${keyword}%` } },
                    { college: { [Op.like]: `%${keyword}%` } },
                    { notice_type: { [Op.like]: `%${keyword}%` } }
                ]
            };

            // 排序配置
            let order = [];
            if (sortBy === 'time') {
                order = [['publish_time', sortOrder]];
            } else {
                // 默认按时间排序，避免复杂的相关性排序
                order = [['publish_time', 'DESC']];
            }

            const { count, rows } = await Notice.findAndCountAll({
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
                    'created_at'
                ],
                order,
                offset,
                limit
            });

            return { count, rows };

        } catch (error) {
            logger.error('搜索通知失败:', error);
            throw error;
        }
    }

    /**
     * 获取搜索建议（热门关键词）
     * @param {number} limit 限制数量
     * @returns {Promise<Array>} 搜索建议列表
     */
    async getSearchSuggestions(limit = 10) {
        try {
            // 这里可以实现基于历史搜索、热门活动等逻辑
            // 暂时返回一些示例数据
            const suggestions = [
                '讲座',
                '二课活动',
                '创新创业',
                '志愿服务',
                '学术竞赛',
                '文艺演出',
                '体育比赛',
                '社会实践',
                '社团活动',
                '就业指导'
            ];

            return suggestions.slice(0, limit);

        } catch (error) {
            logger.error('获取搜索建议失败:', error);
            throw error;
        }
    }

    /**
     * 获取搜索统计信息
     * @param {string} keyword 关键词
     * @returns {Promise<Object>} 统计信息
     */
    async getSearchStats(keyword) {
        try {
            const [activityCount, noticeCount] = await Promise.all([
                Activity.count({
                    where: {
                        [Op.or]: [
                            { title: { [Op.like]: `%${keyword}%` } },
                            { description: { [Op.like]: `%${keyword}%` } },
                            { organizer: { [Op.like]: `%${keyword}%` } },
                            { location: { [Op.like]: `%${keyword}%` } }
                        ]
                    }
                }),
                Notice.count({
                    where: {
                        [Op.or]: [
                            { title: { [Op.like]: `%${keyword}%` } },
                            { content: { [Op.like]: `%${keyword}%` } },
                            { publisher: { [Op.like]: `%${keyword}%` } }
                        ]
                    }
                })
            ]);

            return {
                keyword,
                activityCount,
                noticeCount,
                totalCount: activityCount + noticeCount
            };

        } catch (error) {
            logger.error('获取搜索统计失败:', error);
            throw error;
        }
    }
}

module.exports = new SearchService();
