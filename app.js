// //设置基本的Express服务器
// // app.js
// const express = require('express');
// const sequelize = require('./config/database');
// const cors = require('cors');
// require('dotenv').config();
// const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/auth');
// const jwt = require('jsonwebtoken');

// const app = express();

// // 设置中间件
// app.use(cors());
// app.use(express.json());// 用于解析JSON格式的请求体
// app.use(express.urlencoded({ extended: true }));

// // 路由
// // app.use('/api', routes);
// // // 静态文件服务（用于访问上传的头像）
// // app.use('/uploads', express.static('uploads')

// // 统一错误处理中间件
// app.use((err, req, res, next) => {
//     console.error('服务器错误:', err);
//     res.status(500).json({ message: '服务器内部错误' });
// });
// // 数据库连接和同步
// sequelize.authenticate()
//     .then(() => {
//         console.log('MySQL 连接成功');
//         return sequelize.sync(); // 同步所有模型
//     })
//     .then(() => {
//         console.log('数据库同步完成');
//     })
//     .catch((err) => {
//         console.error('数据库连接或同步失败:', err);
//     });

// // 公开路由
// app.use('/', indexRouter);
// app.use('/auth', usersRouter);

// // JWT 验证中间件
// app.use((req, res, next) => {
//     const token = req.headers['authorization']?.split(' ')[1];
//     if (token) {
//         jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//             if (err) return res.status(403).json({ message: '无效的 token' });
//             req.user = decoded;
//             next();
//         });
//     } else {
//         return res.status(401).json({ message: '未提供 token' });
//     }
// });

// // 首页路由
// app.get('/', (req, res) => {
//     res.send('Hello, World!!!');
// });

// app.get('/text',(req,res)=>{
//     // 执行SQL查询
//     const sql = 'SELECT * FROM text';
//     connection.query(sql, (error, results, fields) => {
//         if (error) {
//             console.error('Error executing query:', error);
//             return res.status(500).json({ error: 'Internal Server Error' });
//         }
//         // 返回查询结果
//         res.json(results);
//     });
// })

// app.post('/abe',(req,res)=>{
//     const user_name=req.body.username;
//     console.log(user_name);
//     res.send('Got a POST request: usernames'+user_name)
// })

// // 启动服务器
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`服务器运行在端口 ${PORT}`);
// });


// // //建立数据库连接
// // const connection = mysql.createConnection({
// //     host: 'localhost',
// //     user: 'root',
// //     password: '0529',
// //     database: 'CampusInfoDB'
// // });
// // connection.connect(err => {
// //     if (err) throw err;
// //     console.log('Connected to the MySQL server!!!');
// // });


// // app.post('/abe',function(reg,res){
// //     var user_name=req.body.username;
// //     console.log(user_name);
// //     res.send('Got a POST request: usernames'+user_name)
// // })
// // 处理数据库连接的关闭（可选，但推荐在服务器关闭时执行）
// // process.on('SIGTERM', () => {
// //     connection.end(() => {
// //         console.log('MySQL connection closed.');
// //         process.exit(0);
// //     });
// // });



// //     axios.get(url)
// //         .then(response => {
// //             const result = response.data;
// //             console.log(result);
// //             const { openid, session_key } = result;
// //             // 在这里处理 openid 和 session_key，例如保存到数据库或返回给客户端
// //             const insertUserSql = `# INSERT INTO user(openid, username) VALUES (?, ?) ON DUPLICATE KEY UPDATE username=VALUES(username)`;
// //             res.send({ openid, session_key });
// //         })
// //     // axios.get(url)
// //     //     .then(response => {
// //     //         const result = response.data;
// //     //         console.log(result)
// //     //         const { openid, session_key } = result;
// //     //         result.code = req.query.code;
// //     //         console.log(result);//打印向微信api换取的session_key和openid
// //     //         // 插入或更新用户表（
// //     //         // const insertUserSql = `INSERT INTO user(openid, username) VALUES (?, ?) ON DUPLICATE KEY UPDATE username=VALUES(username)`;
// //     //         // // 插入会话表
// //     //         // const insertSessionSql = `INSERT INTO session(userId, sessionKey, createTime, expireTime) VALUES (?, ?, NOW(), DATE_ADD(NOW(), INTERVAL 1 HOUR))`; // 假设过期时间为1小时后
// //     //         // const userId = 2;
// //     //         // connection.query(insertUserSql, [openid, 'defaultUsername'], (err, results, fields) => {
// //     //         //     if (err) throw err;
// //     //             // 注意：由于我们使用了ON DUPLICATE KEY UPDATE，所以这里不会返回新插入的行ID
// //     //
// //     //             // connection.query(insertSessionSql, [userId, session_key], (err, results, fields) => {
// //     //                 if (err) throw err;
// //     //                 res.json({ message: 'Session created successfully', openid, session_key });
// //     //                 return;
// //     //             });
// //     //     })
// //         .catch(error => {
// //             console.error('Error:', error);
// //             res.status(500).send('Server error');
// //             return;
// //         });
// // });
// // console.log(APPID);
// // console.log(APPSECRET);
// // 使用路由
// // app.use('/users', userRoutes);
// // 连接MongoDB数据库（这里假设MongoDB运行在本地，默认端口）
// // mongoose.connect('mongodb://localhost:27017/game', {}).then(() => console.log('MongoDB connected...')).catch(err => console.log(err));


