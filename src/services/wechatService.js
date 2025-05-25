// const httpClient = require('../utils/httpClient');
// const logger = require('../utils/logger');
// const config = require('../config');
// const fs = require('fs').promises;
// const path = require('path');
// const FormData = require('form-data');

// class WechatService {
//     /**
//      * 获取用户信息
//      * @param {string} openid 用户的openid
//      * @returns {Promise<Object>} 用户信息
//      */
//     async getUserInfo(openid) {
//         try {
//             return await httpClient.get('/user/info', {
//                 params: { openid }
//             });
//         } catch (error) {
//             logger.error('Failed to get user info:', error);
//             throw error;
//         }
//     }

//     /**
//      * 发送模板消息
//      * @param {Object} messageData 消息数据
//      * @returns {Promise<Object>} 发送结果
//      */
//     async sendTemplateMessage(messageData) {
//         try {
//             return await httpClient.post('/message/template/send', messageData);
//         } catch (error) {
//             logger.error('Failed to send template message:', error);
//             throw error;
//         }
//     }

//     /**
//      * 创建自定义菜单
//      * @param {Object} menuConfig 菜单配置
//      * @returns {Promise<Object>} 创建结果
//      */
//     async createMenu(menuConfig) {
//         try {
//             return await httpClient.post('/menu/create', menuConfig);
//         } catch (error) {
//             logger.error('Failed to create menu:', error);
//             throw error;
//         }
//     }

//     /**
//      * 上传临时素材
//      * @param {string} filePath 文件路径
//      * @param {string} type 媒体文件类型
//      * @returns {Promise<Object>} 上传结果
//      */
//     async uploadMedia(filePath, type) {
//         try {
//             const formData = new FormData();
//             formData.append('media', await fs.readFile(filePath));
            
//             return await httpClient.upload('/media/upload', formData, {
//                 params: { type }
//             });
//         } catch (error) {
//             logger.error('Failed to upload media:', error);
//             throw error;
//         }
//     }

//     /**
//      * 获取临时素材
//      * @param {string} mediaId 媒体文件ID
//      * @returns {Promise<Buffer>} 媒体文件内容
//      */
//     async getMedia(mediaId) {
//         try {
//             const response = await httpClient.get('/media/get', {
//                 params: { media_id: mediaId },
//                 responseType: 'arraybuffer'
//             });
//             return response;
//         } catch (error) {
//             logger.error('Failed to get media:', error);
//             throw error;
//         }
//     }

//     /**
//      * 创建二维码ticket
//      * @param {Object} sceneData 场景值信息
//      * @returns {Promise<Object>} 二维码ticket信息
//      */
//     async createQRCode(sceneData) {
//         try {
//             return await httpClient.post('/qrcode/create', {
//                 action_name: 'QR_SCENE',
//                 action_info: {
//                     scene: sceneData
//                 }
//             });
//         } catch (error) {
//             logger.error('Failed to create QR code:', error);
//             throw error;
//         }
//     }

//     /**
//      * 获取用户列表
//      * @param {string} [nextOpenid] 下一个openid
//      * @returns {Promise<Object>} 用户列表信息
//      */
//     async getUserList(nextOpenid = '') {
//         try {
//             return await httpClient.get('/user/get', {
//                 params: { next_openid: nextOpenid }
//             });
//         } catch (error) {
//             logger.error('Failed to get user list:', error);
//             throw error;
//         }
//     }

//     /**
//      * 发送客服消息
//      * @param {Object} messageData 消息数据
//      * @returns {Promise<Object>} 发送结果
//      */
//     async sendCustomMessage(messageData) {
//         try {
//             return await httpClient.post('/message/custom/send', messageData);
//         } catch (error) {
//             logger.error('Failed to send custom message:', error);
//             throw error;
//         }
//     }

//     /**
//      * 获取公众号已创建的标签
//      * @returns {Promise<Object>} 标签列表
//      */
//     async getTags() {
//         try {
//             return await httpClient.get('/tags/get');
//         } catch (error) {
//             logger.error('Failed to get tags:', error);
//             throw error;
//         }
//     }

//     /**
//      * 创建标签
//      * @param {string} name 标签名
//      * @returns {Promise<Object>} 创建结果
//      */
//     async createTag(name) {
//         try {
//             return await httpClient.post('/tags/create', {
//                 tag: { name }
//             });
//         } catch (error) {
//             logger.error('Failed to create tag:', error);
//             throw error;
//         }
//     }

//     /**
//      * 批量为用户打标签
//      * @param {string} tagId 标签ID
//      * @param {Array<string>} openidList 用户openid列表
//      * @returns {Promise<Object>} 打标签结果
//      */
//     async batchTagging(tagId, openidList) {
//         try {
//             return await httpClient.post('/tags/members/batchtagging', {
//                 tagid: tagId,
//                 openid_list: openidList
//             });
//         } catch (error) {
//             logger.error('Failed to batch tagging:', error);
//             throw error;
//         }
//     }
// }

// // 创建单例
// const wechatService = new WechatService();

// module.exports = wechatService; 