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
     * 管理员登录
     * @param {Object} req 请求对象
     * @param {Object} res 响应对象
     */
    async login(req, res) {
        try {
            const { email, password } = req.body;
            
            if (!email || !password) {
                return res.status(400).json(Response.badRequest('邮箱和密码不能为空'));
            }

            const userAgent = req.get('user-agent');
            logger.info('获取到的user-agent:', { userAgent });
            
            const result = await adminService.login(email, password, {
                userAgent,
                ipAddress: req.ip
            });

            res.json(Response.success(result, '登录成功'));
        } catch (error) {
            logger.error('管理员登录失败:', error);
            if (error.message === '邮箱或密码错误') {
                res.status(401).json(Response.unauthorized(error.message));
            } else {
                res.status(500).json(Response.error(error.message));
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
            const { oldToken } = req.body;
            
            if (!oldToken) {
                return res.status(400).json(Response.badRequest('旧token不能为空'));
            }

            const userAgent = req.get('user-agent');
            const result = await adminService.refreshToken(oldToken, {
                userAgent,
                ipAddress: req.ip
            });

            res.json(Response.success(result, 'Token刷新成功'));
        } catch (error) {
            logger.error('Token刷新错误:', error);
            if (error.message === '无效或已过期的token') {
                res.status(401).json(Response.unauthorized(error.message));
            } else {
                res.status(500).json(Response.error(error.message));
            }
        }
    }

    /**
     * 管理员登出
     * @param {Object} req 请求对象
     * @param {Object} res 响应对象
     */
    async logout(req, res) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            await adminService.logout(token);
            res.json(Response.success(null, '登出成功'));
        } catch (error) {
            logger.error('管理员登出错误:', error);
            if (error.message === 'token不存在') {
                res.status(400).json(Response.badRequest(error.message));
            } else {
                res.status(500).json(Response.error(error.message));
            }
        }
    }

    /**
     * 清理过期token
     */
    async cleanExpiredTokens() {
        try {
            return await adminService.cleanExpiredTokens();
        } catch (error) {
            logger.error('清理过期token错误:', error);
            throw error;
        }
    }

    /**
     * 获取管理员列表
     * @param {Object} req 请求对象
     * @param {Object} res 响应对象
     */
    async getAdminList(req, res) {
        try {
            const params = req.query;
            const admins = await adminService.getAdminList(params);
            res.json(Response.success(admins, '获取管理员列表成功'));
        } catch (error) {
            logger.error('获取管理员列表错误:', error);
            res.status(500).json(Response.error(error.message));
        }
    }

    /**
     * 获取单个管理员信息
     * @param {Object} req 请求对象
     * @param {Object} res 响应对象
     */
    async getAdminById(req, res) {
        try {
            const { id } = req.params;
            const admin = await adminService.getAdminById(id);
            res.json(Response.success(admin, '获取管理员信息成功'));
        } catch (error) {
            logger.error('获取管理员信息错误:', error);
            if (error.message === '管理员不存在') {
                res.status(404).json(Response.notFound(error.message));
            } else {
                res.status(500).json(Response.error(error.message));
            }
        }
    }

/**
 * 更新管理员信息
 * @param {Object} req 请求对象
 * @param {Object} res 响应对象
 */
async updateAdmin(req, res) {
    try {
        const { id } = req.params;
        const updateData = req.body;

        // 校验更新数据是否为空
        if (!updateData || Object.keys(updateData).length === 0) {
            return res.status(400).json(Response.badRequest('更新数据不能为空'));
        }

        // 只允许更新特定字段
        const allowedFields = ['name', 'email', 'status', 'role']; // 可根据需求扩展字段
        const filteredData = {};
        for (const field of allowedFields) {
            if (updateData[field] !== undefined) {
                filteredData[field] = updateData[field];
            }
        }

        if (Object.keys(filteredData).length === 0) {
            return res.status(400).json(Response.badRequest('没有可更新的有效字段'));
        }

        const admin = await adminService.updateAdmin(id, filteredData);
        res.json(Response.success(admin, '更新管理员信息成功'));
    } catch (error) {
        logger.error('更新管理员信息错误:', error);
        if (error.message === '管理员不存在') {
            res.status(404).json(Response.notFound(error.message));
        } else {
            res.status(500).json(Response.error(error.message));
        }
    }
}
/**
 * 更新管理员信息
 * @param {Object} req 请求对象
 * @param {Object} res 响应对象
 */
