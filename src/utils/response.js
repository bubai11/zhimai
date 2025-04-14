// utils/response.js

/**
 * 统一API响应格式
 */
class Response {
    /**
     * 成功响应
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
     * 错误响应
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
     * 参数错误响应
     * @param {string} message 错误消息
     * @returns {Object} 响应对象
     */
    static badRequest(message = '参数错误') {
        return this.error(message, 400);
    }

    /**
     * 未授权响应
     * @param {string} message 错误消息
     * @returns {Object} 响应对象
     */
    static unauthorized(message = '未授权') {
        return this.error(message, 401);
    }

    /**
     * 禁止访问响应
     * @param {string} message 错误消息
     * @returns {Object} 响应对象
     */
    static forbidden(message = '禁止访问') {
        return this.error(message, 403);
    }

    /**
     * 资源不存在响应
     * @param {string} message 错误消息
     * @returns {Object} 响应对象
     */
    static notFound(message = '资源不存在') {
        return this.error(message, 404);
    }
}

module.exports = { Response };
  