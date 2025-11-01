const axios = require('axios');
const { Op } = require('sequelize');
const User = require('../models/User');
const { ROLES, ROLE_LEVELS } = require('../constants/roles');
const userService = require('../services/userService');
const logger = require('../utils/logger');
const { Response } = require('../utils/response');

class UserController {
    /**
     * 微信小程序登录
     */
    async wxLogin(req, res) {
        try {
            const { code, nickname, avatarUrl } = req.body;
            
            if (!code) {
                return res.status(400).json(Response.badRequest('缺少code参数'));
            }

            const result = await userService.wxLogin(code, nickname, avatarUrl);
            const token = userService.generateToken(result.user);

            logger.info('用户登录成功:', { 
                userId: result.user.id,
                nickname: result.user.nickname
            });

            res.json(Response.success({
                token,
                userInfo: result.user
            }, '登录成功'));
        } catch (error) {
            logger.error('微信登录失败:', error);
            res.status(500).json(Response.error(error.message || '登录失败'));
        }
    }

    /**
     * 获取当前用户基本信息
     * 用于快速验证登录状态，返回最基础的用户信息
     */
    async getCurrentUser(req, res) {
        try {
            const { user } = req;
            if (!user) {
                return res.status(401).json(Response.unauthorized('请先登录'));
            }

            // 只返回基础信息
            const basicInfo = {
                id: user.id,
                nickname: user.nickname,
                avatarUrl: user.avatarUrl,
                role: user.role,
                status: user.status
            };
            
            res.json(Response.success(basicInfo, '获取当前用户信息成功'));
        } catch (error) {
            logger.error('获取当前用户信息失败:', error);
            res.status(500).json(Response.error(error.message));
        }
    }

    /**
     * 获取用户详细资料
     * 用于个人中心页面，返回用户的完整信息
     */
    async getUserProfile(req, res) {
        try {
            const userId = req.user?.id;
            
            if (!userId) {
                return res.status(401).json(Response.unauthorized('请先登录'));
            }

            // 获取用户详细信息
            const userProfile = await userService.getUserProfile(userId);
            if (!userProfile) {
                return res.status(404).json(Response.notFound('用户不存在'));
            }

            // 获取用户统计信息
            const statistics = await userService.getUserStatistics(userId);
            
            res.json(Response.success({
                ...userProfile,
                statistics
            }, '获取用户资料成功'));
        } catch (error) {
            logger.error('获取用户资料失败:', {
                error: error.message,
                stack: error.stack,
                userId: req.user?.id
            });
            res.status(500).json(Response.error('获取用户资料失败'));
        }
    }

    /**
     * 更新用户详细资料
     */
    async updateUserProfile(req, res) {
        try {
            const userId = req.user?.id;
            if (!userId) {
                return res.status(401).json(Response.unauthorized('请先登录'));
            }

            const updateData = req.body;
            const updatedProfile = await userService.updateUserProfile(userId, updateData);

            res.json(Response.success(updatedProfile, '更新用户资料成功'));
        } catch (error) {
            logger.error('更新用户资料失败:', {
                error: error.message,
                stack: error.stack,
                userId: req.user?.id,
                updateData: req.body
            });
            res.status(500).json(Response.error('更新用户资料失败'));
        }
    }

    /**
     * 退出登录
     */
    async logout(req, res) {
        try {
            const userId = req.user?.id;
            if (!userId) {
                return res.status(401).json(Response.unauthorized('请先登录'));
            }

            await userService.logout(userId);
            res.json(Response.success(null, '退出登录成功'));
        } catch (error) {
            logger.error('退出登录失败:', error);
            res.status(500).json(Response.error('退出登录失败'));
        }
    }

    /**
     * 注销账号
     */
    async deleteAccount(req, res) {
        try {
            const userId = req.user?.id;
            if (!userId) {
                return res.status(401).json(Response.unauthorized('请先登录'));
            }

            await userService.deleteAccount(userId);
            res.json(Response.success(null, '注销账号成功'));
        } catch (error) {
            logger.error('注销账号失败:', error);
            res.status(500).json(Response.error('注销账号失败'));
        }
    }

    /**
     * 获取用户详细信息
     * @param {Object} req 请求对象
     * @param {Object} res 响应对象
     */
    async getUserInfo(req, res) {
        try {
            const userId = req.user?.id;
            
            if (!userId) {
                logger.warn('获取用户信息失败: 未登录');
                return res.status(401).json(Response.unauthorized('请先登录'));
            }

            logger.info('获取用户信息:', { userId });

            // 使用getUserProfile方法获取用户信息
            const userInfo = await userService.getUserProfile(userId);
            if (!userInfo) {
                logger.warn('获取用户信息失败: 用户不存在', { userId });
                return res.status(404).json(Response.notFound('用户不存在'));
            }
            
            res.json(Response.success(userInfo, '获取用户信息成功'));
        } catch (error) {
            logger.error('获取用户信息失败:', { 
                error: error.message,
                stack: error.stack,
                userId: req.user?.id 
            });

            res.status(500).json(Response.error('获取用户信息失败'));
        }
    }

