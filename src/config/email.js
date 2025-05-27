module.exports = {
    host: process.env.EMAIL_HOST || 'smtp.qq.com',
    port: process.env.EMAIL_PORT || 465,
    secure: true,
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
    from: process.env.EMAIL_FROM || '"活动管理系统" <your-email@qq.com>',
    adminEmail: process.env.ADMIN_EMAIL || 'admin@example.com'
}; 