const { Op } = require('sequelize');
const { Activity } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');
const { createBackup } = require('../utils/dbBackup');
const logger = require('../utils/logger');
const { Admin, AdminToken } = require('../models');
const fs = require('fs').promises;
const path = require('path');

class AdminService {
    /**
     * 创建管理员
     * @param {Object} adminData 管理员数据
     * @returns {Promise<Admin>} 创建的管理员对象
     */
    async createAdmin(adminData) {
        try {
            // 检查邮箱是否已存在
            const existingAdmin = await Admin.findOne({
                where: { email: adminData.email }
            });

            if (existingAdmin) {
                throw new Error('邮箱已被使用');
            }

            // 对密码进行hash处理
            const hashedPassword = await bcrypt.hash(adminData.password, 10);

            // 创建管理员
            const admin = await Admin.create({
                ...adminData,
                password: hashedPassword,
                status: adminData.status || 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            });

            logger.info('管理员创建成功:', { 
                adminId: admin.id,
                role: admin.role
            });

            // 返回不包含密码的管理员信息
            const { password, ...adminInfo } = admin.toJSON();
            return adminInfo;
        } catch (error) {
            logger.error('创建管理员失败:', error);
            throw error;
        }
    }

    /**
     * 初始化超级管理员
     * @param {Object} superAdminData 超级管理员数据
     * @returns {Promise<Admin>} 创建的超级管理员对象
     */
    async initializeSuperAdmin(superAdminData) {
        try {
            // 检查是否已存在超级管理员
            const existingSuperAdmin = await Admin.findOne({
                where: { role: 'super_admin' }
            });

            if (existingSuperAdmin) {
                throw new Error('超级管理员已存在');
            }

            // 创建超级管理员
            const adminData = {
                ...superAdminData,
                role: 'super_admin', // 强制设置为超级管理员角色
                status: 'active'
            };

            return await this.createAdmin(adminData);
        } catch (error) {
            logger.error('初始化超级管理员失败:', error);
            throw error;
        }
    }

    /**
     * 管理员登录
     * @param {string} email 邮箱
     * @param {string} password 密码
     * @param {Object} options 选项（userAgent, ipAddress）
     * @returns {Promise<Object>} 登录结果
     */
    async login(email, password, options = {}) {
        try {
            const admin = await Admin.findOne({
                where: { 
                    email,
                    status: 'active'
                }
            });

            if (!admin) {
                throw new Error('邮箱或密码错误');
            }

            const isValidPassword = await admin.validatePassword(password);
            if (!isValidPassword) {
                throw new Error('邮箱或密码错误');
            }

            // 生成新token
            const token = await this.generateAndSaveToken(admin, options);

            // 更新最后登录时间
            await admin.update({
                lastLoginAt: new Date()
            });

            logger.info('管理员登录成功:', { adminId: admin.id });

            return {
                token,
                admin: {
                    id: admin.id,
                    email: admin.email,
                    name: admin.name,
                    role: admin.role
                }
            };
        } catch (error) {
            logger.error('管理员登录失败:', error);
            throw error;
        }
    }

    /**
     * 获取所有管理员列表
     * @returns {Promise<Array>} 管理员列表
     */
    async getAllAdmins() {
        try {
            return await Admin.findAll({
                attributes: ['id', 'name', 'email', 'role', 'status', 'lastLoginAt', 'createdAt'],
                order: [['createdAt', 'DESC']]
            });
        } catch (error) {
            logger.error('获取管理员列表失败:', error);
            throw error;
        }
    }

    /**
     * 获取单个管理员信息
     * @param {number} id 管理员ID
     * @returns {Promise<Object>} 管理员信息
     */
    async getAdminById(id) {
        try {
            const admin = await Admin.findByPk(id, {
                attributes: ['id', 'name', 'email', 'role', 'status', 'lastLoginAt', 'createdAt']
            });
            if (!admin) {
                throw new Error('管理员不存在');
            }
            return admin;
        } catch (error) {
            logger.error('获取管理员信息失败:', error);
            throw error;
        }
    }

