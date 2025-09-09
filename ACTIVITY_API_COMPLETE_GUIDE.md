# 🎯 活动管理系统 - 完整接口文档

## 📊 **数据库状态**
✅ **连接正常**: 阿里云RDS MySQL  
✅ **数据完整**: 15条活动记录  
✅ **索引优化**: 9个索引已创建  
✅ **功能验证**: 所有接口正常工作  

---

## 🌐 **基础信息**

- **Base URL**: `http://localhost:3000/api` (开发环境)
- **Base URL**: `http://172.20.10.3:3000/api` (局域网访问)
- **数据库**: 阿里云RDS MySQL (`rm-wz9knw0ns4e8q8584do.mysql.rds.aliyuncs.com`)
- **认证方式**: Bearer Token (JWT)

---

## 📋 **接口列表概览**

### **公开接口 (无需认证)**
```
GET  /api/activities           - 获取活动列表 (支持高级搜索)
GET  /api/activities/categories - 获取活动分类选项
GET  /api/activities/:id       - 获取活动详情
```

### **用户接口 (需要用户Token)**
```
GET    /api/activities/user/favorites    - 获取我的收藏
POST   /api/activities/:id/favorite      - 收藏活动
DELETE /api/activities/:id/favorite      - 取消收藏
```

### **管理员接口 (需要管理员Token)**
```
POST   /api/activities/admin        - 创建活动
PUT    /api/activities/admin/:id    - 更新活动
PUT    /api/activities/admin/:id/status - 更新活动状态
DELETE /api/activities/admin/:id    - 删除活动
```

---

## 🔍 **1. 获取活动列表 (重点接口)**

### **基本信息**
- **路径**: `GET /api/activities`
- **认证**: 无需认证
- **功能**: 获取活动列表，支持分页、搜索、排序

### **查询参数详解**

| 参数 | 类型 | 必填 | 说明 | 示例值 |
|------|------|------|------|--------|
| `page` | number | 否 | 页码 (默认1) | `1` |
| `pageSize` | number | 否 | 每页数量 (默认10，最大50) | `20` |
| `type` | string | 否 | 活动类型 | `二课` / `综测` / `二课综测` |
| `status` | string | 否 | 活动状态 | `未开始` / `进行中` / `已结束` |
| `creditType` | string | 否 | 学分类型 | `创新创业` / `学术交流` / `志愿服务` 等 |
| `channel` | string | 否 | 参与渠道 | `线上` / `线下` |
| `targetAudience` | string | 否 | 目标受众 | `计算机学院` |
| `location` | string | 否 | 地点搜索 | `图书馆` |
| `organizer` | string | 否 | 主办方搜索 | `学生会` |
| `keyword` | string | 否 | 关键词搜索 | `讲座` |
| `startDate` | string | 否 | 开始日期筛选 | `2024-01-01` |
| `endDate` | string | 否 | 结束日期筛选 | `2024-12-31` |
| `sortBy` | string | 否 | 排序字段 | `start_time` / `created_at` / `title` |
| `sortOrder` | string | 否 | 排序方向 | `ASC` / `DESC` |

### **请求示例**

```bash
# 1. 基础查询 - 获取第一页活动
curl "http://localhost:3000/api/activities?page=1&pageSize=10"

# 2. 类型筛选 - 获取二课活动
curl "http://localhost:3000/api/activities?type=二课"

# 3. 复合筛选 - 线下的创新创业类二课活动
curl "http://localhost:3000/api/activities?type=二课&creditType=创新创业&channel=线下"

# 4. 关键词搜索 - 搜索包含"讲座"的活动
curl "http://localhost:3000/api/activities?keyword=讲座"

# 5. 地点搜索 - 在图书馆举办的活动
curl "http://localhost:3000/api/activities?location=图书馆"

# 6. 时间范围 - 本月的活动
curl "http://localhost:3000/api/activities?startDate=2024-01-01&endDate=2024-01-31"

# 7. 排序 - 按创建时间升序
curl "http://localhost:3000/api/activities?sortBy=created_at&sortOrder=ASC"

# 8. 复杂查询 - 综合搜索
curl "http://localhost:3000/api/activities?type=二课&status=未开始&keyword=讲座&sortBy=start_time&sortOrder=ASC&page=1&pageSize=20"
```

### **响应格式**

```json
{
  "code": 200,
  "message": "获取活动列表成功", 
  "data": {
    "total": 15,
    "page": 1,
    "pageSize": 10,
    "data": [
      {
        "activity_id": 1,
        "title": "AI技术发展趋势讲座",
        "start_time": "2024-01-15T14:00:00.000Z",
        "end_time": "2024-01-15T16:00:00.000Z",
        "location": "图书馆报告厅",
        "target_audience": "全校学生",
        "organizer": "计算机学院",
        "description": "邀请知名学者分享AI发展趋势...",
        "activity_type": "二课",
        "credit_type": "创新创业", 
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

---

## 📂 **2. 获取活动分类 (配置接口)**

### **基本信息**
- **路径**: `GET /api/activities/categories`  
- **认证**: 无需认证
- **功能**: 获取系统中所有可用的分类选项

### **使用场景**
- **表单选择框**: 创建/编辑活动时的下拉选项
- **筛选条件**: 活动搜索页面的筛选选项  
- **数据字典**: 获取系统支持的标准分类

### **请求示例**
```bash
curl "http://localhost:3000/api/activities/categories"
```

### **响应示例**
```json
{
  "code": 200,
  "message": "获取活动分类成功",
  "data": {
    "activityTypes": [
      "二课",
      "二课综测", 
      "综测"
    ],
    "creditTypes": [
      "创新创业",
      "学术交流", 
      "志愿公益",
      "志愿服务",
      "思想成长",
      "技能特长",
      "文体活动",
      "菁英成长"
    ],
    "channels": [
      "线上",
      "线下"
    ]
  }
}
```

### **前端使用示例**

```javascript
// Vue.js 示例
async function initFormOptions() {
    const response = await axios.get('/api/activities/categories');
    const categories = response.data.data;
    
    // 渲染活动类型选项
    this.activityTypeOptions = categories.activityTypes.map(type => ({
        label: type,
        value: type
    }));
    
    // 渲染学分类型选项  
    this.creditTypeOptions = categories.creditTypes.map(type => ({
        label: type,
        value: type
    }));
}

