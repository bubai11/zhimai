const { BusinessError } = require('./errorHandler');

const validator = (schema) => {
    return (req, res, next) => {
        try {
            const { error } = schema.validate(req.body, {
                abortEarly: false,
                stripUnknown: true
            });

            if (error) {
                throw new BusinessError('数据验证失败', 400, {
                    errors: error.details.map(err => ({
                        field: err.path.join('.'),
                        message: err.message
                    }))
                });
            }

            next();
        } catch (err) {
            next(err);
        }
    };
};

module.exports = validator;
