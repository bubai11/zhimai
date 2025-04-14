const axios = require('axios');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const User = require('../models/User');
const Tokens = require('../models/Tokens');
const logger = require('../utils/logger');
const config = require('../config');

class UserService {
    /**
     * 微信登录
     * @param {string} code 微信登录code
     * @returns {Promise<Object>} 登录结果
     */
    async wxLogin(code) {
        try {
            // 开发环境测试code处理
            if (process.env.NODE_ENV === 'development' && code.startsWith('test_')) {
                return this._handleTestCode(code);
            }

            // 调用微信接口获取openid
            const wxResponse = await axios.get('https://api.weixin.qq.com/sns/jscode2session', {
                params: {
                    appid: process.env.WX_APPID,
                    secret: process.env.WX_SECRET,
                    js_code: code,
                    grant_type: 'authorization_code'
                }
            });

            if (wxResponse.data.errcode) {
                throw new Error(wxResponse.data.errmsg || '微信登录失败');
            }

            const { openid, session_key } = wxResponse.data;

            // 查找或创建用户
            let user = await User.findOne({ where: { openid } });
            const isNewUser = !user;

            if (!user) {
                // 创建新用户
                user = await User.create({
                    openid,
                    role: 'user',
                    status: 'pending',
                    lastLoginAt: new Date()
                });
            } else {
                // 更新登录时间
                await user.update({
                    lastLoginAt: new Date()
                });
            }

            // 生成token
            const token = await this.generateAndSaveToken(user);

            return {
                token,
                userInfo: this._formatUserInfo(user, isNewUser)
            };
        } catch (error) {
            logger.error('微信登录错误:', error);
            throw error;
        }
    }

    /**
     * 获取用户信息
     * @param {number} userId 用户ID
     * @returns {Promise<Object>} 用户信息
     */
    async getUserInfo(userId) {
        try {
            const user = await User.findByPk(userId);
            if (!user) {
                throw new Error('用户不存在');
            }
            return this._formatUserInfo(user);
        } catch (error) {
            logger.error('获取用户信息错误:', error);
            throw error;
        }
    }

    /**
     * 更新用户信息
     * @param {number} userId 用户ID
     * @param {Object} updateData 更新数据
     * @returns {Promise<Object>} 更新结果
     */
    async updateUserInfo(userId, updateData) {
        try {
            const user = await User.findByPk(userId);
            if (!user) {
                throw new Error('用户不存在');
            }

            // 只允许更新特定字段
            const allowedFields = ['nickname', 'avatarUrl', 'email', 'phone', 'campus', 'grade', 'major'];
            const filteredData = Object.keys(updateData)
                .filter(key => allowedFields.includes(key))
                .reduce((obj, key) => {
                    obj[key] = updateData[key];
                    return obj;
                }, {});

            await user.update(filteredData);
            return this._formatUserInfo(user);
        } catch (error) {
            logger.error('更新用户信息错误:', error);
            throw error;
        }
    }

    /**
     * 注销账号
     * @param {number} userId 用户ID
     */
    async deleteAccount(userId) {
        try {
            const user = await User.findByPk(userId);
            if (!user) {
                throw new Error('用户不存在');
            }

            // 删除用户的所有token
            await Tokens.destroy({
                where: { userId }
            });

            // 软删除用户
            await user.update({
                status: 'deleted',
                deletedAt: new Date()
            });
        } catch (error) {
            logger.error('注销账号错误:', error);
            throw error;
        }
    }

    /**
     * 生成JWT token并保存到数据库
     * @param {Object} user 用户对象
     * @returns {Promise<string>} JWT token
     */
    async generateAndSaveToken(user) {
        try {
            // 生成token
            const token = jwt.sign(
                {
                    id: user.id,
                    role: user.role,
                    openId: user.openId
                },
                config.JWT_SECRET,
                { expiresIn: config.JWT_EXPIRES_IN }
            );

            // 计算过期时间
            const expiresAt = new Date();
            expiresAt.setHours(expiresAt.getHours() + 24);

            // 保存token到数据库
            await Tokens.create({
                user_id: user.id,
                token: token,
                expires_at: expiresAt
            });

            return token;
        } catch (error) {
            logger.error('Token生成或保存失败:', error);
            throw error;
        }
    }

