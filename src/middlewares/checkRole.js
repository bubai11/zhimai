const { ROLES, ROLE_PERMISSIONS, ROLE_LEVELS } = require('../constants/roles');

// 角色权限中间件
const checkRole = (roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: '未经授权的访问'
            });
        }

        const userRole = req.user.role;
        
        // 检查用户角色是否在允许的角色列表中
        if (!roles.includes(userRole)) {
            return res.status(403).json({
                success: false,
                message: '没有足够的权限'
            });
        }

        // 将用户的权限列表添加到请求对象中
        req.userPermissions = ROLE_PERMISSIONS[userRole] || [];
        req.roleLevel = ROLE_LEVELS[userRole] || 0;

        next();
    };
};

// 检查特定权限的中间件
const checkPermission = (requiredPermissions) => {
    return (req, res, next) => {
        if (!req.user || !req.userPermissions) {
            return res.status(401).json({
                success: false,
                message: '未经授权的访问'
            });
        }

        const hasAllPermissions = requiredPermissions.every(
            permission => req.userPermissions.includes(permission)
        );

        if (!hasAllPermissions) {
            return res.status(403).json({
                success: false,
                message: '没有足够的权限'
            });
        }

        next();
    };
};

module.exports = {
    checkRole,
    checkPermission,
    ROLES
}; 