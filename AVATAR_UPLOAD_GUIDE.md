# 📱 头像上传功能使用指南

## 概述

使用阿里云OSS实现头像上传功能，完全按照5个步骤实现：小程序选择图片 → 上传到云服务器 → 上传到OSS → 返回URL → 前端展示。

## 🚀 功能特性

- ✅ **简单直接**: 只需要一个上传接口 `/api/upload/avatar`
- ✅ **云存储**: 使用阿里云OSS，无需本地存储
- ✅ **自动处理**: 服务器自动处理文件上传和URL生成
- ✅ **安全可靠**: 支持用户认证和文件类型验证
- ✅ **易于维护**: 代码结构清晰，易于扩展

## 📁 文件结构

```
src/
├── services/
│   └── ossService.js              # 阿里云OSS服务
├── controllers/
│   └── uploadController.js        # 上传控制器
└── routes/
    └── uploadRoutes.js            # 上传路由
```

## 🔧 技术实现

### 依赖包
```json
{
  "ali-oss": "^6.18.1",    // 阿里云OSS SDK
  "multer": "^1.4.5-lts.1" // 文件上传处理
}
```

### 环境变量
```env
# 阿里云OSS配置
OSS_REGION=oss-cn-hangzhou
OSS_ACCESS_KEY_ID=your_access_key_id
OSS_ACCESS_KEY_SECRET=your_access_key_secret
OSS_BUCKET=your_bucket_name
OSS_BASE_URL=https://your_bucket_name.oss-cn-hangzhou.aliyuncs.com
```

## 🌐 API接口

### 1. 上传头像

**接口**: `POST /api/upload/avatar`

**认证**: 需要用户token

**请求**: `multipart/form-data`
```
avatar: 图片文件 (JPEG/PNG/WebP, 最大5MB)
```

**响应示例**:
```json
{
  "code": 0,
  "message": "头像上传成功",
  "data": {
    "url": "https://your-bucket.oss-cn-hangzhou.aliyuncs.com/avatars/123/1234567890_abcdef.jpg",
    "urls": {
      "small": "https://your-bucket.oss-cn-hangzhou.aliyuncs.com/avatars/123/1234567890_abcdef_small.jpg",
      "medium": "https://your-bucket.oss-cn-hangzhou.aliyuncs.com/avatars/123/1234567890_abcdef_medium.jpg",
      "large": "https://your-bucket.oss-cn-hangzhou.aliyuncs.com/avatars/123/1234567890_abcdef_large.jpg"
    },
    "fileName": "avatars/123/1234567890_abcdef.jpg",
    "size": 1024000
  }
}
```

### 2. 删除头像

**接口**: `DELETE /api/upload/avatar`

**认证**: 需要用户token

**响应示例**:
```json
{
  "code": 0,
  "message": "头像删除成功",
  "data": {
    "message": "头像删除成功"
  }
}
```

## 📱 小程序端实现

### 完整示例代码