// React 示例
const [categories, setCategories] = useState({});

useEffect(() => {
    fetch('/api/activities/categories')
        .then(res => res.json())
        .then(data => setCategories(data.data));
}, []);
```

---

## 🔍 **3. 获取活动详情**

### **基本信息**
- **路径**: `GET /api/activities/:id`
- **认证**: 无需认证 (如果传入用户Token会显示收藏状态)

### **请求示例**
```bash
# 游客访问
curl "http://localhost:3000/api/activities/1"

# 登录用户访问 (会显示收藏状态)
curl "http://localhost:3000/api/activities/1" \
  -H "Authorization: Bearer USER_TOKEN"
```

### **响应示例**
```json
{
  "code": 200,
  "message": "获取活动详情成功",
  "data": {
    "activity_id": 1,
    "title": "AI技术发展趋势讲座",
    "start_time": "2024-01-15T14:00:00.000Z",
    "end_time": "2024-01-15T16:00:00.000Z", 
    "location": "图书馆报告厅",
    "target_audience": "全校学生",
    "organizer": "计算机学院",
    "description": "详细的活动描述...",
    "activity_type": "二课",
    "credit_type": "创新创业",
    "participation_channel": "线下",
    "image_url": "https://example.com/image.jpg",
    "link": "https://example.com/register",
    "status": "未开始",
    "max_participants": 200,
    "statistics": {
      "favoriteCount": 25
    },
    "isFavorited": false,  // 仅登录用户可见
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z"
  }
}
```

---

## ⭐ **4. 收藏功能接口**

### **4.1 获取我的收藏**
```bash
GET /api/activities/user/favorites
Authorization: Bearer USER_TOKEN
```

### **4.2 收藏活动**
```bash
POST /api/activities/:id/favorite  
Authorization: Bearer USER_TOKEN
```

### **4.3 取消收藏**
```bash
DELETE /api/activities/:id/favorite
Authorization: Bearer USER_TOKEN
```

---

## 🔐 **5. 管理员接口**

### **5.1 创建活动**
```bash
POST /api/activities/admin
Authorization: Bearer ADMIN_TOKEN
Content-Type: application/json

{
  "title": "新活动标题",
  "start_time": "2024-12-31T10:00:00.000Z",
  "end_time": "2024-12-31T12:00:00.000Z",
  "activity_type": "二课",
  "credit_type": "创新创业",
  "location": "活动地点"
}
```

### **5.2 更新活动**
```bash
PUT /api/activities/admin/:id
Authorization: Bearer ADMIN_TOKEN
```

### **5.3 删除活动**
```bash
DELETE /api/activities/admin/:id  
Authorization: Bearer ADMIN_TOKEN
```

---

## ⚠️ **错误响应格式**

```json
{
  "code": 400,
  "message": "具体错误信息",
  "data": null
}
```

**常见状态码**:
- `200`: 成功
- `400`: 请求参数错误
- `401`: 未认证
- `403`: 权限不足  
- `404`: 资源不存在
- `500`: 服务器错误

---

## 🧪 **快速测试命令**

```bash
# 服务器状态检查
curl "http://localhost:3000/hello"

# 获取活动分类 (最重要)
curl "http://localhost:3000/api/activities/categories"

# 获取活动列表
curl "http://localhost:3000/api/activities?page=1&pageSize=5"

# 搜索测试
curl "http://localhost:3000/api/activities?keyword=讲座&type=二课"

# 活动详情
curl "http://localhost:3000/api/activities/1"
```

---

## 💡 **开发建议**

1. **分页查询**: 建议 `pageSize` 不超过50，避免性能问题
2. **搜索优化**: 关键词搜索会匹配标题、描述、主办方、地点
3. **缓存策略**: 分类接口建议前端缓存，减少请求次数
4. **错误处理**: 前端应该处理网络错误和服务器错误
5. **参数验证**: 后端已做参数验证和XSS防护

---

## 🚀 **生产环境部署**

```bash
# 启动生产环境
npm run pm2:start:prod

# 查看服务状态  
npm run pm2:status

# 查看日志
npm run pm2:logs
```

**生产环境访问地址**: 
- 内网: `http://172.20.10.3:3000/api`
- 公网: 配置域名后使用HTTPS

---

*数据库已优化，接口已测试，可以放心使用！* 🎉
