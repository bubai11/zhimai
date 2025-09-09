# 活动管理系统 API 接口文档

## 🌐 **基础信息**

**Base URL**: `http://localhost:3000/api`

**认证方式**: 
- 用户接口：Bearer Token (JWT)
- 管理员接口：Bearer Token (Admin JWT)

---

## 📝 **公开接口（无需认证）**

### 1. 获取活动列表

**接口路径**: `GET /api/activities`

**查询参数**:
| 参数 | 类型 | 必填 | 说明 | 示例 |
|------|------|------|------|------|
| `page` | number | 否 | 页码，默认1 | `1` |
| `pageSize` | number | 否 | 每页数量，默认10 | `20` |
| `type` | string | 否 | 活动类型 | `二课` / `综测` / `二课综测` |
| `status` | string | 否 | 活动状态 | `未开始` / `进行中` / `已结束` |
| `startDate` | string | 否 | 开始日期筛选 | `2024-01-01` |
| `endDate` | string | 否 | 结束日期筛选 | `2024-12-31` |
| `organizer` | string | 否 | 主办方关键词 | `学生会` |
| `keyword` | string | 否 | 关键词搜索 | `讲座` |

**请求示例**:
```bash
# 获取第一页活动
GET /api/activities?page=1&pageSize=10

# 搜索包含"讲座"的活动
GET /api/activities?keyword=讲座

# 筛选进行中的二课活动
GET /api/activities?type=二课&status=进行中

# 复合查询
GET /api/activities?type=二课&keyword=讲座&page=1&pageSize=20
```

**响应示例**:
```json
{
  "success": true,
  "message": "获取活动列表成功",
  "data": {
    "total": 50,
    "page": 1,
    "pageSize": 10,
    "data": [
      {
        "activity_id": 1,
        "title": "学术讲座：人工智能发展趋势",
        "start_time": "2024-01-15T14:00:00.000Z",
        "end_time": "2024-01-15T16:00:00.000Z",
        "location": "图书馆报告厅",
        "target_audience": "全校学生",
        "organizer": "计算机学院",
        "description": "邀请知名学者分享AI发展趋势",
        "activity_type": "二课",
        "credit_type": "学术科技",
        "participation_channel": "线下",
        "image_url": "https://example.com/image.jpg",
        "link": "https://example.com/register",
        "status": "未开始",
        "max_participants": 200,
        "statistics": {
          "favoriteCount": 25
        },
        "created_at": "2024-01-01T00:00:00.000Z",
        "updated_at": "2024-01-01T00:00:00.000Z"
      }
    ]
  }
}
```

### 2. 获取活动详情

**接口路径**: `GET /api/activities/:id`

**路径参数**:
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `id` | number | 是 | 活动ID |

**请求示例**:
```bash
GET /api/activities/1
```

**响应示例**:
```json
{
  "success": true,
  "message": "获取活动详情成功",
  "data": {
    "activity_id": 1,
    "title": "学术讲座：人工智能发展趋势",
    "start_time": "2024-01-15T14:00:00.000Z",
    "end_time": "2024-01-15T16:00:00.000Z",
    "location": "图书馆报告厅",
    "target_audience": "全校学生",
    "organizer": "计算机学院",
    "description": "邀请知名学者分享AI发展趋势",
    "activity_type": "二课",
    "credit_type": "学术科技",
    "participation_channel": "线下",
    "image_url": "https://example.com/image.jpg",
    "link": "https://example.com/register",
    "status": "未开始",
    "max_participants": 200,
    "statistics": {
      "favoriteCount": 25
    },
    "isFavorited": false,
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z"
  }
}
```

---

## 👤 **用户接口（需要用户认证）**

**认证头**: `Authorization: Bearer <user_jwt_token>`

### 3. 获取我的收藏列表

**接口路径**: `GET /api/activities/user/favorites`

**请求示例**:
```bash
GET /api/activities/user/favorites
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**响应示例**:
```json
{
  "success": true,
  "message": "获取我的收藏列表成功",
  "data": [
    {
      "activity_id": 1,
      "title": "学术讲座：人工智能发展趋势",
      "start_time": "2024-01-15T14:00:00.000Z",
      "end_time": "2024-01-15T16:00:00.000Z",
      "location": "图书馆报告厅",
      "organizer": "计算机学院",
      "status": "未开始",
      "favoriteTime": "2024-01-05T10:30:00.000Z"
    }
  ]
}
```

### 4. 收藏活动

**接口路径**: `POST /api/activities/:id/favorite`

**路径参数**:
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `id` | number | 是 | 活动ID |

**请求示例**:
```bash
POST /api/activities/1/favorite
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**响应示例**:
```json
{
  "success": true,
  "message": "收藏活动成功",
  "data": {
    "favorite_id": 1,
    "activity_id": 1,
    "user_id": 123,
    "created_at": "2024-01-05T10:30:00.000Z"
  }
}
```

### 5. 取消收藏活动

**接口路径**: `DELETE /api/activities/:id/favorite`

**路径参数**:
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `id` | number | 是 | 活动ID |

