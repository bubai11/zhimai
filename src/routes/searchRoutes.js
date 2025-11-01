const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');

// 统一搜索接口 - 支持活动和通知的综合搜索
router.get('/', searchController.unifiedSearch);

// 获取搜索建议
router.get('/suggestions', searchController.getSearchSuggestions);

// 获取搜索统计
router.get('/stats', searchController.getSearchStats);

// 搜索活动（单独接口，保持向后兼容）
router.get('/activities', searchController.searchActivities);

// 搜索通知（单独接口）
router.get('/notices', searchController.searchNotices);

module.exports = router;
