// 角色常量定义
const ROLES = {
    USER: 'user',           // 普通用户
    ADMIN: 'admin',         // 超级管理员
    MODERATOR: 'moderator', // 内容管理员
    STUDENT: 'student',     // 学生用户
    TEACHER: 'teacher'      // 教师用户
};

// 角色权限映射
const ROLE_PERMISSIONS = {
    [ROLES.USER]: ['read_basic'],
    [ROLES.STUDENT]: ['read_basic', 'join_activity', 'collect_news'],
    [ROLES.TEACHER]: ['read_basic', 'create_activity', 'manage_own_activity'],
    [ROLES.MODERATOR]: ['read_basic', 'manage_content', 'manage_comments'],
    [ROLES.ADMIN]: ['read_basic', 'manage_users', 'manage_roles', 'manage_all']
};

// 角色等级
const ROLE_LEVELS = {
    [ROLES.USER]: 1,
    [ROLES.STUDENT]: 2,
    [ROLES.TEACHER]: 3,
    [ROLES.MODERATOR]: 4,
    [ROLES.ADMIN]: 5
};

module.exports = {
    ROLES,
    ROLE_PERMISSIONS,
    ROLE_LEVELS
}; 