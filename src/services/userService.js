const axios = require('axios');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const { User } = require('../models');
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

            const { openid, session_key, unionid } = wxResponse.data;

            // 查找或创建用户
            let user = await User.findOne({ where: { openid } });
            const isNewUser = !user;

            if (!user) {
                // 创建新用户
                user = await User.create({
                    openid,
                    unionid,
                    nickname,
                    avatarUrl,  
                    role: 'user',
                    status: 'active',
                    lastLoginAt: new Date()
                });
            } else {
                // 更新登录时间
                await user.update({
                    lastLoginAt: new Date()
                });
            }

            // 生成token
            const token = await this.generateToken(user);

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

            // 删除用户相关的其他数据（如收藏、订单、评论等）
            // await Favorite.destroy({ where: { userId } });
            // await Orders.destroy({ where: { userId } });
            // ...

            // 最后删除用户本身
            await user.destroy();

        } catch (error) {
            logger.error('注销账号错误:', error);
            throw error;
        }
    }

    /**
     * 验证token
     * @param {string} token JWT token
     * @returns {Promise<Object>} 解码后的用户信息
     */
    async verifyToken(token) {
        try {
            const decoded = jwt.verify(token, config.JWT_SECRET);
            
            if (decoded.type !== 'user') {
                throw new Error('无效的token类型');
            }

            const user = await User.findOne({
                where: {
                    id: decoded.id,
                    status: 'active'
                }
            });

            if (!user) {
                throw new Error('用户不存在或已被禁用');
            }

            return {
                user: {
                    id: user.id,
                    openid: user.openid,
                    unionid: user.unionid
                }
            };
        } catch (error) {
            logger.error('验证token失败:', error);
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

    /**
     * 获取所有用户列表
     * @returns {Promise<Array>} 用户列表
     */
    async getAllUsers() {
        try {
            return await User.findAll({
                attributes: ['id', 'username', 'email', 'role', 'status', 'createdAt'],
                order: [['createdAt', 'DESC']]
            });
        } catch (error) {
            logger.error('获取用户列表失败:', error);
            throw error;
        }
    }

    /**
     * 获取单个用户信息
     * @param {number} id 用户ID
     * @returns {Promise<Object>} 用户信息
     */
    async getUserById(id) {
        try {
            const user = await User.findByPk(id, {
                attributes: ['id', 'username', 'email', 'role', 'status', 'createdAt']
            });
            if (!user) {
                throw new Error('用户不存在');
            }
            return user;
        } catch (error) {
            logger.error('获取用户信息失败:', error);
            throw error;
        }
    }

    /**
     * 获取用户列表
     * @param {Object} params 查询参数
     * @returns {Promise<Object>} 用户列表
     */
    async getUserList(params) {
        try {
            const {
                page = 1,
                pageSize = 10,
                keyword,
                status,
                userType,
                startDate,
                endDate
            } = params;

            const where = {};
            if (status) where.status = status;
            if (userType) where.userType = userType;
            if (keyword) {
                where[Op.or] = [
                    { nickname: { [Op.like]: `%${keyword}%` } },
                    { studentId: { [Op.like]: `%${keyword}%` } },
                    { phone: { [Op.like]: `%${keyword}%` } },
                    { email: { [Op.like]: `%${keyword}%` } }
                ];
            }
            if (startDate && endDate) {
                where.createdAt = {
                    [Op.between]: [startDate, endDate]
                };
            }

            const { rows: users, count: total } = await User.findAndCountAll({
                where,
                offset: (page - 1) * pageSize,
                limit: pageSize,
                order: [['createdAt', 'DESC']]
            });

            return {
                list: users,
                pagination: {
                    total,
                    page: Number(page),
                    pageSize: Number(pageSize),
                    totalPages: Math.ceil(total / pageSize)
                }
            };
        } catch (error) {
            logger.error('获取用户列表失败:', error);
            throw error;
        }
    }

    /**
     * 更新用户信息
     * @param {number} id 用户ID
     * @param {Object} updateData 更新数据
     * @returns {Promise<Object>} 更新后的用户信息
     */
    async updateUser(id, updateData) {
        try {
            const user = await User.findByPk(id);
            if (!user) {
                throw new Error('用户不存在');
            }
    
            await user.update(updateData);
            logger.info('用户信息更新成功:', { userId: id });
    
            return await this.getUserById(id);
        } catch (error) {
            logger.error('更新用户信息失败:', error);
            throw error;
        }
    }
    

    /**
     * 删除用户
     * @param {number} id 用户ID
     */
    async deleteUser(id) {
        try {
            const user = await User.findByPk(id);
            if (!user) {
                throw new Error('用户不存在');
            }

            await user.destroy();
            logger.info('用户删除成功:', { userId: id });
        } catch (error) {
            logger.error('删除用户失败:', error);
            throw error;
        }
    }

    /**
     * 生成用户token
     * @param {User} user 用户对象
     * @returns {Promise<string>} token
     */
    async generateToken(user) {
        try {
            const token = jwt.sign(
                {
                    id: user.id,
                    openid: user.openid,
                    unionid: user.unionid,
                    type: 'user'
                },
                config.JWT_SECRET,
                { expiresIn: config.JWT_EXPIRES_IN_USER }
            );

            logger.info('用户token生成成功:', { userId: user.id });
            return token;
        } catch (error) {
            logger.error('生成用户token失败:', error);
            throw error;
        }
    }
}

module.exports = new UserService();