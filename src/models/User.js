//定义用户模型
const { DataTypes, Op } = require('sequelize');
const sequelize = require('../config/database'); // 需要创建这个配置文件

// 检查连接
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: '用户唯一标识'
    },
    openId: {
        type: DataTypes.STRING(64),
        unique: true,
        allowNull: false,
        comment: '微信openId'
    },
    unionId: {
        type: DataTypes.STRING(64),
        unique: true,
        comment: '微信unionId'
    },
    nickname: {
        type: DataTypes.STRING(50),
        allowNull: true,
        comment: '用户昵称'
    },
    avatarUrl: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: '用户头像URL'
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: true,
        validate: {
            isEmail: true
        },
        comment: '用户邮箱'
    },
    phone: {
        type: DataTypes.STRING(20),
        allowNull: true,
        validate: {
            is: /^1[3-9]\d{9}$/
        },
        comment: '用户手机号'
    },
    campus: {
        type: DataTypes.STRING(50),
        allowNull: true,
        comment: '所在校区'
    },
    grade: {
        type: DataTypes.STRING(20),
        allowNull: true,
        comment: '年级'
    },
    major: {
        type: DataTypes.STRING(50),
        allowNull: true,
        comment: '专业'
    },
    role: {
        type: DataTypes.ENUM('user', 'student', 'teacher', 'moderator', 'admin'),
        defaultValue: 'user',
        allowNull: false,
        comment: '用户角色'
    },
    status: {
        type: DataTypes.ENUM('active', 'inactive', 'pending'),
        defaultValue: 'pending',
        allowNull: false,
        comment: '用户状态'
    },
    lastLoginAt: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: '最后登录时间'
    }
}, {
    tableName: 'users',
    underscored: false,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
        {
            unique: true,
            fields: ['openId']
        },
        {
            unique: true,
            fields: ['email'],
            where: {
                email: {
                    [Op.ne]: null
                }
            }
        },
        {
            unique: true,
            fields: ['phone'],
            where: {
                phone: {
                    [Op.ne]: null
                }
            }
        }
    ]
});

module.exports = User;
