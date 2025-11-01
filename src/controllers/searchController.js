const searchService = require('../services/searchService');
const { Response } = require('../utils/response');
const logger = require('../utils/logger');

class SearchController {
    /**
     * 统一搜索接口
     * 支持活动和通知的综合搜索
     */
    async unifiedSearch(req, res) {
        try {
            const { keyword, type, page, pageSize, sortBy, sortOrder } = req.query;

            // 参数验证
            if (!keyword || keyword.trim() === '') {
                return res.status(400).json(Response.badRequest('搜索关键词不能为空'));
            }

            // 验证搜索类型
            const validTypes = ['all', 'activity', 'notice'];
            if (type && !validTypes.includes(type)) {
                return res.status(400).json(Response.badRequest('搜索类型无效，支持的类型：all, activity, notice'));
            }

            // 验证排序字段
            const validSortFields = ['relevance', 'time'];
            if (sortBy && !validSortFields.includes(sortBy)) {
                return res.status(400).json(Response.badRequest('排序字段无效，支持的字段：relevance, time'));
            }

            // 验证排序方向
            const validSortOrders = ['ASC', 'DESC'];
            if (sortOrder && !validSortOrders.includes(sortOrder.toUpperCase())) {
                return res.status(400).json(Response.badRequest('排序方向无效，支持的方向：ASC, DESC'));
            }

            const result = await searchService.unifiedSearch({
                keyword: keyword.trim(),
                type: type || 'all',
                page: parseInt(page) || 1,
                pageSize: parseInt(pageSize) || 10,
                sortBy: sortBy || 'relevance',
                sortOrder: (sortOrder || 'DESC').toUpperCase()
            });

            res.json(Response.success(result, '搜索成功'));

        } catch (error) {
            logger.error('统一搜索失败:', {
                error: error.message,
                stack: error.stack,
                query: req.query
            });
            res.status(500).json(Response.error(error.message || '搜索失败'));
        }
    }

    /**
     * 获取搜索建议
     */
    async getSearchSuggestions(req, res) {
        try {
            const { limit } = req.query;
            const suggestions = await searchService.getSearchSuggestions(parseInt(limit) || 10);
            
            res.json(Response.success(suggestions, '获取搜索建议成功'));

        } catch (error) {
            logger.error('获取搜索建议失败:', error);
            res.status(500).json(Response.error(error.message || '获取搜索建议失败'));
        }
    }

    /**
     * 获取搜索统计
     */
    async getSearchStats(req, res) {
        try {
            const { keyword } = req.query;

            if (!keyword || keyword.trim() === '') {
                return res.status(400).json(Response.badRequest('搜索关键词不能为空'));
            }

            const stats = await searchService.getSearchStats(keyword.trim());
            res.json(Response.success(stats, '获取搜索统计成功'));

        } catch (error) {
            logger.error('获取搜索统计失败:', error);
            res.status(500).json(Response.error(error.message || '获取搜索统计失败'));
        }
    }

    /**
     * 搜索活动（单独接口，保持向后兼容）
     */
    async searchActivities(req, res) {
        try {
            const { keyword, page, pageSize, sortBy, sortOrder } = req.query;

            if (!keyword || keyword.trim() === '') {
                return res.status(400).json(Response.badRequest('搜索关键词不能为空'));
            }

            const result = await searchService.unifiedSearch({
                keyword: keyword.trim(),
                type: 'activity',
                page: parseInt(page) || 1,
                pageSize: parseInt(pageSize) || 10,
                sortBy: sortBy || 'relevance',
                sortOrder: (sortOrder || 'DESC').toUpperCase()
            });

            res.json(Response.success(result.activities, '搜索活动成功'));

        } catch (error) {
            logger.error('搜索活动失败:', error);
            res.status(500).json(Response.error(error.message || '搜索活动失败'));
        }
    }

    /**
     * 搜索通知（单独接口）
     */
    async searchNotices(req, res) {
        try {
            const { keyword, page, pageSize, sortBy, sortOrder } = req.query;

            if (!keyword || keyword.trim() === '') {
                return res.status(400).json(Response.badRequest('搜索关键词不能为空'));
            }

            const result = await searchService.unifiedSearch({
                keyword: keyword.trim(),
                type: 'notice',
                page: parseInt(page) || 1,
                pageSize: parseInt(pageSize) || 10,
                sortBy: sortBy || 'relevance',
                sortOrder: (sortOrder || 'DESC').toUpperCase()
            });

            res.json(Response.success(result.notices, '搜索通知成功'));

        } catch (error) {
            logger.error('搜索通知失败:', error);
            res.status(500).json(Response.error(error.message || '搜索通知失败'));
        }
    }
}

module.exports = new SearchController();
