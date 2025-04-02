const jwt = require('jsonwebtoken'); // 用于生成 JWT token 的库
// const crypto = require('crypto');
const Tokens=require('../models/Tokens')
const User = require('../models/User');


// 生成 JWT token 的函数
function generateToken(user) {
    const payload = {
        userId: user.userId,
        openid: user.openid,
        // 可以添加其他您想要包含在 token 中的信息
    };
    const secret = '2d7cd2a83d65a94b7cbe9bdffbeac441'; // 请使用安全的密钥
    const options = {
        expiresIn: '1h', // token 的有效期
    };
    return jwt.sign(payload, secret, options);
}


// 用户登录的函数
async function login(openid) {
    try {
        // 检查用户是否已存在，如果不存在则创建新用户
        let user = await User.findOne({ where: { openid: openid } });
        if (!user) {
            user = await User.create({ openid: openid });
        }

        // 生成新的 token
        const token = generateToken(user);
        // 存储token到Tokens表中  
        const tokenEntry = await Tokens.create({
            user_id: user.userId,
            token: token,
            expires_at: new Date(Date.now() + 3600000), // 设置过期时间  
            created_at: new Date(), // 记录创建时间  
        });

        // // 如果使用单独的 Tokens 模型
        // const Tokens = await Tokens.create({
        //   userId: user.id,
        //   token: token,
        //   expiresAt: new Date(Date.now() + 3600000), // 设置过期时间（这里与 JWT 的 expiresIn 一致，但也可以不同）
        // });
        //
        // // 如果将 token 字段直接添加到 User 模型中
        // await user.update({
        //     // 假设 token 字段名为 authToken
        //     authToken: token,
        //     // 可以添加一个字段来存储 token 的过期时间（可选）
        //     // authTokenExpiresAt: new Date(Date.now() + 3600000),
        // });

        // 返回用户信息和 token（注意：出于安全考虑，通常不会直接返回 token 到客户端，而是返回给前端一个经过处理的响应，前端再使用这个响应去获取 token）
        // 在这里，我们仅作为示例返回
        return {
            user: user.toJSON(), // 转换为 JSON 对象（不包含 Sequelize 实例的元数据）
            token: token,
        };
    } catch (error) {
        // 处理错误（例如，数据库连接错误、验证错误等）
        console.error('Error during login:', error);
        throw error; // 或者返回一个友好的错误消息给客户端
    }
}

module.exports = {
    login,
    // ... 其他用户服务函数
};



















// async function generateCustomToken(openid, session_key, expires_in = 3600) {
//     // 生成唯一的token
//     const token = uuidv4();
//     // 计算过期时间
//     const expires_at = new Date(new Date().getTime() + expires_in * 1000);
//
//     // 检查用户是否已存在，如果不存在，则应该创建新用户（这里为了简化，我们假设用户已存在）
//     // 在实际应用中，您可能需要根据openid来查找用户
//     // const user = await User.findOne({ where: { openid: openid } });
//     // if (!user) {
//     //     // 创建新用户
//     // }
//
//     // 为了简化，我们直接更新或创建用户（这里假设用户已存在，仅更新token和expires_at）
//     // 在实际中，您应该根据业务逻辑来决定是更新现有用户还是创建新用户
//     const [updatedUser, created] = await User.upsert({
//         openid: openid,
//         session_key: session_key,
//         custom_token: token,
//         expires_at: expires_at
//     }, {
//         where: { openid: openid },
//         fields: ['openid', 'session_key', 'custom_token', 'expires_at'] // 仅更新这些字段
//     });
//
//     return token;
// }
//
// module.exports = { generateCustomToken };