const errorHandler = (err, req, res, next) => {
    console.error('errorHandler.js这里出现错误了！+Error:', err);

    // 处理 Sequelize 错误
    if (err.name === 'SequelizeValidationError') {
        return res.status(400).json({
            success: false,
            message: '数据验证错误',
            errors: err.errors.map(e => ({
                field: e.path,
                message: e.message
            }))
        });
    }

    if (err.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({
            success: false,
            message: '数据已存在',
            errors: err.errors.map(e => ({
                field: e.path,
                message: '该值已被使用'
            }))
        });
    }

    // 处理自定义业务错误
    if (err.isBusinessError) {
        return res.status(err.status || 400).json({
            success: false,
            message: err.message,
            code: err.code
        });
    }

    // 处理未知错误
    res.status(500).json({
        success: false,
        message: process.env.NODE_ENV === 'production' 
            ? '服务器内部错误' 
            : err.message
    });

};

class BusinessError extends Error {
    constructor(message, status = 400, code = null) {
        super(message);
        this.name = 'BusinessError';
        this.status = status;
        this.code = code;
        this.isBusinessError = true;
    }
}

module.exports = {
    errorHandler,
    BusinessError
};
