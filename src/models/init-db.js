const sequelize = require('../config/database');
const User = require('./User');
const Article = require('./Article');
const Comment = require('./Comment');

// 定义模型关联
User.hasMany(Article, {
    foreignKey: 'user_id',
    as: 'articles'
});
Article.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user'
});

Article.hasMany(Comment, {
    foreignKey: 'article_id',
    as: 'comments'
});
Comment.belongsTo(Article, {
    foreignKey: 'article_id',
    as: 'article'
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
    as: 'comments'
});
Comment.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user'
});

// 同步所有模型到数据库
async function initDatabase() {
    try {
        // force: true 会删除已存在的表并重新创建
        // 在生产环境中要小心使用
        await sequelize.sync({ force: true });
        console.log('数据库同步完成');
    } catch (error) {
        console.error('数据库同步失败:', error);
    }
}

initDatabase();
