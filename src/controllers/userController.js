const axios = require('axios');
const { Op } = require('sequelize');
const User = require('../models/User');
const { ROLES, ROLE_LEVELS } = require('../constants/roles');
const userService = require('../services/userService');
const logger = require('../utils/logger');
const { Response } = require('../utils/response');

class UserController {
    /**
     * 处理微信登录
     * @param {Object} req 请求对象
     * @param {Object} res 响应对象
     */
    async wxLogin(req, res) {
        try {
            const { code } = req.body;
            if (!code) {
                logger.warn('微信登录缺少code参数');
                return res.status(400).json(Response.badRequest('缺少code参数'));
            }

            const result = await userService.wxLogin(code);
            logger.info('微信登录成功', { userId: result?.userInfo?.id });
            res.json(Response.success(result, '登录成功'));
        } catch (error) {
            logger.error('微信登录失败', { error: error.message });
            if (error.response?.data?.errcode) {
                // 微信API返回的错误
                res.status(400).json(Response.error(error.response.data.errmsg, error.response.data.errcode));
            } else {
                res.status(500).json(Response.error('登录失败'));
            }
        }
    }

    /**
     * 获取用户信息
     * @param {Object} req 请求对象
     * @param {Object} res 响应对象
     */
    async getUserInfo(req, res) {
        try {
            const userId = req.user.id;
            const result = await userService.getUserInfo(userId);
            res.json(Response.success(result, '获取用户信息成功'));
        } catch (error) {
            logger.error('获取用户信息失败', { error: error.message });
            if (error.message === '用户不存在') {
                res.status(404).json(Response.notFound(error.message));
            } else {
                res.status(500).json(Response.error('获取用户信息失败'));
            }
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
            const result = await userService.updateUserInfo(userId, updateData);
            res.json(Response.success(result, '更新用户信息成功'));
        } catch (error) {
            logger.error('更新用户信息失败', { error: error.message });
            if (error.message === '用户不存在') {
                res.status(404).json(Response.notFound(error.message));
            } else {
                res.status(500).json(Response.error('更新用户信息失败'));
            }
        }
    }

    /**
     * 注销账号
     * @param {Object} req 请求对象
     * @param {Object} res 响应对象
     */
    async deleteAccount(req, res) {
        try {
            const userId = req.user.id;
            await userService.deleteAccount(userId);
            res.json(Response.success(null, '账号注销成功'));
        } catch (error) {
            logger.error('注销账号失败', { error: error.message });
            if (error.message === '用户不存在') {
                res.status(404).json(Response.notFound(error.message));
            } else {
                res.status(500).json(Response.error('注销账号失败'));
            }
        }
    }

    /**
     * 退出登录
     * @param {Object} req 请求对象
     * @param {Object} res 响应对象
     */
    async logout(req, res) {
        try {
            const token = req.headers.authorization?.split(' ')[1];
            await userService.logout(token);
            res.json(Response.success(null, '退出登录成功'));
        } catch (error) {
            logger.error('退出登录失败', { error: error.message });
            res.status(500).json(Response.error('退出登录失败'));
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
            res.json(result);
        } catch (error) {
            logger.error('更新用户状态失败:', error);
            res.status(500).json({
                code: 500,
                message: '更新用户状态失败',
                data: null
            });
        }
    }

    /**
     * 更新用户角色（仅管理员）
     */
    async updateUserRole(req, res) {
        try {
            const { userId, role } = req.body;
            const result = await userService.updateUserRole(userId, role);
            res.json(result);
        } catch (error) {
            logger.error('更新用户角色失败:', error);
            res.status(500).json({
                code: 500,
                message: '更新用户角色失败',
                data: null
            });
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

            res.json({
                code: 200,
                message: '获取成功',
                data: { roles: availableRoles }
            });
        } catch (error) {
            logger.error('获取角色列表失败:', error);
            res.status(500).json({
                code: 500,
                message: '获取角色列表失败',
                data: null
            });
        }
    }

    /**
     * 获取用户列表（仅管理员可用）
     */
    async getUserList(req, res) {
        try {
            const { 
                page = 1, 
                limit = 10, 
                role, 
                status,
                campus,
                grade,
                search 
            } = req.query;
            
            const result = await userService.getUserList({
                page: parseInt(page),
                limit: parseInt(limit),
                role,
                status,
                campus,
                grade,
                search
            });

            res.json(result);
        } catch (error) {
            logger.error('获取用户列表失败:', error);
            res.status(500).json({
                code: 500,
                message: '获取用户列表失败',
                data: null
            });
        }
    }
}

module.exports = new UserController();