async updateAdmin(req, res) {
    try {
        const { id } = req.params;
        const updateData = req.body;

        // 校验更新数据是否为空
        if (!updateData || Object.keys(updateData).length === 0) {
            return res.status(400).json(Response.badRequest('更新数据不能为空'));
        }

        // 只允许更新特定字段
        const allowedFields = ['name', 'email', 'status', 'role']; // 可根据需求扩展字段
        const filteredData = {};
        for (const field of allowedFields) {
            if (updateData[field] !== undefined) {
                filteredData[field] = updateData[field];
            }
        }

        if (Object.keys(filteredData).length === 0) {
            return res.status(400).json(Response.badRequest('没有可更新的有效字段'));
        }

        const admin = await adminService.updateAdmin(id, filteredData);
        res.json(Response.success(admin, '更新管理员信息成功'));
    } catch (error) {
        logger.error('更新管理员信息错误:', error);
        if (error.message === '管理员不存在') {
            res.status(404).json(Response.notFound(error.message));
        } else {
            res.status(500).json(Response.error(error.message));
        }
    }
}


    /**
     * 删除管理员
     * @param {Object} req 请求对象
     * @param {Object} res 响应对象
     */
    async deleteAdmin(req, res) {
        try {
            const { id } = req.params;
            await adminService.deleteAdmin(id);
            res.json(Response.success(null, '删除管理员成功'));
        } catch (error) {
            logger.error('删除管理员错误:', error);
            if (error.message === '管理员不存在' || error.message === '不能删除超级管理员') {
                res.status(400).json(Response.badRequest(error.message));
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
     * 创建管理员
     * @param {Object} req 请求对象
     * @param {Object} res 响应对象
     */
    async createAdmin(req, res) {
        try {
            const adminData = req.body;
            
            // if (!adminData.email || !adminData.password || !adminData.name||!adminData.role) {
            //     return res.status(400).json(Response.badRequest('邮箱、密码、姓名和角色不能为空'));
            // }
                    // 验证必填字段（增加role验证）
        const requiredFields = ['email', 'password', 'name', 'role'];
        const missingFields = requiredFields.filter(field => !adminData[field]);
        
        if (missingFields.length > 0) {
            return res.status(400).json(
                Response.badRequest(`缺少必填字段: ${missingFields.join(', ')}`)
            );
        }

            const admin = await adminService.createAdmin(adminData);
            res.status(201).json(Response.success(admin, '管理员创建成功'));
        } catch (error) {
            logger.error('创建管理员错误:', error);
            if (error.message === '邮箱已被使用') {
                res.status(400).json(Response.badRequest(error.message));
            } else {
                res.status(500).json(Response.error(error.message));
            }
        }
    }

    /**
     * 初始化超级管理员
     * @param {Object} req 请求对象
     * @param {Object} res 响应对象
     */
    async initializeSuperAdmin(req, res) {
        try {
            const superAdminData = req.body;
            
            if (!superAdminData.email || !superAdminData.password || !superAdminData.name) {
                return res.status(400).json(Response.badRequest('邮箱、密码和姓名不能为空'));
            }

            const admin = await adminService.initializeSuperAdmin(superAdminData);
            res.status(201).json(Response.success(admin, '超级管理员创建成功'));
        } catch (error) {
            logger.error('初始化超级管理员错误:', error);
            if (error.message === '超级管理员已存在') {
                res.status(400).json(Response.badRequest(error.message));
            } else {
                res.status(500).json(Response.error(error.message));
            }
        }
    }

    /**
     * 获取管理员个人资料
     * @param {Object} req 请求对象
     * @param {Object} res 响应对象
     */
    async getProfile(req, res) {
        try {
            const adminId = req.admin.id;
            const profile = await adminService.getAdminById(adminId);
            res.json(Response.success(profile, '获取个人资料成功'));
        } catch (error) {
            logger.error('获取管理员个人资料错误:', error);
            res.status(500).json(Response.error(error.message));
        }
    }

    /**
     * 更新个人资料
     * @param {Object} req 请求对象
     * @param {Object} res 响应对象
     */
    async updateProfile(req, res) {
        try {
            const adminId = req.admin.id;
            const updateData = req.body;

            // 验证更新数据
            if (!updateData || (Object.keys(updateData).length === 0)) {
                return res.status(400).json(Response.badRequest('更新数据不能为空'));
            }

            // 只允许更新特定字段
            const allowedFields = ['name', 'email'];
            const filteredData = {};
            for (const field of allowedFields) {
                if (updateData[field] !== undefined) {
                    filteredData[field] = updateData[field];
                }
            }

            if (Object.keys(filteredData).length === 0) {
                return res.status(400).json(Response.badRequest('没有可更新的有效字段'));
            }

            const profile = await adminService.updateAdmin(adminId, filteredData);
            res.json(Response.success(profile, '更新个人资料成功'));
        } catch (error) {
            logger.error('更新管理员个人资料错误:', error);
            if (error.message === '管理员不存在') {
                res.status(404).json(Response.notFound(error.message));
            } else {
                res.status(500).json(Response.error(error.message));
            }
        }
    }

    /**
     * 修改密码
     * @param {Object} req 请求对象
     * @param {Object} res 响应对象
     */
    async changePassword(req, res) {
        try {
            const adminId = req.admin.id;
            const { oldPassword, newPassword } = req.body;
            
            if (!oldPassword || !newPassword) {
                return res.status(400).json(Response.badRequest('旧密码和新密码不能为空'));
            }

            await adminService.changePassword(adminId, oldPassword, newPassword);
            res.json(Response.success(null, '密码修改成功'));
        } catch (error) {
            logger.error('修改密码错误:', error);
            if (error.message === '旧密码错误') {
                res.status(400).json(Response.badRequest(error.message));
            } else {
                res.status(500).json(Response.error(error.message));
            }
        }
    }

    /**
     * 获取活动列表
     * @param {Object} req 请求对象
     * @param {Object} res 响应对象
     */
    async getActivities(req, res) {
        try {
            const params = req.query;
            const activities = await adminService.getActivities(params);
            res.json(Response.success(activities, '获取活动列表成功'));
        } catch (error) {
            logger.error('获取活动列表错误:', error);
            res.status(500).json(Response.error(error.message));
        }
    }

    /**
     * 获取活动详情
     * @param {Object} req 请求对象
     * @param {Object} res 响应对象
     */
    async getActivityById(req, res) {
        try {
            const { id } = req.params;
            const activity = await adminService.getActivityById(id);
            res.json(Response.success(activity, '获取活动详情成功'));
        } catch (error) {
            logger.error('获取活动详情错误:', error);
            if (error.message === '活动不存在') {
                res.status(404).json(Response.notFound(error.message));
            } else {
                res.status(500).json(Response.error(error.message));
            }
        }
    }

    /**
     * 更新活动状态
     * @param {Object} req 请求对象
     * @param {Object} res 响应对象
     */
    async updateActivityStatus(req, res) {
        try {
            const { id } = req.params;
            const { status } = req.body;
            
            if (!status) {
                return res.status(400).json(Response.badRequest('状态不能为空'));
            }

            const activity = await adminService.updateActivityStatus(id, status);
            res.json(Response.success(activity, '更新活动状态成功'));
        } catch (error) {
            logger.error('更新活动状态错误:', error);
            if (error.message === '活动不存在') {
                res.status(404).json(Response.notFound(error.message));
            } else {
                res.status(500).json(Response.error(error.message));
            }
        }
    }

    /**
     * 获取系统日志
     * @param {Object} req 请求对象
     * @param {Object} res 响应对象
     */
    async getSystemLogs(req, res) {
        try {
            const params = req.query;
            const logs = await adminService.getSystemLogs(params);
            res.json(Response.success(logs, '获取系统日志成功'));
        } catch (error) {
            logger.error('获取系统日志错误:', error);
            res.status(500).json(Response.error(error.message));
        }
    }

    /**
     * 重置管理员密码为123456
     * @param {Object} req 请求对象
     * @param {Object} res 响应对象
     */
    async resetAdminPassword(req, res) {
        try {
            logger.info('收到重置密码请求:', {
                adminId: req.params.id,
                method: req.method,
                path: req.path
            });

            const { id } = req.params;

            // 重置密码并获取管理员信息
            const admin = await adminService.resetAdminPassword(id);
            
            res.json(Response.success(admin, `管理员 ${admin.name}(${admin.email}) 的密码已重置为: 123456`));
        } catch (error) {
            logger.error('重置管理员密码错误:', error);
            if (error.message === '管理员不存在') {
                res.status(404).json(Response.notFound(error.message));
            } else if (error.message === '无权重置超级管理员密码') {
                res.status(403).json(Response.forbidden(error.message));
            } else {
                res.status(500).json(Response.error(error.message));
            }
        }
    }

    /**
     * 恢复已删除的管理员
     * @param {Object} req 请求对象
     * @param {Object} res 响应对象
     */
    async restoreAdmin(req, res) {
        try {
            const { id } = req.params;
            
            // 恢复管理员并获取恢复后的信息
            const admin = await adminService.restoreAdmin(id);
            
            res.json(Response.success(admin, `管理员 ${admin.name}(${admin.email}) 已成功恢复`));
        } catch (error) {
            logger.error('恢复管理员错误:', error);
            if (error.message === '管理员不存在') {
                res.status(404).json(Response.notFound(error.message));
            } else if (error.message === '管理员未被删除') {
                res.status(400).json(Response.badRequest(error.message));
            } else {
                res.status(500).json(Response.error(error.message));
            }
        }
    }
}

module.exports = new AdminController(); 