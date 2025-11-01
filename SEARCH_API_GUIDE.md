# 🔍 统一搜索API使用指南

## 概述

统一搜索模块支持对**活动**和**通知信息**的综合搜索，为小程序提供强大的搜索功能，涵盖二课综测和通知信息咨询的搜索需求。

## 🚀 接口列表

### 1. 统一搜索接口（推荐）

**路径**: `GET /api/search`

**功能**: 支持活动和通知的综合搜索，可指定搜索类型

**参数**:
| 参数 | 类型 | 必填 | 说明 | 示例 |
|------|------|------|------|------|
| `keyword` | string | 是 | 搜索关键词 | `讲座` |
| `type` | string | 否 | 搜索类型：`all`(全部)、`activity`(活动)、`notice`(通知) | `all` |
| `page` | number | 否 | 页码，默认1 | `1` |
| `pageSize` | number | 否 | 每页数量，默认10 | `10` |
| `sortBy` | string | 否 | 排序字段：`relevance`(相关性)、`time`(时间) | `relevance` |
| `sortOrder` | string | 否 | 排序方向：`ASC`、`DESC` | `DESC` |

**响应示例**:
```json
{
  "code": 0,
  "message": "搜索成功",
  "data": {
    "activities": {
      "count": 5,
      "rows": [
        {
          "activity_id": 1,
          "title": "创新创业讲座",
          "start_time": "2024-03-15T14:00:00.000Z",
          "end_time": "2024-03-15T16:00:00.000Z",
          "location": "学术报告厅",
          "organizer": "创新创业学院",
          "activity_type": "讲座",
          "credit_type": "创新创业",
          "status": "未开始"
        }
      ]
    },
    "notices": {
      "count": 3,
      "rows": [
        {
          "notice_id": 1,
          "title": "关于举办创新创业讲座的通知",
          "publish_time": "2024-03-10T09:00:00.000Z",
          "content": "为提升学生创新创业能力...",
          "publisher": "创新创业学院",
          "campus": "主校区",
          "notice_type": "学术活动"
        }
      ]
    },
    "total": 8,
    "page": 1,
    "pageSize": 10,
    "keyword": "讲座"
  }
}
```

### 2. 搜索建议接口

**路径**: `GET /api/search/suggestions`

**功能**: 获取热门搜索关键词建议

**参数**:
| 参数 | 类型 | 必填 | 说明 | 示例 |
|------|------|------|------|------|
| `limit` | number | 否 | 返回数量，默认10 | `10` |

**响应示例**:
```json
{
  "code": 0,
  "message": "获取搜索建议成功",
  "data": [
    "讲座",
    "二课活动",
    "创新创业",
    "志愿服务",
    "学术竞赛",
    "文艺演出",
    "体育比赛",
    "社会实践",
    "社团活动",
    "就业指导"
  ]
}
```

### 3. 搜索统计接口

**路径**: `GET /api/search/stats`

**功能**: 获取指定关键词的搜索结果统计

**参数**:
| 参数 | 类型 | 必填 | 说明 | 示例 |
|------|------|------|------|------|
| `keyword` | string | 是 | 搜索关键词 | `讲座` |

**响应示例**:
```json
{
  "code": 0,
  "message": "获取搜索统计成功",
  "data": {
    "keyword": "讲座",
    "activityCount": 5,
    "noticeCount": 3,
    "totalCount": 8
  }
}
```

### 4. 单独搜索活动接口

**路径**: `GET /api/search/activities`

**功能**: 仅搜索活动（保持向后兼容）

**参数**: 与统一搜索接口相同，但只返回活动结果

### 5. 单独搜索通知接口

**路径**: `GET /api/search/notices`

**功能**: 仅搜索通知信息

**参数**: 与统一搜索接口相同，但只返回通知结果

## 🎯 搜索功能详解

### 活动搜索字段
- **标题** (`title`)
- **描述** (`description`)
- **主办方** (`organizer`)
- **地点** (`location`)
- **活动类型** (`activity_type`)
- **学分类型** (`credit_type`)
- **目标受众** (`target_audience`)

