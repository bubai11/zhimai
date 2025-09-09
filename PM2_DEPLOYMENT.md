# PM2 部署指南

## 🚀 项目启动方式

### 开发环境

```bash
# 启动API服务（开发模式）
npm run dev

# 启动定时任务调度器（开发模式）
npm run scheduler:dev

# 或者分别在两个终端窗口运行：
# 终端1: npm run dev
# 终端2: npm run scheduler:dev
```

### 生产环境

#### 方式1：使用PM2（推荐）

```bash
# 启动所有服务
npm run pm2:start:prod

# 查看状态
npm run pm2:status

# 查看日志
npm run pm2:logs

# 监控面板
npm run pm2:monit

# 重启所有服务
npm run pm2:restart

# 停止所有服务
npm run pm2:stop

# 删除所有服务
npm run pm2:delete
```

#### 方式2：手动启动

```bash
# 启动API服务
npm start

# 启动定时任务调度器（新终端）
npm run scheduler
```

## 📊 PM2应用说明

### 应用列表
- **zhimai-api**: 主API服务
- **zhimai-scheduler**: 定时任务调度器

### 定时任务说明
| 任务 | 频率 | 说明 |
|------|------|------|
| 活动状态更新 | 每小时 | 自动更新活动状态（未开始→进行中→已结束） |
| 提醒检查 | 每5分钟 | 检查并发送活动提醒消息 |
| Token清理 | 每天2点 | 清理过期的管理员Token |
| 数据库备份 | 每天3点 | 数据库备份（需要配置） |

## 📁 日志文件

PM2会自动生成以下日志文件：
```
logs/
├── api-error.log      # API错误日志
├── api-out.log        # API输出日志
├── api-combined.log   # API综合日志
├── scheduler-error.log    # 调度器错误日志
├── scheduler-out.log      # 调度器输出日志
└── scheduler-combined.log # 调度器综合日志
```

## 🔧 常用命令

```bash
# 查看特定应用状态
pm2 show zhimai-api
pm2 show zhimai-scheduler

# 重启特定应用
pm2 restart zhimai-api
pm2 restart zhimai-scheduler

# 查看特定应用日志
pm2 logs zhimai-api
pm2 logs zhimai-scheduler

# 实时监控
pm2 monit

# 保存当前PM2配置
pm2 save

# 设置PM2开机自启
pm2 startup
```

## ⚠️ 注意事项

1. **端口冲突**: 确保3000端口未被占用
2. **环境变量**: 确保.env文件配置正确
3. **数据库连接**: 确保MySQL和Redis服务正常运行
4. **日志轮转**: 建议配置日志轮转，避免日志文件过大
5. **内存监控**: 已配置1GB内存限制，超出会自动重启

## 🛠️ 故障排除

### API服务无法启动
```bash
# 检查端口占用
netstat -an | findstr :3000

# 检查数据库连接
npm run test

# 查看详细错误日志
npm run pm2:logs
```

### 定时任务不执行
```bash
# 检查调度器状态
pm2 show zhimai-scheduler

# 查看调度器日志
pm2 logs zhimai-scheduler

# 手动执行单个任务测试
npm run update-status
npm run check-reminders
```

## 📈 性能优化建议

1. **启用集群模式**（高并发场景）：
   ```javascript
   // ecosystem.config.js
   instances: 'max', // 或具体数字
   exec_mode: 'cluster'
   ```

2. **配置负载均衡**（多服务器部署）
3. **优化数据库查询**
4. **配置Redis缓存**
5. **启用gzip压缩**

---

*最后更新: $(date)*
