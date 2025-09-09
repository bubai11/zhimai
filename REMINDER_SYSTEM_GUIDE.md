# 定时提醒系统使用指南

## 系统概述

定时提醒系统支持为活动创建开始和结束提醒，通过微信小程序和公众号发送通知给用户。

## 功能特性

- ✅ 活动开始提醒
- ✅ 活动结束提醒  
- ✅ 批量创建提醒
- ✅ 定时自动发送
- ✅ 微信通知集成
- ✅ 用户权限控制

## 环境配置

### 1. 环境变量设置

在 `.env` 文件中添加以下配置：

```env
# 微信公众号配置（用于发送提醒通知）
WECHAT_APP_ID=your_wechat_official_account_appid
WECHAT_APP_SECRET=your_wechat_official_account_secret
WECHAT_TEMPLATE_ID=your_wechat_template_id

# 微信小程序配置
WX_APPID=your_wechat_appid
WX_SECRET=your_wechat_secret
```

### 2. 数据库表结构

确保 `reminders` 表包含以下字段：

```sql
CREATE TABLE `reminders` (
  `reminder_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `activity_id` int DEFAULT NULL,
  `remind_start_time` datetime DEFAULT NULL,
  `remind_end_time` datetime DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `type` enum('start','end','custom') NOT NULL DEFAULT 'start',
  `sent` tinyint(1) NOT NULL DEFAULT '0',
  `sent_at` datetime DEFAULT NULL,
  `description` text,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`reminder_id`),
  KEY `idx_user_id` (`user_id`),
  KEY `idx_activity_id` (`activity_id`),
  KEY `idx_sent` (`sent`),
  KEY `idx_remind_time` (`remind_start_time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
```

## API 接口

### 1. 创建活动开始提醒

**POST** `/api/reminders/activity/start`

```json
{
  "activity_id": 1,
  "remind_minutes": 30
}
```

**响应:**
```json
{
  "code": 0,
  "data": {
    "reminder_id": 1,
    "user_id": 1,
    "activity_id": 1,
    "type": "start",
    "title": "活动即将开始",
    "remind_start_time": "2024-01-01T09:30:00.000Z",
    "sent": false
  },
  "message": "创建活动开始提醒成功"
}
```

### 2. 创建活动结束提醒

**POST** `/api/reminders/activity/end`

```json
{
  "activity_id": 1,
  "remind_minutes": 30
}
```

### 3. 批量创建活动提醒

**POST** `/api/reminders/activity/batch`

```json
{
  "activity_id": 1,
  "start_remind_minutes": 30,
  "end_remind_minutes": 60
}
```

### 4. 获取用户提醒列表

**GET** `/api/reminders`

**响应:**
```json
{
  "code": 0,
  "data": [
    {
      "reminder_id": 1,
      "title": "活动即将开始",
      "type": "start",
      "remind_start_time": "2024-01-01T09:30:00.000Z",
      "sent": false,
      "activity": {
        "activity_id": 1,
        "title": "测试活动",
        "start_time": "2024-01-01T10:00:00.000Z"
      }
    }
  ],
  "message": "获取提醒列表成功"
}
```

### 5. 删除提醒

**DELETE** `/api/reminders/:reminder_id`

### 6. 手动发送提醒（测试用）

**POST** `/api/reminders/:reminder_id/send`

## 定时任务

系统包含以下定时任务：

### 1. 提醒检查任务
- **频率**: 每5分钟执行一次
- **功能**: 检查并发送到期的提醒
- **配置**: `scripts/cronJobs.js`

### 2. 活动状态更新
- **频率**: 每小时执行一次
- **功能**: 更新活动状态（未开始→进行中→已结束）

### 3. Token清理
- **频率**: 每天凌晨2点执行
- **功能**: 清理过期的管理员Token

## 微信通知集成

### 1. 订阅消息（小程序）

用户在小程序中订阅消息模板，系统在提醒时间发送订阅消息。

### 2. 模板消息（公众号）

通过微信公众号发送模板消息给用户。

### 3. 通知内容

提醒通知包含以下信息：
- 活动标题
- 活动时间
- 活动地点
- 提醒类型（开始/结束）

## 使用流程

### 1. 用户端操作

1. 用户登录小程序
2. 浏览活动列表
3. 选择感兴趣的活动
4. 设置提醒时间（开始前30分钟、1小时等）
5. 确认创建提醒

### 2. 系统自动处理

1. 定时任务每5分钟检查一次
2. 找到到期的提醒
3. 获取用户微信信息
4. 发送微信通知
5. 更新提醒状态

## 测试

### 1. 运行测试脚本

```bash
node test-reminder-system.js
```

### 2. 手动测试API

```bash
# 创建提醒
curl -X POST http://localhost:3000/api/reminders/activity/start \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"activity_id": 1, "remind_minutes": 30}'

# 获取提醒列表
curl -X GET http://localhost:3000/api/reminders \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## 部署注意事项

### 1. PM2 配置

确保 `ecosystem.config.js` 包含调度器进程：

```javascript
{
  name: 'zhimai-scheduler',
  script: 'scripts/cronJobs.js',
  instances: 1,
  autorestart: true,
  watch: false,
  max_memory_restart: '1G'
}
```

### 2. 环境变量

生产环境需要设置正确的微信配置：
- `WECHAT_APP_ID`: 微信公众号AppID
- `WECHAT_APP_SECRET`: 微信公众号AppSecret
- `WECHAT_TEMPLATE_ID`: 消息模板ID

### 3. 数据库权限

确保数据库用户有足够的权限：
- SELECT, INSERT, UPDATE, DELETE 权限
- 创建索引的权限

## 故障排除

### 1. 提醒未发送

检查项目：
- 微信配置是否正确
- 用户是否有有效的openid
- 定时任务是否正常运行
- 数据库连接是否正常

### 2. 定时任务不执行

检查项目：
- PM2进程是否运行
- 系统时间是否正确
- 日志中是否有错误信息

### 3. 微信通知失败

检查项目：
- 微信公众号配置
- 用户是否已订阅消息
- 模板消息格式是否正确

## 扩展功能

### 1. 自定义提醒

支持用户创建自定义提醒，不限于活动相关。

### 2. 提醒模板

预定义常用的提醒模板，如：
- 活动开始前1小时
- 活动开始前30分钟
- 活动结束前30分钟

### 3. 批量操作

支持批量创建、删除、发送提醒。

### 4. 提醒统计

提供提醒发送统计和成功率分析。
