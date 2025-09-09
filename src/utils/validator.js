/**
 * 请求参数验证工具
 */

/**
 * 验证请求参数
 * @param {Object} rules 验证规则
 * @param {Object} data 要验证的数据
 * @throws {Error} 验证失败时抛出错误
 */
function validateRequest(rules, data) {
    const errors = [];

    // 检查必填字段
    for (const [field, rule] of Object.entries(rules)) {
        const value = data[field];
        
        // 检查必填字段
        if (rule.required && (value === undefined || value === null || value === '')) {
            errors.push(`${field} 是必填字段`);
            continue;
        }

        // 如果字段不存在且不是必填，跳过验证
        if (value === undefined || value === null) {
            continue;
        }

        // 类型验证
        if (rule.type) {
            switch (rule.type) {
                case 'string':
                    if (typeof value !== 'string') {
                        errors.push(`${field} 必须是字符串`);
                    } else if (rule.max && value.length > rule.max) {
                        errors.push(`${field} 长度不能超过 ${rule.max} 个字符`);
                    } else if (rule.min && value.length < rule.min) {
                        errors.push(`${field} 长度不能少于 ${rule.min} 个字符`);
                    }
                    break;
                    
                case 'number':
                    if (typeof value !== 'number' && !Number.isInteger(Number(value))) {
                        errors.push(`${field} 必须是数字`);
                    } else {
                        const numValue = Number(value);
                        if (rule.min !== undefined && numValue < rule.min) {
                            errors.push(`${field} 不能小于 ${rule.min}`);
                        }
                        if (rule.max !== undefined && numValue > rule.max) {
                            errors.push(`${field} 不能大于 ${rule.max}`);
                        }
                        if (rule.enum && !rule.enum.includes(numValue)) {
                            errors.push(`${field} 必须是以下值之一: ${rule.enum.join(', ')}`);
                        }
                    }
                    break;
                    
                case 'date':
                    if (!(value instanceof Date) && isNaN(Date.parse(value))) {
                        errors.push(`${field} 必须是有效的日期`);
                    }
                    break;
                    
                case 'boolean':
                    if (typeof value !== 'boolean') {
                        errors.push(`${field} 必须是布尔值`);
                    }
                    break;
                    
                case 'array':
                    if (!Array.isArray(value)) {
                        errors.push(`${field} 必须是数组`);
                    } else if (rule.min && value.length < rule.min) {
                        errors.push(`${field} 数组长度不能少于 ${rule.min}`);
                    } else if (rule.max && value.length > rule.max) {
                        errors.push(`${field} 数组长度不能超过 ${rule.max}`);
                    }
                    break;
            }
        }

        // 枚举验证
        if (rule.enum && !rule.enum.includes(value)) {
            errors.push(`${field} 必须是以下值之一: ${rule.enum.join(', ')}`);
        }

        // 正则表达式验证
        if (rule.pattern && !rule.pattern.test(value)) {
            errors.push(`${field} 格式不正确`);
        }
    }

    // 如果有验证错误，抛出异常
    if (errors.length > 0) {
        throw new Error(errors.join('; '));
    }
}

/**
 * 验证邮箱格式
 * @param {string} email 邮箱地址
 * @returns {boolean} 是否有效
 */
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * 验证手机号格式
 * @param {string} phone 手机号
 * @returns {boolean} 是否有效
 */
function validatePhone(phone) {
    const phoneRegex = /^1[3-9]\d{9}$/;
    return phoneRegex.test(phone);
}

/**
 * 验证密码强度
 * @param {string} password 密码
 * @returns {Object} 验证结果
 */
function validatePassword(password) {
    const result = {
        isValid: true,
        errors: []
    };

    if (password.length < 6) {
        result.isValid = false;
        result.errors.push('密码长度不能少于6位');
    }

    if (password.length > 20) {
        result.isValid = false;
        result.errors.push('密码长度不能超过20位');
    }

    if (!/[a-zA-Z]/.test(password)) {
        result.isValid = false;
        result.errors.push('密码必须包含字母');
    }

    if (!/\d/.test(password)) {
        result.isValid = false;
        result.errors.push('密码必须包含数字');
    }

    return result;
}

module.exports = {
    validateRequest,
    validateEmail,
    validatePhone,
    validatePassword
};
