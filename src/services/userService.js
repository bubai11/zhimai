const axios = require('axios');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const { User, Activity, Favorite } = require('../models');
const logger = require('../utils/logger');
const config = require('../config');
const RedisService = require('../config/redis');

class UserService {
    /**
     * 用户缓存键前缀
     */
    static USER_CACHE_PREFIX = 'user:';
    
    /**
     * 缓存过期时间（1小时）
     */
    static CACHE_TTL = 3600;

    /**
     * 微信小程序登录
     * @param {string} code 登录code
     * @param {string} [nickname] 用户昵称
     * @param {string} [avatarUrl] 用户头像URL
     */
    async wxLogin(code, nickname, avatarUrl) {
        try {
            // 调用微信登录API
            const { data } = await axios.get('https://api.weixin.qq.com/sns/jscode2session', {
                params: {
                    appid: config.WX_APPID,
                    secret: config.WX_SECRET,
                    js_code: code,
                    grant_type: 'authorization_code'
                }
            });

            if (data.errcode) {
                throw new Error(`微信登录失败: ${data.errmsg}`);
            }

            const { openid, unionid } = data;

            // 通过 openid 查找用户
            let user = await User.findOne({ where: { openid } });
            let isNewUser = false;

            if (!user) {
                // 创建新用户
                user = await User.create({
                    openid,
                    unionid: unionid || null,
                    nickname: nickname || `用户${openid.slice(-6)}`,
                    avatarUrl: avatarUrl || null,
                    role: 'user',
                    status: 'active',
                    lastLoginAt: new Date()
                });
                isNewUser = true;
            } else {
                // 更新用户信息
                const updateData = {
                    lastLoginAt: new Date()
                };
                if (unionid && !user.unionid) updateData.unionid = unionid;
                if (nickname) updateData.nickname = nickname;
                if (avatarUrl) updateData.avatarUrl = avatarUrl;
                await user.update(updateData);
            }

            // 生成 JWT token
            const token = this.generateToken(user);

            return {
                token,
                user: this._formatBasicUserInfo(user, isNewUser)
            };
        } catch (error) {
            logger.error('微信登录服务错误:', error);
            throw error;
        }
    }

    /**
     * 生成JWT token
     * @param {Object} user 用户对象
     */
    generateToken(user) {
        return jwt.sign(
            { 
                id: user.id,
                role: user.role,
                openid: user.openid
            },
            config.JWT_SECRET,
            { expiresIn: '7d' }
        );
    }

    /**
     * 验证token
     * @param {string} token JWT token
     */
    async verifyToken(token) {
        try {
            // 验证 token
            const decoded = jwt.verify(token, config.JWT_SECRET);
            
            // 检查 token 是否在黑名单中
            const isBlacklisted = await RedisService.get(`token:blacklist:${token}`);
            if (isBlacklisted) {
                throw new Error('token已失效');
            }

            // 获取用户信息
            const user = await this.getUserById(decoded.id);
            if (!user || user.status !== 'active') {
                throw new Error('用户不存在或已被禁用');
            }

            return user;
        } catch (error) {
            logger.error('Token验证失败:', error);
            throw error;
        }
    }

    /**
     * 获取用户详细资料
     * @param {number} userId 用户ID
     */
    async getUserProfile(userId) {
        try {
            const user = await User.findByPk(userId);
            if (!user) {
                throw new Error('用户不存在');
            }

            return this._formatDetailUserInfo(user);
        } catch (error) {
            logger.error('获取用户详细资料失败:', error);
            throw error;
        }
    }

    /**
     * 获取用户统计信息
     * @param {number} userId 用户ID
     */
    async getUserStatistics(userId) {
        try {
            const [activityCount, favoriteCount] = await Promise.all([
                Activity.count({ where: { user_id: userId } }),
                Favorite.count({ where: { user_id: userId } })
            ]);

            return {
                activityCount,
                favoriteCount
            };
        } catch (error) {
            logger.error('获取用户统计信息失败:', error);
            return {
                activityCount: 0,
                favoriteCount: 0
            };
        }
    }

    /**
     * 更新用户详细资料
     * @param {number} userId 用户ID
     * @param {Object} updateData 更新数据
     */
    async updateUserProfile(userId, updateData) {
        try {
            const user = await User.findByPk(userId);
            if (!user) {
                throw new Error('用户不存在');
            }

            // 只允许更新特定字段
            const allowedFields = [
                'nickname', 'avatarUrl', 'email', 'phone',
                'campus', 'grade', 'major'
            ];

            const filteredData = Object.keys(updateData)
                .filter(key => allowedFields.includes(key))
                .reduce((obj, key) => {
                    obj[key] = updateData[key];
                    return obj;
                }, {});

            // 数据验证
            if (filteredData.email && !this._isValidEmail(filteredData.email)) {
                throw new Error('无效的邮箱格式');
            }
            if (filteredData.phone && !this._isValidPhone(filteredData.phone)) {
                throw new Error('无效的手机号格式');
            }

            await user.update(filteredData);
            return this._formatDetailUserInfo(user);
        } catch (error) {
            logger.error('更新用户资料失败:', error);
            throw error;
        }
    }

    /**
     * 获取所有用户列表（管理员）
     */
    async getAllUsers() {
        try {
            return await User.findAll({
                attributes: ['id', 'nickname', 'email', 'role', 'status', ['created_at', 'createdAt']],
                order: [['created_at', 'DESC']]
            });
        } catch (error) {
            logger.error('获取用户列表失败:', error);
            throw error;
        }
    }

