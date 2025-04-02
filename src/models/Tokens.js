const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('campusinfodb', 'root', '0529', {
    host: 'localhost',
    dialect: 'mysql'
});

const Tokens = sequelize.define('Tokens', {
    token_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'User', // 假设User模型已经定义并导入
            key: 'userid'
        }
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false
    },
    expires_at: {
        type: DataTypes.DATE,
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
    // 注意：这里没有定义updatedAt字段，如果你需要它，请自行添加
}, {
    tableName: 'tokens',
    timestamps: false // 由于我们定义了created_at，所以设置为false
});

module.exports = Tokens;