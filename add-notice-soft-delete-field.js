const sequelize = require('./src/config/database');

async function addNoticeSoftDeleteField() {
    try {
        console.log('开始为notices表添加软删除字段...');
        
        // 检查字段是否已存在
        const [results] = await sequelize.query(`
            SELECT COLUMN_NAME 
            FROM INFORMATION_SCHEMA.COLUMNS 
            WHERE TABLE_SCHEMA = 'zhimai' 
            AND TABLE_NAME = 'notices' 
            AND COLUMN_NAME = 'deleted_at'
        `);
        
        if (results.length > 0) {
            console.log('✅ deleted_at 字段已存在');
            return;
        }
        
        // 添加deleted_at字段
        await sequelize.query(`
            ALTER TABLE notices 
            ADD COLUMN deleted_at DATETIME NULL DEFAULT NULL COMMENT '软删除时间'
        `);
        
        console.log('✅ deleted_at 字段添加成功');
        
        // 添加索引
        console.log('开始添加索引...');
        
        // 检查索引是否已存在
        const [indexResults] = await sequelize.query(`
            SELECT INDEX_NAME 
            FROM INFORMATION_SCHEMA.STATISTICS 
            WHERE TABLE_SCHEMA = 'zhimai' 
            AND TABLE_NAME = 'notices' 
            AND INDEX_NAME = 'idx_notices_deleted_at'
        `);
        
        if (indexResults.length === 0) {
            await sequelize.query(`
                CREATE INDEX idx_notices_deleted_at ON notices(deleted_at)
            `);
            console.log('✅ idx_notices_deleted_at 索引添加成功');
        } else {
            console.log('✅ idx_notices_deleted_at 索引已存在');
        }
        
        // 添加复合索引
        const [compositeIndexResults] = await sequelize.query(`
            SELECT INDEX_NAME 
            FROM INFORMATION_SCHEMA.STATISTICS 
            WHERE TABLE_SCHEMA = 'zhimai' 
            AND TABLE_NAME = 'notices' 
            AND INDEX_NAME = 'idx_notices_publish_time_deleted_at'
        `);
        
        if (compositeIndexResults.length === 0) {
            await sequelize.query(`
                CREATE INDEX idx_notices_publish_time_deleted_at ON notices(publish_time, deleted_at)
            `);
            console.log('✅ idx_notices_publish_time_deleted_at 复合索引添加成功');
        } else {
            console.log('✅ idx_notices_publish_time_deleted_at 复合索引已存在');
        }
        
        console.log('🎉 notices表软删除功能配置完成！');
        
    } catch (error) {
        console.error('❌ 添加软删除字段失败:', error.message);
        throw error;
    } finally {
        await sequelize.close();
    }
}

// 运行迁移
addNoticeSoftDeleteField().catch(console.error);
