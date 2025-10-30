const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activityController');
const { verifyToken } = require('../middleware/authMiddleware');
const { verifyAdminToken, checkAdminRole } = require('../middleware/adminAuthMiddleware');

// 公开接口
router.get('/', activityController.getActivities);  // 获取活动列表
router.get('/categories', activityController.getActivityCategories);  // 获取活动分类
router.get('/:id', activityController.getActivityById);  // 获取活动详情

// 用户接口（需要用户token认证）
const userRouter = express.Router();
userRouter.use(verifyToken);

userRouter.get('/favorites', activityController.getMyFavorites);  // 获取我的收藏列表
userRouter.post('/:id/favorite', activityController.favoriteActivity);  // 收藏活动
userRouter.delete('/:id/favorite', activityController.unfavoriteActivity);  // 取消收藏(该接口没用到,考虑移除)
userRouter.post('/:id/deleteFavorites', activityController.deleteFavorites);//批量删除收藏
userRouter.delete('/:id/clearFavorites', activityController.clearFavorites);  //全部清空收藏

router.use('/user', userRouter);

// 管理员接口（需要管理员token认证）
const adminRouter = express.Router();
adminRouter.use(verifyAdminToken);
adminRouter.use(checkAdminRole(['admin', 'super_admin']));

adminRouter.post('/', activityController.createActivity);  // 创建活动
adminRouter.put('/:id', activityController.updateActivity);  // 更新活动
adminRouter.put('/:id/status', activityController.updateActivityStatus);  // 更新活动状态
adminRouter.delete('/:id', activityController.deleteActivity);  // 删除活动

router.use('/admin', adminRouter);

module.exports = router;
