const axios = require('axios');
const logger = require('../utils/logger');

class WxService {
    constructor() {
        this.accessToken = null;
        this.accessTokenExpireTime = 0;
    }

    /**
     * 获取微信access_token
     * @returns {Promise<string>} access_token
     */
    async getAccessToken() {
        try {
            const now = Date.now();
            // 如果access_token未过期，直接返回
            if (this.accessToken && now < this.accessTokenExpireTime) {
                return this.accessToken;
            }

            // 请求新的access_token
            const response = await axios.get('https://api.weixin.qq.com/cgi-bin/token', {
                params: {
                    grant_type: 'client_credential',
                    appid: process.env.WX_APPID,
                    secret: process.env.WX_SECRET
                }
            });

            if (response.data.access_token) {
                this.accessToken = response.data.access_token;
                // 设置过期时间为7200秒（2小时）减去5分钟的缓冲时间
                this.accessTokenExpireTime = now + (response.data.expires_in - 300) * 1000;
                return this.accessToken;
            } else {
                throw new Error('获取access_token失败: ' + JSON.stringify(response.data));
            }
        } catch (error) {
            logger.error('获取access_token失败:', error);
            throw error;
        }
    }

    /**
     * 发送订阅消息
     * @param {string} openid 用户openid
     * @param {string} templateId 模板ID
     * @param {Object} data 模板数据
     * @returns {Promise<Object>} 发送结果
     */
    async sendSubscribeMessage(openid, templateId, data) {
        try {
            const accessToken = await this.getAccessToken();
            const response = await axios.post(
                `https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=${accessToken}`,
                {
                    touser: openid,
                    template_id: templateId,
                    data: data,
                    miniprogram_state: process.env.NODE_ENV === 'production' ? 'formal' : 'trial'
                }
            );

            if (response.data.errcode === 0) {
                logger.info('订阅消息发送成功', {
                    openid,
                    templateId,
                    data
                });
                return response.data;
            } else {
                throw new Error('发送订阅消息失败: ' + JSON.stringify(response.data));
            }
        } catch (error) {
            logger.error('发送订阅消息失败:', error);
            throw error;
        }
    }

    /**
     * 登录凭证校验
     * @param {string} code 登录时获取的code
     * @returns {Promise<Object>} 用户信息
     */
    async code2Session(code) {
        try {
            const response = await axios.get('https://api.weixin.qq.com/sns/jscode2session', {
                params: {
                    appid: process.env.WX_APPID,
                    secret: process.env.WX_SECRET,
                    js_code: code,
                    grant_type: 'authorization_code'
                }
            });

            if (response.data.openid) {
                return response.data;
            } else {
                throw new Error('登录凭证校验失败: ' + JSON.stringify(response.data));
            }
        } catch (error) {
            logger.error('登录凭证校验失败:', error);
            throw error;
        }
    }
}

module.exports = new WxService(); 