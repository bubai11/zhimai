const axios = require('axios');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { Op } = require('sequelize');
const { ROLES, ROLE_LEVELS, ROLE_PERMISSIONS } = require('../constants/roles');

class UserController {
    // 微信登录
    async wxLogin(req, res) {
        try {
            const { code, userInfo } = req.body;
            if (!code) {
                return res.status(400).json({
                    success: false,
                    message: '缺少code参数'
                });
            }
            
            // 微信登录凭证校验

            const wxResponse = await axios.get('https://api.weixin.qq.com/sns/jscode2session', {
                params: {
                    appid: process.env.WX_APPID,
                    secret: process.env.WX_SECRET,
                    js_code: code,
                    grant_type: 'authorization_code'
                }
            });
            const { openid, session_key, unionid } = wxResponse.data;
            
            if (!openid) {
                return res.status(401).json({
                    success: false,
                    message: '微信登录失败'
                });
            }

            // 查找或创建用户
            let [user, created] = await User.findOrCreate({
                where: { openId: openid },
                defaults: {
                    unionId: unionid,
                    role: 'user',
                    status: 'pending',
                    lastLoginAt: new Date(),
                    ...userInfo // 如果前端传递了用户信息，则保存
                }
            });
            console.log("用户创建：user, created: "+user, created);
            console.log(/\n/);

            if (!created) {
                await user.update({ 
                    lastLoginAt: new Date(),
                    unionId: unionid || user.unionId,
                    ...userInfo // 更新用户信息
                });
            }

            // 生成JWT token
            const token = jwt.sign(
                { 
                    userId: user.id,
                    openId: user.openId,
                    role: user.role 
                },
                process.env.JWT_SECRET,
                { expiresIn: '7d' }
            );

            res.json({
                success: true,
                token,
                openId: user.openId,
                userInfo: {
                    id: user.id,
                    nickname: user.nickname,
                    avatarUrl: user.avatarUrl,
                    role: user.role,
                    status: user.status,
                    campus: user.campus,
                    grade: user.grade,
                    major: user.major
                }
            });
        } catch (error) {
            console.error('微信登录失败:', error);
            console.error('错误响应:', error.response?.data);

            res.status(500).json({
                success: false,
                message: '登录失败',
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    }

    // 更新用户信息
    async updateUserInfo(req, res) {
        try {
            const { openId } = req.params;
            const updateData = req.body;
            
            // 移除不允许直接更新的字段
            delete updateData.role;
            delete updateData.status;
            delete updateData.openId;
            delete updateData.unionId;

            const user = await User.findOne({ where: { openId } });
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: '用户不存在'
                });
            }

            // 检查权限
            if (req.user.openId !== openId && req.user.role !== 'admin') {
                return res.status(403).json({
                    success: false,
                    message: '没有权限修改其他用户信息'
                });
            }

            // 验证邮箱唯一性
            if (updateData.email && updateData.email !== user.email) {
                const existingEmail = await User.findOne({ 
                    where: { 
                        email: updateData.email,
                        id: { [Op.ne]: user.id }
                    }
                });
                if (existingEmail) {
                    return res.status(400).json({
                        success: false,
                        message: '邮箱已被使用'
                    });
                }
            }

            // 验证手机号唯一性
            if (updateData.phone && updateData.phone !== user.phone) {
                const existingPhone = await User.findOne({ 
                    where: { 
                        phone: updateData.phone,
                        id: { [Op.ne]: user.id }
                    }
                });
                if (existingPhone) {
                    return res.status(400).json({
                        success: false,
                        message: '手机号已被使用'
                    });
                }
            }

            await user.update(updateData);

            res.json({
                success: true,
                message: '用户信息更新成功',
                userInfo: {
                    id: user.id,
                    nickname: user.nickname,
                    avatarUrl: user.avatarUrl,
                    email: user.email,
                    phone: user.phone,
                    campus: user.campus,
                    grade: user.grade,
                    major: user.major,
                    role: user.role,
                    status: user.status
                }
            });
        } catch (error) {
            console.error('更新用户信息失败:', error);
            res.status(500).json({
                success: false,
                message: '更新用户信息失败'
            });
        }
    }