```javascript
// pages/profile/profile.js
Page({
  data: {
    userAvatar: '',
    uploading: false
  },

  // 1. 选择图片 → 获取临时路径
  chooseAvatar() {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const tempFilePath = res.tempFilePaths[0];
        this.uploadAvatar(tempFilePath);
      },
      fail: (error) => {
        console.error('选择图片失败:', error);
        wx.showToast({
          title: '选择图片失败',
          icon: 'error'
        });
      }
    });
  },

  // 2. 上传到云服务器 /api/upload/avatar
  uploadAvatar(tempFilePath) {
    this.setData({ uploading: true });
    
    wx.uploadFile({
      url: 'https://your-api.com/api/upload/avatar',
      filePath: tempFilePath,
      name: 'avatar',
      header: {
        'Authorization': `Bearer ${wx.getStorageSync('token')}`
      },
      success: (res) => {
        try {
          const result = JSON.parse(res.data);
          if (result.code === 0) {
            // 5. 前端展示头像
            this.setData({
              userAvatar: result.data.url
            });
            
            wx.showToast({
              title: '头像上传成功',
              icon: 'success'
            });
          } else {
            throw new Error(result.message);
          }
        } catch (error) {
          console.error('解析响应失败:', error);
          wx.showToast({
            title: '上传失败',
            icon: 'error'
          });
        }
      },
      fail: (error) => {
        console.error('上传失败:', error);
        wx.showToast({
          title: '上传失败',
          icon: 'error'
        });
      },
      complete: () => {
        this.setData({ uploading: false });
      }
    });
  },

  // 删除头像
  deleteAvatar() {
    wx.showModal({
      title: '确认删除',
      content: '确定要删除当前头像吗？',
      success: (res) => {
        if (res.confirm) {
          this.performDeleteAvatar();
        }
      }
    });
  },

  // 执行删除头像
  performDeleteAvatar() {
    wx.request({
      url: 'https://your-api.com/api/upload/avatar',
      method: 'DELETE',
      header: {
        'Authorization': `Bearer ${wx.getStorageSync('token')}`
      },
      success: (res) => {
        if (res.data.code === 0) {
          this.setData({
            userAvatar: ''
          });
          wx.showToast({
            title: '头像删除成功',
            icon: 'success'
          });
        } else {
          wx.showToast({
            title: res.data.message || '删除失败',
            icon: 'error'
          });
        }
      },
      fail: (error) => {
        console.error('删除失败:', error);
        wx.showToast({
          title: '删除失败',
          icon: 'error'
        });
      }
    });
  },

  // 页面加载时获取用户头像
  onLoad() {
    this.loadUserAvatar();
  },

  // 加载用户头像
  loadUserAvatar() {
    wx.request({
      url: 'https://your-api.com/api/user/profile',
      header: {
        'Authorization': `Bearer ${wx.getStorageSync('token')}`
      },
      success: (res) => {
        if (res.data.code === 0) {
          this.setData({
            userAvatar: res.data.data.avatarUrl || ''
          });
        }
      }
    });
  }
});
```

### 页面模板

```xml
<!-- pages/profile/profile.wxml -->
<view class="profile-container">
  <view class="avatar-section">
    <view class="avatar-wrapper" bindtap="chooseAvatar">
      <image 
        class="avatar-image" 
        src="{{userAvatar || '/static/images/default-avatar.png'}}"
        mode="aspectFill"
      />
      <view class="avatar-overlay">
        <text class="avatar-text">{{uploading ? '上传中...' : '点击更换'}}</text>
      </view>
    </view>
    
    <view class="avatar-actions">
      <button 
        class="btn-upload" 
        bindtap="chooseAvatar"
        disabled="{{uploading}}"
      >
        选择头像
      </button>
      
      <button 
        class="btn-delete" 
        bindtap="deleteAvatar"
        disabled="{{!userAvatar || uploading}}"
      >
        删除头像
      </button>
    </view>
  </view>
</view>
```

## 🚀 部署步骤

### 1. 安装依赖
```bash
npm install ali-oss multer
```

### 2. 配置阿里云OSS
- 登录阿里云控制台
- 创建OSS存储桶
- 获取AccessKey和SecretKey
- 配置环境变量

### 3. 配置环境变量
```bash
# 复制并配置.env文件
cp env.example .env
# 编辑.env文件，填入OSS配置
```

### 4. 重启服务
```bash
pm2 restart zhimai-api
```

### 5. 测试功能
```bash
node test-oss-upload.js
```

## 📊 流程总结

### 完整流程
1. **小程序选择图片** → `wx.chooseImage()` 获取临时路径
2. **前端上传文件** → `wx.uploadFile()` 发送到 `/api/upload/avatar`
3. **云服务器接收** → multer 处理文件，上传到阿里云 OSS
4. **返回OSS URL** → 返回文件访问地址给前端
5. **前端展示头像** → 使用返回的URL显示头像

### 优势
- ✅ **简单直接**: 只需要一个上传接口
- ✅ **云存储**: 使用阿里云OSS，无需本地存储
- ✅ **自动处理**: 服务器自动处理文件上传和URL生成
- ✅ **安全可靠**: 支持用户认证和文件类型验证
- ✅ **易于维护**: 代码结构清晰，易于扩展

### 注意事项
- 确保阿里云OSS配置正确
- 设置合适的文件大小限制（当前5MB）
- 考虑添加图片压缩和格式转换
- 定期清理无用的头像文件

这个方案完全按照你提到的5个步骤实现，代码简洁高效！🎉
