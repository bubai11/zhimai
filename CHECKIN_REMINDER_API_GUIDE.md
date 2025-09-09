# 活动签到提醒API使用指南

## 📋 概述

活动签到提醒功能允许用户为特定活动设置签到提醒，支持自定义签到时间和提前提醒时间。

## 🔧 功能特性

- **自定义签到时间**: 用户可以设置任意签到时间（不限于活动开始时间）
- **灵活提前时间**: 支持30分钟、60分钟、120分钟三种提前提醒选项
- **微信模板消息**: 使用专门的签到提醒模板，包含活动名称和签到时间
- **数据验证**: 完整的参数验证和错误处理

## 📱 微信模板配置

### 模板ID
```
qGMRjUI1DJpz_6iZm-6TwAcCHDIKsTbEh2M5g1FRBlQ
```

### 模板字段
```json
{
  "thing1": {
    "value": "{{activity.title}}"  // 活动名称
  },
  "time16": {
    "value": "{{checkin_time}}"    // 签到时间
  }
}
```

## 🚀 API接口

### 1. 创建活动签到提醒

**接口**: `POST /api/reminders/activity/checkin`

**请求头**:
```http
Authorization: Bearer {token}
Content-Type: application/json
```

**请求参数**:
```json
{
  "activity_id": 1,                    // 必填：活动ID
  "checkin_time": "2025-09-08T13:00:00.000Z",  // 必填：签到时间（ISO格式）
  "advance_minutes": 30                // 可选：提前分钟数（30/60/120，默认30）
}
```

**响应示例**:
```json
{
  "code": 0,
  "data": {
    "reminder_id": 11,
    "user_id": 9,
    "activity_id": 1,
    "type": "activity_checkin",
    "title": "金融科技创新讲座 - 活动签到提醒",
    "checkin_time": "2025-09-08T13:00:00.000Z",
    "remind_start_time": "2025-09-08T12:30:00.000Z",
    "remind_end_time": "2025-09-08T13:00:00.000Z",
    "sent": false,
    "created_at": "2025-09-07T16:12:38.000Z"
  },
  "message": "创建活动签到提醒成功"
}
```

### 2. 获取用户提醒列表

**接口**: `GET /api/reminders`

**请求头**:
```http
Authorization: Bearer {token}
```

**响应示例**:
```json
{
  "code": 0,
  "data": [
    {
      "reminder_id": 11,
      "user_id": 9,
      "activity_id": 1,
      "type": "activity_checkin",
      "title": "金融科技创新讲座 - 活动签到提醒",
      "checkin_time": "2025-09-08T13:00:00.000Z",
      "remind_start_time": "2025-09-08T12:30:00.000Z",
      "remind_end_time": "2025-09-08T13:00:00.000Z",
      "sent": false,
      "activity": {
        "activity_id": 1,
        "title": "金融科技创新讲座",
        "start_time": "2025-09-08T12:00:00.000Z",
        "end_time": "2025-09-08T14:00:00.000Z",
        "location": "学术报告厅"
      }
    }
  ],
  "message": "获取提醒列表成功"
}
```

### 3. 获取提醒类型配置

**接口**: `GET /api/reminders/types`

**请求头**:
```http
Authorization: Bearer {token}
```

**响应示例**:
```json
{
  "code": 0,
  "data": [
    {
      "type": "activity_checkin",
      "name": "活动签到提醒",
      "description": "提醒用户活动签到即将开始",
      "defaultTitle": "活动签到提醒",
      "defaultAdvanceMinutes": 30,
      "maxAdvanceMinutes": 120,
      "minAdvanceMinutes": 5
    }
  ],
  "message": "获取提醒类型成功"
}
```

## 📝 使用示例

### JavaScript/前端示例

```javascript
// 创建签到提醒
async function createCheckinReminder(activityId, checkinTime, advanceMinutes = 30) {
  try {
    const response = await fetch('/api/reminders/activity/checkin', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        activity_id: activityId,
        checkin_time: checkinTime,
        advance_minutes: advanceMinutes
      })
    });
    
    const result = await response.json();
    if (result.code === 0) {
      console.log('签到提醒创建成功:', result.data);
    } else {
      console.error('创建失败:', result.message);
    }
  } catch (error) {
    console.error('请求失败:', error);
  }
}

// 使用示例
const checkinTime = new Date('2025-09-08T13:00:00.000Z');
createCheckinReminder(1, checkinTime, 30); // 提前30分钟提醒
```

### cURL示例

```bash
# 创建签到提醒
curl -X POST http://localhost:3000/api/reminders/activity/checkin \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "activity_id": 1,
    "checkin_time": "2025-09-08T13:00:00.000Z",
    "advance_minutes": 30
  }'

# 获取提醒列表
curl -X GET http://localhost:3000/api/reminders \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## ⚠️ 注意事项

1. **时间格式**: 所有时间参数必须使用ISO 8601格式
2. **提前时间限制**: 只支持30分钟、60分钟、120分钟三种选项
3. **签到时间**: 必须是未来时间，且提醒时间不能已过
4. **认证要求**: 所有接口都需要有效的JWT token
5. **微信配置**: 需要配置正确的微信模板ID才能发送通知

## 🔍 错误处理

### 常见错误码

- `400`: 请求参数错误
- `401`: 未授权（token无效）
- `404`: 活动不存在
- `422`: 参数验证失败

### 错误响应示例

```json
{
  "code": 1,
  "message": "提前时间只能是30分钟、60分钟或120分钟"
}
```

## 🧪 测试

运行测试脚本：
```bash
# 功能测试
node test-checkin-reminder.js

# API测试（需要先获取token）
node test-checkin-api.js
```

## 📊 数据库字段

### reminders表新增字段
- `checkin_time`: DATETIME - 签到时间
- `type`: ENUM - 支持新的提醒类型

### 提醒类型枚举
- `activity_registration`: 活动报名提醒
- `activity_checkin`: 活动签到提醒
- `activity_start`: 活动开始提醒
- `activity_end`: 活动结束提醒
- `custom`: 自定义提醒
- `system_notification`: 系统通知