**请求示例**:
```bash
DELETE /api/activities/1/favorite
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**响应示例**:
```json
{
  "success": true,
  "message": "取消收藏成功",
  "data": null
}
```

---

## 🔐 **管理员接口（需要管理员认证）**

**认证头**: `Authorization: Bearer <admin_jwt_token>`

### 6. 创建活动

**接口路径**: `POST /api/activities/admin`

**请求体**:
```json
{
  "title": "学术讲座：人工智能发展趋势",
  "start_time": "2024-01-15T14:00:00.000Z",
  "end_time": "2024-01-15T16:00:00.000Z",
  "location": "图书馆报告厅",
  "target_audience": "全校学生",
  "organizer": "计算机学院",
  "description": "邀请知名学者分享AI发展趋势",
  "activity_type": "二课",
  "credit_type": "学术科技",
  "participation_channel": "线下",
  "image_url": "https://example.com/image.jpg",
  "link": "https://example.com/register",
  "max_participants": 200
}
```

**必填字段**:
- `title`: 活动标题（最大100字符）
- `start_time`: 开始时间
- `end_time`: 结束时间（必须晚于开始时间）

**请求示例**:
```bash
POST /api/activities/admin
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "title": "学术讲座：人工智能发展趋势",
  "start_time": "2024-01-15T14:00:00.000Z",
  "end_time": "2024-01-15T16:00:00.000Z",
  "location": "图书馆报告厅",
  "organizer": "计算机学院",
  "activity_type": "二课"
}
```

**响应示例**:
```json
{
  "success": true,
  "message": "创建活动成功",
  "data": {
    "activity_id": 1,
    "title": "学术讲座：人工智能发展趋势",
    "start_time": "2024-01-15T14:00:00.000Z",
    "end_time": "2024-01-15T16:00:00.000Z",
    "status": "未开始",
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z"
  }
}
```

### 7. 更新活动

**接口路径**: `PUT /api/activities/admin/:id`

**路径参数**:
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `id` | number | 是 | 活动ID |

**请求体**: 同创建活动，但所有字段都是可选的

**请求示例**:
```bash
PUT /api/activities/admin/1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "title": "更新后的活动标题",
  "location": "新的活动地点"
}
```

### 8. 更新活动状态

**接口路径**: `PUT /api/activities/admin/:id/status`

**路径参数**:
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `id` | number | 是 | 活动ID |

**请求体**:
```json
{
  "status": "进行中"
}
```

**状态转换规则**:
- `未开始` → `进行中`
- `进行中` → `已结束`
- `已结束` → 无法转换

**请求示例**:
```bash
PUT /api/activities/admin/1/status
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "status": "进行中"
}
```

### 9. 删除活动

**接口路径**: `DELETE /api/activities/admin/:id`

**路径参数**:
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `id` | number | 是 | 活动ID |

**请求示例**:
```bash
DELETE /api/activities/admin/1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**响应示例**:
```json
{
  "success": true,
  "message": "删除活动成功",
  "data": null
}
```

---

## ⚠️ **错误响应格式**

所有接口的错误响应都遵循统一格式：

```json
{
  "success": false,
  "message": "错误信息",
  "data": null
}
```

**常见状态码**:
- `400`: 请求参数错误
- `401`: 未认证或认证失败
- `403`: 权限不足
- `404`: 资源不存在
- `500`: 服务器内部错误

---

## 📊 **数据字典**

### 活动类型 (activity_type)
- `二课`: 第二课堂活动
- `综测`: 综合素质测评活动
- `二课综测`: 同时计入二课和综测

### 学分类型 (credit_type)
- `学术科技`
- `创新创业`
- `文体活动`
- `社会实践`
- `志愿服务`

### 参与渠道 (participation_channel)
- `线上`: 线上参与
- `线下`: 线下参与
- `线上线下`: 支持两种方式

### 活动状态 (status)
- `未开始`: 活动尚未开始
- `进行中`: 活动正在进行
- `已结束`: 活动已结束

---

## 🧪 **测试用例**

### 使用 curl 测试

```bash
# 1. 获取活动列表
curl -X GET "http://localhost:3000/api/activities?page=1&pageSize=5"

# 2. 获取活动详情
curl -X GET "http://localhost:3000/api/activities/1"

# 3. 用户登录后收藏活动
curl -X POST "http://localhost:3000/api/activities/1/favorite" \
  -H "Authorization: Bearer YOUR_USER_TOKEN"

# 4. 管理员创建活动
curl -X POST "http://localhost:3000/api/activities/admin" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "测试活动",
    "start_time": "2024-12-31T10:00:00.000Z",
    "end_time": "2024-12-31T12:00:00.000Z",
    "activity_type": "二课"
  }'
```

---

## 🔍 **需要完善的功能**

### 1. 高级搜索功能
- [ ] 按学分类型筛选
- [ ] 按参与渠道筛选
- [ ] 按地点筛选
- [ ] 多种排序方式

### 2. 统计功能
- [ ] 活动参与统计
- [ ] 用户收藏统计
- [ ] 活动热度排行

### 3. 导出功能
- [ ] 导出活动列表
- [ ] 导出参与用户列表

### 4. 批量操作
- [ ] 批量更新活动状态
- [ ] 批量删除活动

---

*最后更新: 2024年*
