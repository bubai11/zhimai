// utils/response.js

/**
 * 统一API响应格式工具类
 */
class Response {
    /**
     * 生成成功响应对象
     * @param {*} data 响应数据
     * @param {string} message 响应消息
     * @returns {Object} 响应对象
     */
    static success(data = null, message = '操作成功') {
        return {
            code: 200,
            message,
            data
        };
    }

    /**
     * 生成错误响应对象
     * @param {string} message 错误消息
     * @param {number} code 错误代码
     * @param {*} data 错误数据
     * @returns {Object} 响应对象
     */
    static error(message = '服务器内部错误', code = 500, data = null) {
        return {
            code,
            message,
            data
        };
    }

    /**
     * 生成参数错误响应对象
     * @param {string} message 错误消息
     * @returns {Object} 响应对象
     */
    static badRequest(message = '参数错误') {
        return this.error(message, 400);
    }

    /**
     * 生成未授权响应对象
     * @param {string} message 错误消息
     * @returns {Object} 响应对象
     */
    static unauthorized(message = '未授权') {
        return this.error(message, 401);
    }

    /**
     * 生成禁止访问响应对象
     * @param {string} message 错误消息
     * @returns {Object} 响应对象
     */
    static forbidden(message = '禁止访问') {
        return this.error(message, 403);
    }

    /**
     * 生成资源不存在响应对象
     * @param {string} message 错误消息
     * @returns {Object} 响应对象
     */
    static notFound(message = '资源不存在') {
        return this.error(message, 404);
    }
}

module.exports = { Response };
  