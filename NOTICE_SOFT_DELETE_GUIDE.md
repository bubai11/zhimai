# 📋 Notice软删除功能使用指南

## 概述

为Notice模型添加了软删除功能，支持安全地删除通知记录而不永久丢失数据。软删除的记录不会出现在正常的查询和搜索中，但可以通过特殊方法访问和管理。

## 🚀 功能特性

### ✅ 已实现功能
- **软删除**: 使用`deleted_at`字段标记删除时间
- **自动过滤**: 正常查询自动排除软删除记录
- **搜索排除**: 搜索功能自动排除软删除记录
- **恢复功能**: 可以恢复软删除的记录
- **永久删除**: 支持永久删除记录
- **软删除列表**: 可以查看所有软删除的记录
- **数据库索引**: 为软删除字段添加了性能索引

## 📁 文件结构

```
src/
├── models/
│   └── Notice.js                    # Notice模型（已更新软删除支持）
├── services/
│   └── noticeService.js             # Notice服务（新增）
└── ...

# 数据库脚本
├── add-notice-soft-delete.sql       # SQL脚本
└── add-notice-soft-delete-field.js  # Node.js执行脚本

# 测试脚本
├── test-notice-soft-delete.js       # 软删除功能测试
└── test-notice-complete.js          # 完整功能测试
```

## 🗄️ 数据库变更

### 1. 添加字段
```sql
-- 添加软删除字段
ALTER TABLE notices ADD COLUMN deleted_at DATETIME NULL DEFAULT NULL COMMENT '软删除时间';
```

### 2. 添加索引
```sql
-- 软删除字段索引
CREATE INDEX idx_notices_deleted_at ON notices(deleted_at);

-- 复合索引（用于软删除查询优化）
CREATE INDEX idx_notices_publish_time_deleted_at ON notices(publish_time, deleted_at);
```

## 🔧 模型配置

### Notice模型更新
```javascript
// src/models/Notice.js
{
    // ... 其他字段
    deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: '软删除时间'
    }
}, {
    tableName: 'notices',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    underscored: true,
    paranoid: true,              // 启用软删除
    deletedAt: 'deleted_at',     // 指定软删除字段
    comment: '通知信息表'
}
```

## 🛠️ 服务方法

### NoticeService API

#### 1. 基本CRUD操作
```javascript
// 获取通知列表（自动排除软删除）
const notices = await noticeService.getAllNotices({
    keyword: '关键词',
    notice_type: '通知类型',
    page: 1,
    pageSize: 10
});

// 根据ID获取通知（自动排除软删除）
const notice = await noticeService.getNoticeById(noticeId);

// 创建通知
const newNotice = await noticeService.createNotice({
    title: '通知标题',
    content: '通知内容',
    publisher: '发布者',
    campus: '校区',
    college: '学院',
    notice_type: '通知类型',
    publish_time: new Date()
});

// 更新通知
const updatedNotice = await noticeService.updateNotice(noticeId, {
    title: '更新后的标题'
});
```

#### 2. 软删除操作
```javascript
// 软删除通知
const deleteResult = await noticeService.deleteNotice(noticeId);

// 恢复软删除的通知
const restoreResult = await noticeService.restoreNotice(noticeId);

// 永久删除通知
const forceDeleteResult = await noticeService.forceDeleteNotice(noticeId);
```

#### 3. 软删除管理
```javascript
// 获取软删除的通知列表
const deletedNotices = await noticeService.getDeletedNotices({
    page: 1,
    pageSize: 10
});
```

## 🔍 搜索功能

### 自动排除软删除
搜索功能会自动排除软删除的记录：

```javascript
// 统一搜索（自动排除软删除）
const searchResult = await searchService.unifiedSearch({
    keyword: '关键词',
    type: 'notice',
    page: 1,
    pageSize: 10
});

// 仅搜索通知（自动排除软删除）
const noticeSearchResult = await searchService.searchNotices(keyword, offset, limit, sortBy, sortOrder);
```

### 直接查询软删除记录
```javascript
// 使用paranoid: false查询软删除记录
const deletedNotice = await Notice.findByPk(noticeId, {
    paranoid: false
});

// 查询所有软删除记录
const allDeletedNotices = await Notice.findAll({
    where: {
        deleted_at: { [Op.ne]: null }
    },
    paranoid: false
});
```

## 🚀 部署步骤

### 1. 执行数据库迁移
```bash
# 方法1: 使用Node.js脚本（推荐）
node add-notice-soft-delete-field.js

# 方法2: 直接执行SQL
mysql -u username -p database_name < add-notice-soft-delete.sql
```

### 2. 重启服务
```bash
# 使用PM2重启
pm2 restart zhimai-api

# 或直接重启
npm start
```

### 3. 验证功能
```bash
# 运行软删除功能测试
node test-notice-soft-delete.js

# 运行完整功能测试
node test-notice-complete.js
```

## 🧪 测试用例

### 软删除功能测试
```bash
node test-notice-soft-delete.js
```

**测试内容**:
1. ✅ 创建测试通知
2. ✅ 验证正常查询
3. ✅ 测试软删除
4. ✅ 验证软删除后无法正常查询
5. ✅ 验证软删除后无法搜索到
6. ✅ 验证可以通过paranoid: false查询
7. ✅ 测试恢复软删除
8. ✅ 验证恢复后可以正常查询
9. ✅ 测试获取软删除列表
10. ✅ 测试永久删除
11. ✅ 验证永久删除后无法查询

### 完整功能测试
```bash
node test-notice-complete.js
```

**测试内容**:
1. ✅ 搜索功能（排除软删除）
2. ✅ 搜索建议功能
3. ✅ 搜索统计功能

## 📊 性能优化

### 数据库索引
- `idx_notices_deleted_at`: 软删除字段索引
- `idx_notices_publish_time_deleted_at`: 复合索引，优化软删除查询

### 查询优化
- 使用`paranoid: true`自动过滤软删除记录
- 复合索引提高软删除列表查询性能
- 搜索功能自动排除软删除记录

## ⚠️ 注意事项

### 1. 数据安全
- 软删除不是永久删除，数据仍然存在于数据库中
- 需要定期清理过期的软删除记录
- 敏感数据建议使用永久删除

### 2. 性能考虑
- 软删除会增加查询复杂度
- 建议定期清理长期软删除的记录
- 使用索引优化查询性能

### 3. 业务逻辑
- 确保业务逻辑正确处理软删除状态
- 搜索和列表功能自动排除软删除记录
- 管理功能需要特殊处理软删除记录

## 🔄 维护建议

### 定期清理
```javascript
// 清理30天前的软删除记录
const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

await Notice.destroy({
    where: {
        deleted_at: {
            [Op.lt]: thirtyDaysAgo
        }
    },
    force: true
});
```

### 监控软删除记录数量
```javascript
// 统计软删除记录数量
const deletedCount = await Notice.count({
    where: {
        deleted_at: { [Op.ne]: null }
    },
    paranoid: false
});
```

## 🎯 使用场景

### 1. 内容管理
- 用户误删通知后可以恢复
- 管理员可以管理已删除的内容
- 支持内容审核流程

### 2. 数据安全
- 防止意外永久删除重要数据
- 支持数据恢复和审计
- 符合数据保护要求

### 3. 业务需求
- 支持通知的草稿和发布状态
- 支持通知的临时隐藏
- 支持通知的版本管理

这个软删除功能为Notice模型提供了完整的数据管理能力，既保证了数据安全，又满足了业务需求！🎉
