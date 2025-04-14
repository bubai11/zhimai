const { Op } = require('sequelize');
const { User } = require('../models');
// const Role = require('../models/Role');
// const Permission = require('../models/Permission');
// const RolePermission = require('../models/RolePermission');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');
const { createBackup } = require('../utils/dbBackup');
const logger = require('../utils/logger');

class AdminService {
    /**
     * 管理员登录
     * @param {string} email 邮箱
     * @param {string} password 密码
     * @returns {Promise<Object>} 登录结果
     */
    async login(email, password) {
        try {
            const admin = await User.findOne({
                where: { 
                    email,
                    role: 'admin',
                    status: 'active'
                }
            });

            if (!admin || !bcrypt.compareSync(password, admin.password)) {
                throw new Error('邮箱或密码错误');
            }

            // 管理员token包含更多信息，但不包含openId
            const token = jwt.sign(
                { 
                    id: admin.id,
                    role: admin.role,
                    email: admin.email,
                },
                config.JWT_SECRET,
                { expiresIn: config.JWT_EXPIRES_IN }
            );

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
                    nickname: admin.nickname,
                    role: admin.role,
                    campus: admin.campus,
                    avatarUrl: admin.avatarUrl
                }
            };
        } catch (error) {
            logger.error('管理员登录失败:', error);
            throw error;
        }
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
                order: [['createdAt', 'DESC']],
                include: [{
                    model: Role,
                    attributes: ['name', 'description']
                }]
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

            const { password, ...otherData } = updateData;
            const dataToUpdate = { ...otherData };

            if (password) {
                dataToUpdate.password = await bcrypt.hash(password, 10);
            }

            await user.update(dataToUpdate);
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
     * 获取系统统计信息
     * @returns {Promise<Object>} 系统统计信息
     */
    async getSystemStats() {
        try {
            const [userCount, activityCount, recentActivities] = await Promise.all([
                User.count(),
                Activity.count(),
                Activity.findAll({
                    limit: 5,
                    order: [['createdAt', 'DESC']],
                    attributes: ['id', 'title', 'status', 'createdAt']
                })
            ]);

            return {
                userCount,
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

//     /**
//      * 获取角色列表
//      * @returns {Promise<Array>} 角色列表
//      */
//     async getRoleList() {
//         try {
//             return await Role.findAll({
//                 include: [{
//                     model: Permission,
//                     through: { attributes: [] }
//                 }]
//             });
//         } catch (error) {
//             logger.error('获取角色列表失败:', error);
//             throw error;
//         }
//     }

//     /**
//      * 更新用户角色
//      * @param {number} userId 用户ID
//      * @param {number} roleId 角色ID
//      * @returns {Promise<Object>} 更新后的用户信息
//      */
//     async updateUserRole(userId, roleId) {
//         try {
//             const [user, role] = await Promise.all([
//                 User.findByPk(userId),
//                 Role.findByPk(roleId)
//             ]);

//             if (!user) {
//                 throw new Error('用户不存在');
//             }

//             if (!role) {
//                 throw new Error('角色不存在');
//             }

//             await user.update({ roleId });
//             return user;
//         } catch (error) {
//             logger.error('更新用户角色失败:', error);
//             throw error;
//         }
//     }

//     /**
//      * 获取权限列表
//      * @returns {Promise<Array>} 权限列表
//      */
//     async getPermissionList() {
//         try {
//             return await Permission.findAll();
//         } catch (error) {
//             logger.error('获取权限列表失败:', error);
//             throw error;
//         }
//     }

//     /**
//      * 更新角色权限
//      * @param {number} roleId 角色ID
//      * @param {number[]} permissionIds 权限ID数组
//      */
//     async updateRolePermissions(roleId, permissionIds) {
//         try {
//             const role = await Role.findByPk(roleId);
//             if (!role) {
//                 throw new Error('角色不存在');
//             }

//             // 删除旧的权限关联
//             await RolePermission.destroy({
//                 where: { roleId }
//             });

//             // 创建新的权限关联
//             await RolePermission.bulkCreate(
//                 permissionIds.map(permissionId => ({
//                     roleId,
//                     permissionId
//                 }))
//             );
//         } catch (error) {
//             logger.error('更新角色权限失败:', error);
//             throw error;
//         }
//     }
}

module.exports = new AdminService(); 