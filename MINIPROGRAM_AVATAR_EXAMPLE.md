# 📱 小程序头像上传示例

## 完整流程实现

### 1. 小程序端选择图片
```javascript
// pages/profile/profile.js
Page({
  data: {
    userAvatar: '',
    uploading: false
  },

  // 选择头像
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

  // 上传头像到云服务器
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
            // 上传成功，更新头像显示
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

### 2. 小程序端页面模板
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

### 3. 小程序端样式
```css
/* pages/profile/profile.wxss */
.profile-container {
  padding: 40rpx;
}

.avatar-section {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.avatar-wrapper {
  position: relative;
  width: 200rpx;
  height: 200rpx;
  border-radius: 50%;
  overflow: hidden;
  border: 4rpx solid #f0f0f0;
}

.avatar-image {
  width: 100%;
  height: 100%;
}

.avatar-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
}

.avatar-wrapper:active .avatar-overlay {
  opacity: 1;
}

.avatar-text {
  color: white;
  font-size: 24rpx;
}

.avatar-actions {
  margin-top: 40rpx;
  display: flex;
  gap: 20rpx;
}

.btn-upload, .btn-delete {
  padding: 20rpx 40rpx;
  border-radius: 8rpx;
  font-size: 28rpx;
}

.btn-upload {
  background: #007aff;
  color: white;
}

.btn-delete {
  background: #ff3b30;
  color: white;
}

.btn-upload[disabled], .btn-delete[disabled] {
  background: #ccc;
  color: #999;
}
```

## 🔧 服务端配置

### 1. 环境变量配置
```env
# .env
OSS_REGION=oss-cn-hangzhou
OSS_ACCESS_KEY_ID=your_access_key_id
OSS_ACCESS_KEY_SECRET=your_access_key_secret
OSS_BUCKET=your_bucket_name
OSS_BASE_URL=https://your_bucket_name.oss-cn-hangzhou.aliyuncs.com
```

### 2. 安装依赖
```bash
npm install ali-oss multer
```

### 3. 启动服务
```bash
npm start
```

## 📊 流程总结

### 完整流程
1. **小程序选择图片** → `wx.chooseImage()` 获取临时路径
2. **前端上传文件** → `uni.uploadFile()` 发送到 `/api/upload/avatar`
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
- 设置合适的文件大小限制
- 考虑添加图片压缩和格式转换
- 定期清理无用的头像文件

这个方案确实比单独的控制器更简洁，完全符合你提到的5个步骤！🎉