### 通知搜索字段
- **标题** (`title`)
- **内容** (`content`)
- **发布者** (`publisher`)
- **校区** (`campus`)
- **学院** (`college`)
- **通知类型** (`notice_type`)

### 排序规则

#### 相关性排序 (`sortBy=relevance`)
- **活动**: 标题匹配 > 描述匹配 > 其他字段匹配
- **通知**: 标题匹配 > 内容匹配 > 其他字段匹配

#### 时间排序 (`sortBy=time`)
- **活动**: 按开始时间排序
- **通知**: 按发布时间排序

## 📱 小程序集成示例

### 1. 综合搜索
```javascript
// 搜索所有相关内容
const searchAll = async (keyword) => {
  const response = await wx.request({
    url: 'https://your-api.com/api/search',
    data: {
      keyword: keyword,
      type: 'all',
      page: 1,
      pageSize: 20,
      sortBy: 'relevance'
    }
  });
  
  return response.data;
};
```

### 2. 分类搜索
```javascript
// 仅搜索活动
const searchActivities = async (keyword) => {
  const response = await wx.request({
    url: 'https://your-api.com/api/search',
    data: {
      keyword: keyword,
      type: 'activity',
      sortBy: 'time',
      sortOrder: 'DESC'
    }
  });
  
  return response.data.activities;
};

// 仅搜索通知
const searchNotices = async (keyword) => {
  const response = await wx.request({
    url: 'https://your-api.com/api/search',
    data: {
      keyword: keyword,
      type: 'notice',
      sortBy: 'relevance'
    }
  });
  
  return response.data.notices;
};
```

### 3. 获取搜索建议
```javascript
// 获取热门搜索词
const getSuggestions = async () => {
  const response = await wx.request({
    url: 'https://your-api.com/api/search/suggestions',
    data: {
      limit: 8
    }
  });
  
  return response.data;
};
```

## 🔧 配置说明

### 环境变量
```env
# 数据库配置（已在现有配置中）
DB_HOST=your-db-host
DB_PORT=3306
DB_NAME=zhimai
DB_USER=your-username
DB_PASSWORD=your-password
```

### 数据库表结构

#### notices表
```sql
CREATE TABLE `notices` (
  `notice_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `publish_time` datetime DEFAULT NULL,
  `content` text,
  `publisher` varchar(100) DEFAULT NULL,
  `campus` varchar(50) DEFAULT NULL,
  `grade_level` varchar(50) DEFAULT NULL,
  `college` varchar(100) DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL,
  `notice_type` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`notice_id`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb3;
```

## 🚀 部署步骤

1. **更新模型**: Notice模型已添加到 `src/models/index.js`
2. **注册路由**: 搜索路由已注册到 `src/app.js`
3. **重启服务**: 重启Node.js服务以加载新功能

```bash
# 使用PM2重启
pm2 restart zhimai-api

# 或直接重启
npm start
```

## 📊 性能优化建议

1. **数据库索引**: 为搜索字段添加索引
2. **分页查询**: 使用分页避免大量数据查询
3. **缓存机制**: 对热门搜索词进行缓存
4. **搜索频率限制**: 防止恶意搜索请求

## 🔍 使用场景

### 二课综测搜索
- 搜索"创新创业"相关活动和通知
- 按学分类型筛选活动
- 按学院筛选通知信息

### 通知信息咨询
- 搜索特定主题的通知
- 按校区、学院筛选通知
- 按发布时间排序通知

### 综合信息检索
- 同时搜索活动和通知
- 按相关性排序结果
- 提供统一的搜索体验

## ⚠️ 注意事项

1. **关键词长度**: 建议关键词长度在2-50个字符之间
2. **搜索频率**: 建议限制用户搜索频率，避免过度请求
3. **结果缓存**: 可以考虑对搜索结果进行短期缓存
4. **错误处理**: 妥善处理搜索失败的情况

这个统一搜索模块为你的小程序提供了强大的搜索功能，支持活动和通知的综合搜索，满足二课综测和通知信息咨询的搜索需求！
