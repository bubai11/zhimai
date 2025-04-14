const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const config = require('../config');

// 确保备份目录存在
const backupDir = path.join(__dirname, '../../backups');
if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
}

/**
 * 创建数据库备份
 * @returns {Promise<string>} 备份文件路径
 */
async function createBackup() {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `backup-${timestamp}.sql`;
    const filepath = path.join(backupDir, filename);

    const { host, user, password, database } = config.database;

    return new Promise((resolve, reject) => {
        const command = `mysqldump -h ${host} -u ${user} ${password ? `-p${password}` : ''} ${database} > ${filepath}`;
        
        exec(command, (error) => {
            if (error) {
                console.error('Database backup error:', error);
                reject(error);
                return;
            }
            resolve(filepath);
        });
    });
}

module.exports = {
    createBackup
}; 