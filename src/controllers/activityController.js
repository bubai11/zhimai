const { Activity } = require('../models/activity');
const logger = require('../utils/logger');

// 获取活动列表
exports.getActivities = async (req, res) => {
  try {
    const { activity_type, credit_type, status } = req.query;
    
    // 构建查询条件
    const where = {};
    if (activity_type) {
      where.activity_type = activity_type;
    }
    if (credit_type) {
      where.credit_type = credit_type;
    }
    if (status) {
      where.status = status;
    }

    // 查询活动列表
    const activities = await Activity.findAll({
      where,
      order: [['created_at', 'DESC']]
    });

    logger.info('获取活动列表成功', { count: activities.length });
    res.json(activities);
  } catch (error) {
    logger.error('获取活动列表失败', { error: error.message });
    res.status(500).json({
      error: '获取活动列表失败',
      message: error.message
    });
  }
};

// 获取单个活动详情
exports.getActivityById = async (req, res) => {
  try {
    const { id } = req.params;
    const activity = await Activity.findByPk(id);
    
    if (!activity) {
      return res.status(404).json({
        error: '活动不存在'
      });
    }

    res.json(activity);
  } catch (error) {
    logger.error('获取活动详情失败', { error: error.message, id: req.params.id });
    res.status(500).json({
      error: '获取活动详情失败',
      message: error.message
    });
  }
};

// 创建新活动
exports.createActivity = async (req, res) => {
  try {
    const activity = await Activity.create(req.body);
    logger.info('创建活动成功', { activity_id: activity.activity_id });
    res.status(201).json(activity);
  } catch (error) {
    logger.error('创建活动失败', { error: error.message });
    res.status(500).json({
      error: '创建活动失败',
      message: error.message
    });
  }
};

// 更新活动信息
exports.updateActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Activity.update(req.body, {
      where: { activity_id: id }
    });

    if (updated) {
      const updatedActivity = await Activity.findByPk(id);
      logger.info('更新活动成功', { activity_id: id });
      return res.json(updatedActivity);
    }

    return res.status(404).json({
      error: '活动不存在'
    });
  } catch (error) {
    logger.error('更新活动失败', { error: error.message, id: req.params.id });
    res.status(500).json({
      error: '更新活动失败',
      message: error.message
    });
  }
};

// 删除活动
exports.deleteActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Activity.destroy({
      where: { activity_id: id }
    });

    if (deleted) {
      logger.info('删除活动成功', { activity_id: id });
      return res.status(204).send();
    }

    return res.status(404).json({
      error: '活动不存在'
    });
  } catch (error) {
    logger.error('删除活动失败', { error: error.message, id: req.params.id });
    res.status(500).json({
      error: '删除活动失败',
      message: error.message
    });
  }
};