    /**
     * 更新用户信息
     * @param {Object} req 请求对象
     * @param {Object} res 响应对象
     */
    async updateUserInfo(req, res) {
        try {
            const userId = req.user.id;
            const updateData = req.body;
            
            // 使用updateUserProfile方法更新用户信息
            const result = await userService.updateUserProfile(userId, updateData);
            res.json(Response.success(result, '更新用户信息成功'));
        } catch (error) {
            logger.error('更新用户信息失败', { error: error.message });
            if (error.message === '用户不存在') {
                res.status(404).json(Response.notFound(error.message));
            } else {
                res.status(500).json(Response.error(error.message || '更新用户信息失败'));
            }
        }
    }

    /**
     * 刷新token
     * @param {Object} req 请求对象
     * @param {Object} res 响应对象
     */
    async refreshToken(req, res) {
        try {
            const token = req.headers.authorization?.split(' ')[1];
            const result = await userService.refreshToken(token);
            res.json(Response.success(result, 'Token刷新成功'));
        } catch (error) {
            logger.error('Token刷新失败', { error: error.message });
            if (error.message.includes('Token')) {
                res.status(401).json(Response.unauthorized(error.message));
            } else {
                res.status(500).json(Response.error('Token刷新失败'));
            }
        }
    }

    /**
     * 更新用户状态（仅管理员）
     */
    async updateUserStatus(req, res) {
        try {
            const { userId, status } = req.body;
            const result = await userService.updateUserStatus(userId, status);
            res.json(Response.success(result, '更新用户状态成功'));
        } catch (error) {
            logger.error('更新用户状态失败:', error);
            res.status(500).json(Response.error('更新用户状态失败'));
        }
    }

    /**
     * 更新用户角色（仅管理员）
     */
    async updateUserRole(req, res) {
        try {
            const { userId, role } = req.body;
            const result = await userService.updateUserRole(userId, role);
            res.json(Response.success(result, '更新用户角色成功'));
        } catch (error) {
            logger.error('更新用户角色失败:', error);
            res.status(500).json(Response.error('更新用户角色失败'));
        }
    }

    /**
     * 获取所有可用角色（仅管理员可用）
     */
    async getRoles(req, res) {
        try {
            // 只返回等级低于当前用户的角色
            const availableRoles = Object.entries(ROLES)
                .filter(([_, role]) => ROLE_LEVELS[role] < ROLE_LEVELS[req.user.role])
                .reduce((acc, [key, value]) => {
                    acc[key] = value;
                    return acc;
                }, {});

            res.json(Response.success({ roles: availableRoles }, '获取角色列表成功'));
        } catch (error) {
            logger.error('获取角色列表失败:', error);
            res.status(500).json(Response.error('获取角色列表失败'));
        }
    }

    /**
     * 获取所有用户列表
     * @param {Object} req 请求对象
     * @param {Object} res 响应对象
     */
    async getAllUsers(req, res) {
        try {
            const users = await userService.getAllUsers();
            res.json(Response.success(users, '获取用户列表成功'));
        } catch (error) {
            logger.error('获取用户列表错误:', error);
            res.status(500).json(Response.error(error.message));
        }
    }

    /**
     * 获取单个用户信息
     * @param {Object} req 请求对象
     * @param {Object} res 响应对象
     */
    async getUserById(req, res) {
        try {
            const { id } = req.params;
            const user = await userService.getUserById(id);
            res.json(Response.success(user, '获取用户信息成功'));
        } catch (error) {
            logger.error('获取用户信息错误:', error);
            if (error.message === '用户不存在') {
                res.status(404).json(Response.notFound(error.message));
            } else {
                res.status(500).json(Response.error(error.message));
            }
        }
    }

    /**
     * 获取用户列表（分页）
     * @param {Object} req 请求对象
     * @param {Object} res 响应对象
     */
    async getUserList(req, res) {
        try {
            const params = req.query;
            const result = await userService.getUserList(params);
            res.json(Response.success(result, '获取用户列表成功'));
        } catch (error) {
            logger.error('获取用户列表错误:', error);
            res.status(500).json(Response.error(error.message));
        }
    }

    /**
     * 更新用户信息
     * @param {Object} req 请求对象
     * @param {Object} res 响应对象
     */
    async updateUser(req, res) {
        try {
            const { id } = req.params;
            const updateData = req.body;
            const user = await userService.updateUser(id, updateData);
            res.json(Response.success(user, '更新用户信息成功'));
        } catch (error) {
            logger.error('更新用户信息错误:', error);
            if (error.message === '用户不存在') {
                res.status(404).json(Response.notFound(error.message));
            } else {
                res.status(500).json(Response.error(error.message));
            }
        }
    }

    /**
     * 删除用户
     * @param {Object} req 请求对象
     * @param {Object} res 响应对象
     */
    async deleteUser(req, res) {
        try {
            const { id } = req.params;
            await userService.deleteUser(id);
            res.json(Response.success(null, '删除用户成功'));
        } catch (error) {
            logger.error('删除用户错误:', error);
            if (error.message === '用户不存在') {
                res.status(404).json(Response.notFound(error.message));
            } else {
                res.status(500).json(Response.error(error.message));
            }
        }
    }
}

module.exports = new UserController();