    // 获取用户信息
    async getUserInfo(req, res) {
        try {
            const { openId } = req.params;
            const user = await User.findOne({ 
                where: { openId },
                attributes: { exclude: ['unionId'] } // 排除敏感信息
            });

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: '用户不存在'
                });
            }

            res.json({
                success: true,
                userInfo: {
                    id: user.id,
                    nickname: user.nickname,
                    avatarUrl: user.avatarUrl,
                    email: user.email,
                    phone: user.phone,
                    campus: user.campus,
                    grade: user.grade,
                    major: user.major,
                    role: user.role,
                    status: user.status,
                    lastLoginAt: user.lastLoginAt
                }
            });
        } catch (error) {
            console.error('获取用户信息失败:', error);
            res.status(500).json({
                success: false,
                message: '获取用户信息失败'
            });
        }
    }

    // 更新用户角色（仅管理员可用）
    async updateUserRole(req, res) {
        try {
            const { openId } = req.params;
            const { role } = req.body;

            // 验证角色值
            if (!Object.values(ROLES).includes(role)) {
                return res.status(400).json({
                    success: false,
                    message: '无效的角色值'
                });
            }

            // 检查操作者的角色等级是否高于目标角色
            if (ROLE_LEVELS[req.user.role] <= ROLE_LEVELS[role]) {
                return res.status(403).json({
                    success: false,
                    message: '无法设置同级或更高级别的角色'
                });
            }

            const user = await User.findOne({ where: { openId } });
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: '用户不存在'
                });
            }

            // 检查操作者的角色等级是否高于被修改用户的当前角色
            if (ROLE_LEVELS[req.user.role] <= ROLE_LEVELS[user.role]) {
                return res.status(403).json({
                    success: false,
                    message: '无法修改同级或更高级别用户的角色'
                });
            }

            await user.update({ role });

            res.json({
                success: true,
                message: '用户角色更新成功',
                userInfo: {
                    openId: user.openId,
                    role: user.role,
                    permissions: ROLE_PERMISSIONS[role]
                }
            });
        } catch (error) {
            console.error('更新用户角色失败:', error);
            res.status(500).json({
                success: false,
                message: '更新用户角色失败'
            });
        }
    }

    // 获取所有可用角色（仅管理员可用）
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
                success: true,
                data: {
                    roles: availableRoles
                }
            });
        } catch (error) {
            console.error('获取角色列表失败:', error);
            res.status(500).json({
                success: false,
                message: '获取角色列表失败'
            });
        }
    }

    // 更新用户状态（仅管理员可用）
    async updateUserStatus(req, res) {
        try {
            const { openId } = req.params;
            const { status } = req.body;

            if (!['active', 'inactive', 'pending'].includes(status)) {
                return res.status(400).json({
                    success: false,
                    message: '无效的状态值'
                });
            }

            const user = await User.findOne({ where: { openId } });
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: '用户不存在'
                });
            }

            await user.update({ status });

            res.json({
                success: true,
                message: '用户状态更新成功',
                userInfo: {
                    openId: user.openId,
                    status: user.status
                }
            });
        } catch (error) {
            console.error('更新用户状态失败:', error);
            res.status(500).json({
                success: false,
                message: '更新用户状态失败'
            });
        }
    }

    // 获取用户列表（仅管理员可用）
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
            
            const where = {};
            if (role) where.role = role;
            if (status) where.status = status;
            if (campus) where.campus = campus;
            if (grade) where.grade = grade;
            if (search) {
                where[Op.or] = [
                    { nickname: { [Op.like]: `%${search}%` } },
                    { email: { [Op.like]: `%${search}%` } },
                    { phone: { [Op.like]: `%${search}%` } }
                ];
            }

            const users = await User.findAndCountAll({
                where,
                limit: parseInt(limit),
                offset: (parseInt(page) - 1) * parseInt(limit),
                attributes: { exclude: ['unionId'] },
                order: [['created_at', 'DESC']]
            });

            res.json({
                success: true,
                data: {
                    total: users.count,
                    pages: Math.ceil(users.count / limit),
                    currentPage: parseInt(page),
                    users: users.rows
                }
            });
        } catch (error) {
            console.error('获取用户列表失败:', error);
            res.status(500).json({
                success: false,
                message: '获取用户列表失败'
            });
        }
    }
}

module.exports = new UserController();
