const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');
const { verifyToken } = require('../middleware/authMiddleware');

// 上传头像接口
router.post('/avatar', verifyToken, uploadController.getUploadMiddleware(), uploadController.uploadAvatar);

// 删除头像接口
router.delete('/avatar', verifyToken, uploadController.deleteAvatar);

module.exports = router;
