const OSS = require('ali-oss');
const crypto = require('crypto');
const path = require('path');
const logger = require('../utils/logger');

class OSSService {
    constructor() {
        // 检查OSS配置是否存在
        this.isConfigured = !!(process.env.OSS_REGION && process.env.OSS_ACCESS_KEY_ID && 
                              process.env.OSS_ACCESS_KEY_SECRET && process.env.OSS_BUCKET);
        
        if (this.isConfigured) {
            this.client = new OSS({
                region: process.env.OSS_REGION,
                accessKeyId: process.env.OSS_ACCESS_KEY_ID,
                accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET,
                bucket: process.env.OSS_BUCKET
            });
            
            this.baseUrl = process.env.OSS_BASE_URL || `https://${process.env.OSS_BUCKET}.${process.env.OSS_REGION}.aliyuncs.com`;
        } else {
            logger.warn('OSS配置不完整，头像上传功能将被禁用');
            this.client = null;
            this.baseUrl = null;
        }
    }

    /**
     * 上传头像到OSS
     * @param {Buffer} fileBuffer 文件缓冲区
     * @param {string} originalName 原始文件名
     * @param {number} userId 用户ID
     * @returns {Promise<Object>} 上传结果
     */
    async uploadAvatar(fileBuffer, originalName, userId) {
        try {
            if (!this.isConfigured) {
                throw new Error('OSS配置不完整，无法上传文件');
            }

            // 生成唯一文件名
            const fileExtension = this._getFileExtension(originalName);
            const fileName = `avatars/${userId}/${Date.now()}_${crypto.randomBytes(8).toString('hex')}${fileExtension}`;
            
            // 上传到OSS
            const result = await this.client.put(fileName, fileBuffer, {
                headers: {
                    'Content-Type': this._getMimeType(fileExtension)
                }
            });

            // 生成不同尺寸的URL（可选，也可以在前端处理）
            const baseUrl = result.url.replace(fileName, '').replace(fileName, '');
            const baseFileName = fileName.replace(fileExtension, '');
            
            return {
                success: true,
                originalUrl: result.url,
                urls: {
                    small: `${baseUrl}${baseFileName}_small${fileExtension}`,
                    medium: `${baseUrl}${baseFileName}_medium${fileExtension}`,
                    large: `${baseUrl}${baseFileName}_large${fileExtension}`
                },
                fileName: fileName,
                size: fileBuffer.length
            };

        } catch (error) {
            logger.error('OSS上传失败:', error);
            throw new Error('文件上传失败');
        }
    }

    /**
     * 删除OSS文件
     * @param {string} fileName 文件名
     * @returns {Promise<boolean>} 删除结果
     */
    async deleteFile(fileName) {
        try {
            await this.client.delete(fileName);
            return true;
        } catch (error) {
            logger.error('OSS删除失败:', error);
            return false;
        }
    }

    /**
     * 获取文件扩展名
     * @param {string} filename 文件名
     * @returns {string} 扩展名
     */
    _getFileExtension(filename) {
        return path.extname(filename).toLowerCase();
    }

    /**
     * 根据扩展名获取MIME类型
     * @param {string} extension 扩展名
     * @returns {string} MIME类型
     */
    _getMimeType(extension) {
        const mimeTypes = {
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.png': 'image/png',
            '.webp': 'image/webp'
        };
        return mimeTypes[extension] || 'image/jpeg';
    }

    /**
     * 生成签名URL（用于临时访问）
     * @param {string} fileName 文件名
     * @param {number} expires 过期时间（秒）
     * @returns {string} 签名URL
     */
    generateSignedUrl(fileName, expires = 3600) {
        try {
            return this.client.signatureUrl(fileName, { expires });
        } catch (error) {
            logger.error('生成签名URL失败:', error);
            return null;
        }
    }
}

module.exports = new OSSService();
