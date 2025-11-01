const multer = require('multer');
const ossService = require('../services/ossService');
const userService = require('../services/userService');
const { Response } = require('../utils/response');
const logger = require('../utils/logger');

// 配置multer用于文件上传
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
        files: 1
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('不支持的文件类型，请上传 JPEG、PNG 或 WebP 格式的图片'), false);
        }
    }
});

class UploadController {
    /**
     * 上传头像到OSS
     */
    async uploadAvatar(req, res) {
        try {
            const userId = req.user?.id;
            if (!userId) {
                return res.status(401).json(Response.unauthorized('请先登录'));
            }

            if (!req.file) {
                return res.status(400).json(Response.badRequest('请选择要上传的图片'));
            }

            // 上传到OSS
            const uploadResult = await ossService.uploadAvatar(
                req.file.buffer,
                req.file.originalname,
                userId
            );

            // 更新用户头像URL
            await userService.updateUserProfile(userId, {
                avatarUrl: uploadResult.originalUrl
            });

            logger.info('头像上传到OSS成功:', {
                userId: userId,
                fileName: uploadResult.fileName,
                url: uploadResult.originalUrl
            });

            res.json(Response.success({
                url: uploadResult.originalUrl,
                urls: uploadResult.urls,
                fileName: uploadResult.fileName,
                size: uploadResult.size
            }, '头像上传成功'));

        } catch (error) {
            logger.error('上传头像失败:', error);
            res.status(500).json(Response.error(error.message || '头像上传失败'));
        }
    }

    /**
     * 删除头像
     */
    async deleteAvatar(req, res) {
        try {
            const userId = req.user?.id;
            if (!userId) {
                return res.status(401).json(Response.unauthorized('请先登录'));
            }

            // 获取当前用户信息
            const user = await userService.getUserProfile(userId);
            if (!user || !user.avatarUrl) {
                return res.status(404).json(Response.notFound('用户头像不存在'));
            }

            // 从URL中提取文件名
            const fileName = this._extractFileNameFromUrl(user.avatarUrl);
            if (fileName) {
                // 删除OSS文件
                await ossService.deleteFile(fileName);
            }

            // 清空用户头像URL
            await userService.updateUserProfile(userId, {
                avatarUrl: null
            });

            logger.info('头像删除成功:', {
                userId: userId,
                fileName: fileName
            });

            res.json(Response.success({
                message: '头像删除成功'
            }, '头像删除成功'));

        } catch (error) {
            logger.error('删除头像失败:', error);
            res.status(500).json(Response.error(error.message || '删除头像失败'));
        }
    }

    /**
     * 从URL中提取文件名
     * @param {string} url OSS URL
     * @returns {string|null} 文件名
     */
    _extractFileNameFromUrl(url) {
        try {
            const urlObj = new URL(url);
            const pathname = urlObj.pathname;
            // 从路径中提取文件名，例如：/avatars/123/1234567890_abcdef.jpg
            const match = pathname.match(/\/avatars\/\d+\/(.+)$/);
            return match ? `avatars/${match[1]}` : null;
        } catch (error) {
            return null;
        }
    }

    /**
     * 获取multer中间件
     */
    getUploadMiddleware() {
        return upload.single('avatar');
    }
}

module.exports = new UploadController();