    /**
     * 刷新token
     * @param {string} oldToken 旧token
     * @returns {Promise<Object>} 包含新token的对象
     */
    async refreshToken(oldToken) {
        try {
            // 验证旧token
            const decoded = jwt.verify(oldToken, config.JWT_SECRET);
            
            // 查找数据库中的token记录
            const tokenRecord = await Tokens.findOne({
                where: {
                    token: oldToken,
                    expiresAt: {
                        [Op.gt]: new Date()
                    }
                }
            });

            if (!tokenRecord) {
                throw new Error('Token不存在或已过期');
            }

            // 查找用户
            const user = await User.findByPk(decoded.id);
            if (!user) {
                throw new Error('用户不存在');
            }

            // 生成新token
            const newToken = await this.generateAndSaveToken(user);

            // 删除旧token
            await Tokens.destroy({
                where: { token: oldToken }
            });

            return {
                token: newToken,
                userInfo: this._formatUserInfo(user)
            };
        } catch (error) {
            logger.error('刷新Token失败:', error);
            throw error;
        }
    }

    /**
     * 注销登录
     * @param {string} token JWT token
     */
    async logout(token) {
        try {
            const result = await Tokens.destroy({
                where: { token }
            });

            if (result === 0) {
                throw new Error('Token不存在');
            }
        } catch (error) {
            logger.error('注销失败:', error);
            throw error;
        }
    }

    /**
     * 验证 token 并返回解码后的用户信息
     * @param {string} token JWT token
     * @returns {Promise<Object>} 解码后的用户信息
     */
    async verifyTokenAndGetUser(token) {
        try {
            // 验证token签名
            const decoded = jwt.verify(token, config.JWT_SECRET);

            // 检查token是否在数据库中存在且未过期
            const tokenRecord = await Tokens.findOne({
                where: {
                    token: token,
                    expiresAt: {
                        [Op.gt]: new Date()
                    }
                }
            });

            if (!tokenRecord) {
                throw new Error('Token不存在或已过期');
            }

            // 获取用户信息
            const user = await User.findByPk(decoded.id);
            if (!user) {
                throw new Error('用户不存在');
            }

            return {
                user: this._formatUserInfo(user),
                decoded
            };
        } catch (error) {
            logger.error('Token验证失败:', error);
            throw error;
        }
    }

    /**
     * 清理数据库中的过期 token
     */
    async cleanExpiredTokens() {
        try {
            const now = new Date();
            await Tokens.destroy({
                where: {
                    expiresAt: {
                        [Op.lt]: now
                    }
                }
            });
        } catch (error) {
            logger.error('清理过期 token 时发生错误:', error);
            throw error;
        }
    }

    /**
     * 格式化用户信息
     * @private
     * @param {Object} user 用户对象
     * @param {boolean} isNewUser 是否新用户
     * @returns {Object} 格式化后的用户信息
     */
    _formatUserInfo(user, isNewUser = false) {
        return {
            id: user.id,
            openId: user.openId,
            unionId: user.unionId,
            nickname: user.nickname,
            avatarUrl: user.avatarUrl,
            email: user.email,
            phone: user.phone,
            campus: user.campus,
            grade: user.grade,
            major: user.major,
            role: user.role,
            status: user.status,
            lastLoginAt: user.lastLoginAt,
            isNewUser
        };
    }

    /**
     * 处理测试环境的登录码
     * @private
     * @param {string} code 测试code
     * @returns {Object} 测试响应
     */
    _handleTestCode(code) {
        const testResponses = {
            'test_code_1': {
                token: 'test_token_new_user',
                userInfo: {
                    id: 1,
                    openid: 'test_openid_1',
                    nickname: '测试新用户',
                    avatarUrl: 'https://example.com/avatar.jpg',
                    role: 'user',
                    status: 'active',
                    isNewUser: true
                }
            },
            'test_code_2': {
                token: 'test_token_existing_user',
                userInfo: {
                    id: 2,
                    openid: 'test_openid_2',
                    nickname: '测试老用户',
                    avatarUrl: 'https://example.com/avatar.jpg',
                    role: 'user',
                    status: 'active',
                    isNewUser: false
                }
            }
        };

        const response = testResponses[code];
        if (!response) {
            throw new Error('无效的测试code');
        }
        return response;
    }
}

module.exports = new UserService();