    /**
     * 获取用户列表（分页）
     * @param {Object} params 查询参数
     */
    async getUserList(params) {
        try {
            const {
                page = 1,
                pageSize = 10,
                keyword,
                status,
                role,
                startDate,
                endDate
            } = params;

            const where = {};
            if (status) where.status = status;
            if (role) where.role = role;
            if (keyword) {
                where[Op.or] = [
                    { nickname: { [Op.like]: `%${keyword}%` } },
                    { email: { [Op.like]: `%${keyword}%` } },
                    { phone: { [Op.like]: `%${keyword}%` } }
                ];
            }
            if (startDate && endDate) {
                where.created_at = {
                    [Op.between]: [startDate, endDate]
                };
            }

            const { rows: users, count: total } = await User.findAndCountAll({
                where,
                attributes: [
                    'id', 'nickname', 'email', 'phone',
                    'role', 'status',
                    ['created_at', 'createdAt'],
                    ['updated_at', 'updatedAt']
                ],
                offset: (page - 1) * pageSize,
                limit: pageSize,
                order: [['created_at', 'DESC']]
            });

            return {
                list: users.map(user => this._formatDetailUserInfo(user)),
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
     * 更新用户状态（管理员）
     * @param {number} userId 用户ID
     * @param {string} status 新状态
     */
    async updateUserStatus(userId, status) {
        try {
            const user = await User.findByPk(userId);
            if (!user) {
                throw new Error('用户不存在');
            }

            await user.update({ status });
            
            // 删除用户缓存
            await RedisService.del(`${UserService.USER_CACHE_PREFIX}${userId}`);
            logger.info('用户状态已更新，缓存已清除:', { userId, status });

            return this._formatDetailUserInfo(user);
        } catch (error) {
            logger.error('更新用户状态失败:', error);
            throw error;
        }
    }

    /**
     * 更新用户角色（管理员）
     * @param {number} userId 用户ID
     * @param {string} role 新角色
     */
    async updateUserRole(userId, role) {
        try {
            const user = await User.findByPk(userId);
            if (!user) {
                throw new Error('用户不存在');
            }

            await user.update({ role });
            return this._formatDetailUserInfo(user);
        } catch (error) {
            logger.error('更新用户角色失败:', error);
            throw error;
        }
    }

    /**
     * 退出登录
     * @param {string} token JWT token
     */
    async logout(token) {
        try {
            // 将 token 加入黑名单
            await RedisService.set(
                `token:blacklist:${token}`, 
                'true', 
                config.JWT_EXPIRES_IN
            );
            logger.info('用户token已加入黑名单');
        } catch (error) {
            logger.error('用户登出失败:', error);
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

            await user.destroy();
            logger.info('用户注销成功:', { userId });
        } catch (error) {
            logger.error('注销账号失败:', error);
            throw error;
        }
    }

    /**
     * 根据ID获取用户详细信息
     * @param {number} userId 用户ID
     * @returns {Promise<Object>} 用户信息
     */
    async getUserById(userId) {
        try {
            // 尝试从缓存获取
            const cacheKey = `${UserService.USER_CACHE_PREFIX}${userId}`;
            const cachedUser = await RedisService.get(cacheKey);
            if (cachedUser) {
                logger.info('从缓存获取用户信息:', { userId });
                return cachedUser;
            }

            // 缓存未命中，从数据库获取
            const user = await User.findByPk(userId, {
                attributes: [
                    'id', 'nickname', 'email', 'phone',
                    'avatar_url', 'role', 'status',
                    ['created_at', 'createdAt'],
                    ['updated_at', 'updatedAt'],
                    'campus', 'grade', 'major'
                ]
            });

            if (!user) {
                throw new Error('用户不存在');
            }

            // 获取用户统计信息
            const statistics = await this.getUserStatistics(userId);
            const userInfo = {
                ...this._formatDetailUserInfo(user),
                statistics
            };

            // 设置缓存
            await RedisService.set(cacheKey, userInfo, UserService.CACHE_TTL);
            logger.info('用户信息已缓存:', { userId });

            return userInfo;
        } catch (error) {
            logger.error('获取用户详情失败:', error);
            throw error;
        }
    }

    // 私有方法：格式化用户信息
    _formatBasicUserInfo(user, isNewUser = false) {
        return {
            id: user.id,
            nickname: user.nickname,
            avatarUrl: user.avatarUrl,
            role: user.role,
            status: user.status,
            isNewUser
        };
    }

    /**
     * 格式化用户详细信息
     * @param {Object} user 用户对象
     * @returns {Object} 格式化后的用户信息
     */
    _formatDetailUserInfo(user) {
        const userInfo = user.toJSON();
        
        // 脱敏处理
        if (userInfo.email) {
            userInfo.email = this._maskEmail(userInfo.email);
        }
        if (userInfo.phone) {
            userInfo.phone = this._maskPhone(userInfo.phone);
        }

        return userInfo;
    }

    /**
     * 邮箱脱敏
     * @param {string} email 邮箱
     * @returns {string} 脱敏后的邮箱
     */
    _maskEmail(email) {
        if (!email) return '';
        const [name, domain] = email.split('@');
        const maskedName = name.length > 2 
            ? `${name.slice(0, 2)}***${name.slice(-2)}`
            : `${name.slice(0, 1)}***`;
        return `${maskedName}@${domain}`;
    }

    /**
     * 手机号脱敏
     * @param {string} phone 手机号
     * @returns {string} 脱敏后的手机号
     */
    _maskPhone(phone) {
        if (!phone) return '';
        return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
    }

    // 私有方法：数据验证
    _isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    _isValidPhone(phone) {
        return /^1[3-9]\d{9}$/.test(phone);
    }
}

module.exports = new UserService();