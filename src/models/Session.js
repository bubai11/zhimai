const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('campusinfodb', 'root', '0529', {
    host: 'localhost',
    dialect: 'mysql'
});

const Session = sequelize.define('Session', {
    sessionid: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    userid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'User', // 假设User模型已经定义并导入
            key: 'userid'
        }
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    terminatedAt: { // 假设终止时间字段名为terminatedAt
        type: DataTypes.DATE,
        allowNull: true // 根据实际情况，可能不允许为空
    }
}, {
    tableName: 'session',
    timestamps: false // 同样，由于手动定义了时间戳字段
});

module.exports = Session;