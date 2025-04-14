const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User, Activity } = require('../models');
const config = require('../config');
const { createBackup } = require('../utils/dbBackup');
const adminService = require('../services/adminService');
const { Response } = require('../utils/response');
const logger = require('../utils/logger');

class AdminController {
    /**
     * 获取所有用户列表
     * @param {Object} req 请求对象
     * @param {Object} res 响应对象
     */
    async getAllUsers(req, res) {
        try {
            const users = await adminService.getAllUsers();
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
            const user = await adminService.getUserById(id);
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
     * 更新用户信息
     * @param {Object} req 请求对象
     * @param {Object} res 响应对象
     */
    async updateUser(req, res) {
        try {
            const { id } = req.params;
            const updateData = req.body;
            const user = await adminService.updateUser(id, updateData);
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
            await adminService.deleteUser(id);
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

    /**
     * 获取系统统计信息
     * @param {Object} req 请求对象
     * @param {Object} res 响应对象
     */
    async getSystemStats(req, res) {
        try {
            const stats = await adminService.getSystemStats();
            res.json(Response.success(stats, '获取系统统计信息成功'));
        } catch (error) {
            logger.error('获取系统统计信息错误:', error);
            res.status(500).json(Response.error(error.message));
        }
    }

    /**
     * 备份数据库
     * @param {Object} req 请求对象
     * @param {Object} res 响应对象
     */
    async backupDatabase(req, res) {
        try {
            const backupPath = await adminService.backupDatabase();
            res.json(Response.success({ backupPath }, '数据库备份成功'));
        } catch (error) {
            logger.error('数据库备份错误:', error);
            res.status(500).json(Response.error(error.message));
        }
    }

    /**
     * 管理员登录
     * @param {Object} req 请求对象
     * @param {Object} res 响应对象
     */
    async login(req, res) {
        try {
            const { username, password } = req.body;
            
            if (!username || !password) {
                return res.status(400).json(Response.badRequest('用户名和密码不能为空'));
            }

            const result = await adminService.login(username, password);
            res.json(Response.success(result, '登录成功'));
        } catch (error) {
            logger.error('管理员登录错误:', error);
            if (error.message === '邮箱或密码错误') {
                res.status(401).json(Response.unauthorized(error.message));
            } else {
                res.status(500).json(Response.error(error.message));
            }
        }
    }

    /**
     * 获取角色列表
     * @param {Object} req 请求对象
     * @param {Object} res 响应对象
     */
    async getRoleList(req, res) {
        try {
            const roles = await adminService.getRoleList();
            res.json(Response.success(roles, '获取角色列表成功'));
        } catch (error) {
            logger.error('获取角色列表错误:', error);
            res.status(500).json(Response.error(error.message));
        }
    }

    /**
     * 更新用户角色
     * @param {Object} req 请求对象
     * @param {Object} res 响应对象
     */
    async updateUserRole(req, res) {
        try {
            const { userId, roleId } = req.body;
            const user = await adminService.updateUserRole(userId, roleId);
            res.json(Response.success(user, '更新用户角色成功'));
        } catch (error) {
            logger.error('更新用户角色错误:', error);
            if (error.message === '用户不存在' || error.message === '角色不存在') {
                res.status(404).json(Response.notFound(error.message));
            } else {
                res.status(500).json(Response.error(error.message));
            }
        }
    }

    /**
     * 获取权限列表
     * @param {Object} req 请求对象
     * @param {Object} res 响应对象
     */
    async getPermissionList(req, res) {
        try {
            const permissions = await adminService.getPermissionList();
            res.json(Response.success(permissions, '获取权限列表成功'));
        } catch (error) {
            logger.error('获取权限列表错误:', error);
            res.status(500).json(Response.error(error.message));
        }
    }

    /**
     * 更新角色权限
     * @param {Object} req 请求对象
     * @param {Object} res 响应对象
     */
    async updateRolePermissions(req, res) {
        try {
            const { roleId, permissionIds } = req.body;
            await adminService.updateRolePermissions(roleId, permissionIds);
            res.json(Response.success(null, '更新角色权限成功'));
        } catch (error) {
            logger.error('更新角色权限错误:', error);
            if (error.message === '角色不存在') {
                res.status(404).json(Response.notFound(error.message));
            } else {
                res.status(500).json(Response.error(error.message));
            }
        }
    }
}

module.exports = new AdminController(); 