    /**
     * 获取管理员列表
     * @param {Object} params 查询参数
     * @returns {Promise<Object>} 管理员列表
     */
    async getAdminList(params) {
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
                    { name: { [Op.like]: `%${keyword}%` } },
                    { email: { [Op.like]: `%${keyword}%` } }
                ];
            }
            if (startDate && endDate) {
                where.createdAt = {
                    [Op.between]: [startDate, endDate]
                };
            }

            const { rows: admins, count: total } = await Admin.findAndCountAll({
                where,
                attributes: ['id', 'name', 'email', 'role', 'status', 'lastLoginAt', 'createdAt'],
                offset: (page - 1) * pageSize,
                limit: pageSize,
                order: [['createdAt', 'DESC']]
            });

            return {
                list: admins,
                pagination: {
                    total,
                    page: Number(page),
                    pageSize: Number(pageSize),
                    totalPages: Math.ceil(total / pageSize)
                }
            };
        } catch (error) {
            logger.error('获取管理员列表失败:', error);
            throw error;
        }
    }

    /**
     * 更新管理员信息
     * @param {number} id 管理员ID
     * @param {Object} updateData 更新数据
     * @returns {Promise<Object>} 更新后的管理员信息
     */
    async updateAdmin(id, updateData) {
        try {
            const admin = await Admin.findByPk(id);
            if (!admin) {
                throw new Error('管理员不存在');
            }

            // 如果是更新超级管理员，需要特殊处理
            if (admin.role === 'super_admin' && updateData.role && updateData.role !== 'super_admin') {
                throw new Error('不能降级超级管理员的角色');
            }

            // 更新管理员信息
            await admin.update(updateData);

            logger.info('管理员信息更新成功:', { 
                adminId: id,
                updatedFields: Object.keys(updateData).join(', ')
            });

            // 返回更新后的管理员信息（不包含密码）
            return await this.getAdminById(id);
        } catch (error) {
            logger.error('更新管理员信息失败:', error);
            throw error;
        }
    }

    /**
     * 删除管理员
     * @param {number} id 管理员ID
     */
    async deleteAdmin(id) {
        try {
            const admin = await Admin.findByPk(id);
            if (!admin) {
                throw new Error('管理员不存在');
            }

            if (admin.role === 'super_admin') {
                throw new Error('不能删除超级管理员');
            }

            await admin.destroy();
            logger.info('管理员删除成功:', { adminId: id });
        } catch (error) {
            logger.error('删除管理员失败:', error);
            throw error;
        }
    }

    /**
     * 获取系统统计信息
     * @returns {Promise<Object>} 系统统计信息
     */
    async getSystemStats() {
        try {
            const [adminCount, activityCount, recentActivities] = await Promise.all([
                Admin.count(),
                Activity.count(),
                Activity.findAll({
                    limit: 5,
                    order: [['createdAt', 'DESC']],
                    attributes: ['id', 'title', 'status', 'createdAt']
                })
            ]);

            return {
                adminCount,
                activityCount,
                recentActivities,
                systemInfo: {
                    uptime: process.uptime(),
                    memory: process.memoryUsage(),
                    nodeVersion: process.version
                }
            };
        } catch (error) {
            logger.error('获取系统统计信息失败:', error);
            throw error;
        }
    }

    /**
     * 备份数据库
     * @returns {Promise<string>} 备份文件路径
     */
    async backupDatabase() {
        try {
            const backupPath = await createBackup();
            logger.info('数据库备份成功:', { backupPath });
            return backupPath;
        } catch (error) {
            logger.error('数据库备份失败:', error);
            throw error;
        }
    }

    /**
     * 生成并保存管理员token
     * @param {Admin} admin 管理员对象
     * @param {Object} options 选项（userAgent, ipAddress）
     * @returns {Promise<string>} token
     */
    async generateAndSaveToken(admin, options = {}) {
        try {
            // 生成token
            const token = jwt.sign(
                { 
                    id: admin.id,
                    role: admin.role,
                    email: admin.email,
                    type: 'admin'
                },
                config.JWT_SECRET,
                { expiresIn: config.JWT_EXPIRES_IN_ADMIN }
            );

            // 计算过期时间
            const expiresAt = new Date(Date.now() + config.JWT_EXPIRES_IN_ADMIN * 1000);

            // 删除该管理员的所有旧token
            await AdminToken.destroy({
                where: { adminId: admin.id }
            });

            // 保存新token到数据库
            await AdminToken.create({
                adminId: admin.id,
                token,
                expiresAt,
                userAgent: options.userAgent,
                ipAddress: options.ipAddress,
                lastUsedAt: new Date()
            });

            logger.info('管理员token生成成功:', { adminId: admin.id });
            logger.info('获取到的user-agent:', {userAgent: options.userAgent });
            return token;
        } catch (error) {
            logger.error('生成管理员token失败:', error);
            throw error;
        }
    }

    /**
     * 刷新token
     * @param {string} oldToken 旧token
     * @param {Object} options 选项（userAgent, ipAddress）
     * @returns {Promise<Object>} 新token和管理员信息
     */
    async refreshToken(oldToken, options = {}) {
        try {
            // 验证旧token是否存在且未过期
            const tokenRecord = await AdminToken.findOne({
                where: {
                    token: oldToken,
                    expiresAt: {
                        [Op.gt]: new Date()
                    }
                },
                include: [{
                    model: Admin,
                    as: 'admin',
                    where: { status: 'active' }
                }]
            });

            if (!tokenRecord || !tokenRecord.admin) {
                throw new Error('无效或已过期的token');
            }

            // 计算剩余时间（秒）
            const remainingTime = Math.floor((tokenRecord.expiresAt - new Date()) / 1000);
            
            // 如果剩余时间小于过期时间的一半，则刷新token
            if (remainingTime < config.JWT_EXPIRES_IN_ADMIN / 2) {
                // 删除旧token
                await tokenRecord.destroy();

                // 生成新token，保留原来的userAgent和ipAddress
                const newToken = await this.generateAndSaveToken(tokenRecord.admin, {
                    userAgent: options.userAgent || tokenRecord.userAgent,
                    ipAddress: options.ipAddress || tokenRecord.ipAddress
                });

                logger.info('管理员token刷新成功:', { adminId: tokenRecord.admin.id });

                return {
                    token: newToken,
                    admin: {
                        id: tokenRecord.admin.id,
                        email: tokenRecord.admin.email,
                        name: tokenRecord.admin.name,
                        role: tokenRecord.admin.role
                    }
                };
            }

            // 如果token还有足够的有效期，更新最后使用时间
            await tokenRecord.update({
                lastUsedAt: new Date(),
                userAgent: options.userAgent || tokenRecord.userAgent,
                ipAddress: options.ipAddress || tokenRecord.ipAddress
            });

            // 直接返回当前token
            return {
                token: oldToken,
                admin: {
                    id: tokenRecord.admin.id,
                    email: tokenRecord.admin.email,
                    name: tokenRecord.admin.name,
                    role: tokenRecord.admin.role
                }
            };
        } catch (error) {
            logger.error('刷新token失败:', error);
            throw error;
        }
    }

    /**
     * 管理员登出
     * @param {string} token token
     * @returns {Promise<boolean>} 是否成功
     */
    async logout(token) {
        try {
            // 删除token
            const result = await AdminToken.destroy({
                where: { token }
            });

            if (result === 0) {
                throw new Error('token不存在');
            }

            logger.info('管理员登出成功');
            return true;
        } catch (error) {
            logger.error('管理员登出失败:', error);
            throw error;
        }
    }

    /**
     * 清理过期的token
     * @returns {Promise<number>} 清理的token数量
     */
    async cleanExpiredTokens() {
        try {
            const result = await AdminToken.destroy({
                where: {
                    expiresAt: {
                        [Op.lt]: new Date()
                    }
                }
            });

            logger.info('清理过期token成功:', { count: result });
            return result;
        } catch (error) {
            logger.error('清理过期token失败:', error);
            throw error;
        }
    }

    /**
     * 验证token并处理滑动过期
     * @param {string} token JWT token
     * @param {Object} options 选项（userAgent, ipAddress）
     * @returns {Promise<Object>} 解码后的管理员信息和新token（如果需要刷新）
     */
    async verifyToken(token, options = {}) {
        try {
            // 验证 JWT
            const decoded = jwt.verify(token, config.JWT_SECRET);
            
            if (decoded.type !== 'admin') {
                throw new Error('无效的token类型');
            }

            // 查找数据库中的token记录
            const tokenRecord = await AdminToken.findOne({
                where: {
                    token,
                    expiresAt: {
                        [Op.gt]: new Date()
                    }
                }
            });

            if (!tokenRecord) {
                throw new Error('Token不存在或已过期');
            }

            // 查找管理员
            const admin = await Admin.findOne({
                where: {
                    id: decoded.id,
                    status: 'active'
                }
            });

            if (!admin) {
                throw new Error('管理员不存在或已被禁用');
            }

            // 计算token剩余有效期（秒）
            const remainingTime = Math.floor((tokenRecord.expiresAt - new Date()) / 1000);
            const refreshThreshold = 600; // 10分钟阈值，单位秒

            // 如果剩余时间小于阈值，生成新token
            let newToken = null;
            if (remainingTime < refreshThreshold) {
                // 生成新token，保留原来的userAgent和ipAddress
                newToken = await this.generateAndSaveToken(admin, {
                    userAgent: options.userAgent || tokenRecord.userAgent,
                    ipAddress: options.ipAddress || tokenRecord.ipAddress
                });
                
                // 删除旧token
                await tokenRecord.destroy();
                
                logger.info('管理员token已刷新:', { adminId: admin.id });
            } else {
                // 更新最后使用时间和访问信息
                await tokenRecord.update({
                    lastUsedAt: new Date(),
                    userAgent: options.userAgent || tokenRecord.userAgent,
                    ipAddress: options.ipAddress || tokenRecord.ipAddress
                });
            }

            return {
                admin: {
                    id: admin.id,
                    email: admin.email,
                    name: admin.name,
                    role: admin.role
                },
                newToken
            };
        } catch (error) {
            logger.error('验证token失败:', error);
            throw error;
        }
    }

    /**
     * 修改管理员密码
     * @param {number} adminId 管理员ID
     * @param {string} oldPassword 旧密码
     * @param {string} newPassword 新密码
     * @returns {Promise<void>}
     */
    async changePassword(adminId, oldPassword, newPassword) {
        try {
            const admin = await Admin.findByPk(adminId);
            if (!admin) {
                throw new Error('管理员不存在');
            }

            // 验证旧密码
            const isValidPassword = await admin.validatePassword(oldPassword);
            if (!isValidPassword) {
                throw new Error('旧密码错误');
            }

            // 对新密码进行hash处理
            const hashedPassword = await bcrypt.hash(newPassword, 10);

            // 更新密码
            await admin.update({
                password: hashedPassword,
                updatedAt: new Date()
            });

            logger.info('管理员密码修改成功:', { adminId });
        } catch (error) {
            logger.error('修改密码失败:', error);
            throw error;
        }
    }

    /**
     * 获取活动列表
     * @param {Object} params 查询参数
     * @returns {Promise<Object>} 活动列表和总数
     */
    async getActivities(params) {
        try {
            const {
                page = 1,
                pageSize = 10,
                status,
                type,
                keyword,
                startDate,
                endDate
            } = params;

            const where = {};
            if (status) where.status = status;
            if (type) where.type = type;
            if (keyword) {
                where[Op.or] = [
                    { title: { [Op.like]: `%${keyword}%` } },
                    { description: { [Op.like]: `%${keyword}%` } }
                ];
            }
            if (startDate && endDate) {
                where.startTime = {
                    [Op.between]: [startDate, endDate]
                };
            }

            const { rows: activities, count: total } = await Activity.findAndCountAll({
                where,
                order: [['createdAt', 'DESC']],
                limit: parseInt(pageSize),
                offset: (parseInt(page) - 1) * parseInt(pageSize)
            });

            return {
                activities,
                pagination: {
                    total,
                    page: parseInt(page),
                    pageSize: parseInt(pageSize)
                }
            };
        } catch (error) {
            logger.error('获取活动列表失败:', error);
            throw error;
        }
    }

    /**
     * 获取活动详情
     * @param {number} id 活动ID
     * @returns {Promise<Object>} 活动详情
     */
    async getActivityById(id) {
        try {
            const activity = await Activity.findByPk(id);
            if (!activity) {
                throw new Error('活动不存在');
            }
            return activity;
        } catch (error) {
            logger.error('获取活动详情失败:', error);
            throw error;
        }
    }

    /**
     * 更新活动状态
     * @param {number} id 活动ID
     * @param {string} status 新状态
     * @returns {Promise<Object>} 更新后的活动信息
     */
    async updateActivityStatus(id, status) {
        try {
            const activity = await Activity.findByPk(id);
            if (!activity) {
                throw new Error('活动不存在');
            }

            // 验证状态值是否有效
            const validStatuses = ['draft', 'published', 'ongoing', 'completed', 'cancelled'];
            if (!validStatuses.includes(status)) {
                throw new Error('无效的状态值');
            }

            await activity.update({
                status,
                updatedAt: new Date()
            });

            logger.info('活动状态更新成功:', { activityId: id, status });
            return activity;
        } catch (error) {
            logger.error('更新活动状态失败:', error);
            throw error;
        }
    }

    /**
     * 获取系统日志
     * @param {Object} params 查询参数
     * @returns {Promise<Object>} 系统日志列表和总数
     */
    async getSystemLogs(params) {
        try {
            const {
                page = 1,
                pageSize = 50,
                level,
                startDate,
                endDate
            } = params;

            // 从日志文件中读取并解析日志
            // 注意：这里需要根据实际的日志存储方式来实现
            // 以下是一个示例实现，假设日志存储在数据库中
            const logs = await this.readLogsFromFile(startDate, endDate, level);
            
            // 分页处理
            const start = (page - 1) * pageSize;
            const end = start + pageSize;
            const paginatedLogs = logs.slice(start, end);

            return {
                logs: paginatedLogs,
                pagination: {
                    total: logs.length,
                    page: parseInt(page),
                    pageSize: parseInt(pageSize)
                }
            };
        } catch (error) {
            logger.error('获取系统日志失败:', error);
            throw error;
        }
    }

    /**
     * 从日志文件中读取日志
     * @private
     * @param {Date} startDate 开始日期
     * @param {Date} endDate 结束日期
     * @param {string} level 日志级别
     * @returns {Promise<Array>} 日志数组
     */
    async readLogsFromFile(startDate, endDate, level) {
        try {
            const logsDir = path.join(process.cwd(), 'logs');
            const logFiles = await fs.readdir(logsDir);
            const logs = [];

            for (const file of logFiles) {
                if (file.endsWith('.log')) {
                    const content = await fs.readFile(path.join(logsDir, file), 'utf-8');
                    const lines = content.split('\n').filter(line => line.trim());

                    for (const line of lines) {
                        try {
                            const logEntry = this.parseLogLine(line);
                            if (this.isLogInRange(logEntry, startDate, endDate, level)) {
                                logs.push(logEntry);
                            }
                        } catch (e) {
                            logger.warn('解析日志行失败:', { line, error: e.message });
                        }
                    }
                }
            }

            return logs.sort((a, b) => b.timestamp - a.timestamp);
        } catch (error) {
            logger.error('读取日志文件失败:', error);
            return [];
        }
    }

    /**
     * 解析日志行
     * @private
     * @param {string} line 日志行
     * @returns {Object} 解析后的日志对象
     */
    parseLogLine(line) {
        const match = line.match(/^(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}:\d{3}) \[(\w+)\] (.+)$/);
        if (!match) {
            throw new Error('无效的日志格式');
        }

        return {
            timestamp: new Date(match[1]),
            level: match[2],
            message: match[3],
            raw: line
        };
    }

    /**
     * 判断日志是否在指定范围内
     * @private
     * @param {Object} log 日志对象
     * @param {Date} startDate 开始日期
     * @param {Date} endDate 结束日期
     * @param {string} level 日志级别
     * @returns {boolean} 是否在范围内
     */
    isLogInRange(log, startDate, endDate, level) {
        if (level && log.level.toLowerCase() !== level.toLowerCase()) {
            return false;
        }

        if (startDate && log.timestamp < new Date(startDate)) {
            return false;
        }

        if (endDate && log.timestamp > new Date(endDate)) {
            return false;
        }

        return true;
    }

    /**
     * 重置管理员密码为123456
     * @param {number} id 管理员ID
     * @returns {Promise<Object>} 管理员信息
     */
    async resetAdminPassword(id) {
        try {
            const admin = await Admin.findByPk(id);
            if (!admin) {
                throw new Error('管理员不存在');
            }

            // 如果是超级管理员，只有超级管理员自己可以重置密码
            if (admin.role === 'super_admin') {
                throw new Error('无权重置超级管理员密码');
            }

            // 直接设置密码，让 Model hooks 处理加密
            await admin.update({
                password: '123456'
            });

            // 删除该管理员的所有token，强制重新登录
            await AdminToken.destroy({
                where: { adminId: id }
            });

            logger.info('管理员密码重置成功:', { 
                adminId: id,
                adminName: admin.name,
                adminEmail: admin.email 
            });

            // 返回管理员信息（不包含密码）
            const { password, ...adminInfo } = admin.toJSON();
            return adminInfo;
        } catch (error) {
            logger.error('重置管理员密码失败:', error);
            throw error;
        }
    }

    /**
     * 恢复已删除的管理员
     * @param {number} id 管理员ID
     * @returns {Promise<Object>} 恢复后的管理员信息
     */
    async restoreAdmin(id) {
        try {
            // 查找被软删除的管理员
            const admin = await Admin.findOne({
                where: { id },
                paranoid: false // 包括已软删除的记录
            });

            if (!admin) {
                throw new Error('管理员不存在');
            }

            // 检查管理员是否已被删除
            if (!admin.deleted_at) {
                throw new Error('管理员未被删除');
            }

            // 恢复管理员
            await admin.restore();

            logger.info('管理员恢复成功:', { 
                adminId: id,
                adminName: admin.name,
                adminEmail: admin.email 
            });

            // 返回恢复后的管理员信息
            return await this.getAdminById(id);
        } catch (error) {
            logger.error('恢复管理员失败:', error);
            throw error;
        }
    }
}

module.exports = new AdminService(); 