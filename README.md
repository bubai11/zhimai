# 智汇广金项目后端服务

这是智汇广金项目的后端服务，基于 Node.js 和 Express 框架开发。

## 功能特性

- 用户管理
- 活动管理（二课/综测）
- 信息资讯
- 日志记录
- 数据库集成

## 技术栈

- Node.js
- Express
- MySQL (Sequelize ORM)
- RESTful API
- JWT 认证

## 开始使用

### 环境要求

- Node.js >= 14
- MySQL >= 5.7
- npm 或 yarn

### 安装

1. 克隆仓库
```bash
git clone https://github.com/your-username/zhimai-backend.git
cd zhimai-backend
```

2. 安装依赖
```bash
npm install
# 或
# yarn install
```

3. 配置环境变量
```bash
cp .env.example .env
# 编辑 .env 文件，填写必要的配置信息
```

4. 数据库迁移
```bash
npm run db:migrate
# 或
yarn db:migrate
```

5. 启动服务
```bash
# 开发环境
npm run dev
# 或
yarn dev

# 生产环境
npm start
# 或
yarn start
```

## API 文档

主要 API 端点：

- `GET /api/activities` - 获取活动列表
- `GET /api/activities/:id` - 获取活动详情
- `POST /api/activities` - 创建新活动
- `PUT /api/activities/:id` - 更新活动信息
- `DELETE /api/activities/:id` - 删除活动

更多 API 详情请参考 [API 文档](docs/api.md)

## 项目结构

```
service/
├── config/         # 配置文件
├── controllers/    # 控制器
├── models/        # 数据模型
├── routes/        # 路由定义
├── middlewares/   # 中间件
├── utils/         # 工具函数
└── app.js         # 应用入口
```

## 开发规范

- 使用 ESLint 进行代码规范检查
- 遵循 RESTful API 设计规范
- 使用 Conventional Commits 规范提交代码

## 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情 