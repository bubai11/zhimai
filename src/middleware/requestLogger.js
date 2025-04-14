const logger = require('../utils/logger');
if (!logger) {
    console.error('Logger not found!');
    return; // 或者抛出错误
}

// List of sensitive fields that should be masked in logs
const sensitiveFields = [
    'password',
    'token',
    'authorization',
    'apiKey',
    'secret',
    'creditCard',
    'sessionId'
];

/**
 * Masks sensitive data in objects
 * @param {Object} data - Data to mask
 * @returns {Object} - Masked data
 */
const maskSensitiveData = (data) => {
    if (!data || typeof data !== 'object') return data;
    
    const masked = { ...data };
    for (const key in masked) {
        if (sensitiveFields.some(field => key.toLowerCase().includes(field.toLowerCase()))) {
            masked[key] = '********';
        } else if (typeof masked[key] === 'object') {
            masked[key] = maskSensitiveData(masked[key]);
        }
    }
    return masked;
};

/**
 * Get log level based on status code
 * @param {number} status - HTTP status code
 * @returns {string} - Log level
 */
const getLogLevel = (status) => {
    if (status >= 500) return 'error';
    if (status >= 400) return 'warn';
    return 'info';
};

/**
 * Request logger middleware
 */
const requestLogger = (req, res, next) => {
    // Start time of request
    const startTime = Date.now();
    
    // Store original response end
    const originalEnd = res.end;
    
    // Override response end method
    res.end = function (...args) {
        const responseTime = Date.now() - startTime;
        
        // Get request details
        const requestDetails = {
            method: req.method,
            url: req.originalUrl || req.url,
            ip: req.ip || req.connection.remoteAddress,
            userAgent: req.get('user-agent'),
            userId: req.user?.id || 'anonymous',
            requestBody: maskSensitiveData(req.body),
            query: maskSensitiveData(req.query),
            statusCode: res.statusCode,
            responseTime: `${responseTime}ms`,
            timestamp: new Date().toISOString()
        };

        // Determine log level based on status code
        const level = getLogLevel(res.statusCode);

        // Create log message
        const message = `${req.method} ${req.originalUrl || req.url} - ${res.statusCode} - ${responseTime}ms`;

        // Log the request
        logger[level](message, requestDetails);

        // Call original end method
        originalEnd.apply(res, args);
    };

    next();
};

module.exports = requestLogger;