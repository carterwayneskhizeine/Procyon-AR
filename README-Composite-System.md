# 🎬 画面合成系统使用指南

## 📋 系统概述

这是一个将 **AR人脸跟踪** 和 **透明度遮罩贴图** 两层画面合成为单层像素画面的实时传输系统。

### 🎯 核心功能
- **真实像素级合成**: 将摄像头画面和Three.js渲染的面部网格合成为单层画面
- **实时传输**: 通过WebSocket实现低延迟的画面传输
- **无翻转处理**: 确保纹理层方向正确，避免左右翻转
- **透明度遮罩**: 支持眼睛和嘴部透明效果

## 🏗️ 系统架构

```
📱 发送端                    🌐 WebSocket服务器              📺 接收端
index-pure-texture.html  →   composite-server.js  →   pre-prepared-video.html
        ↓                            ↓                         ↓
1. 摄像头 + AR渲染          2. 画面转发中继              3. 合成画面显示
2. 像素级合成              3. 帧率统计                 4. 画面处理控制
3. 实时传输                4. 连接管理                 5. 全屏保存功能
```

## 🚀 快速启动

### 方法一：自动启动（推荐）
```bash
# Windows
双击运行 start-composite-system.bat

# 或手动执行
./start-composite-system.bat
```

### 方法二：手动启动
```bash
# 1. 启动人脸特征点服务器
node face-landmarks-server.cjs

# 2. 启动画面合成WebSocket服务器
node composite-server.js

# 3. 打开浏览器访问
# 发送端: http://localhost:8080/Raccoon/index-pure-texture.html
# 接收端: http://localhost:8080/Raccoon/pre-prepared-video.html
```

## 📁 核心文件说明

### 🎥 发送端：`index-pure-texture.html`
- **功能**: AR人脸跟踪 + 透明度遮罩渲染
- **特色**: 
  - 使用ShaderMaterial实现眼睛嘴部透明
  - 实时肤色采样和颜色调节
  - 像素级画面合成
  - WebSocket实时传输

### 📺 接收端：`pre-prepared-video.html`
- **功能**: 接收并显示合成后的单层画面
- **特色**:
  - 实时显示帧率和连接状态
  - 画面缩放、亮度、对比度调节
  - 全屏显示和当前帧保存
  - 自动重连机制

### 🌐 服务器：`composite-server.js`
- **功能**: WebSocket中继服务器
- **特色**:
  - 高性能画面转发
  - 连接状态管理
  - 帧率统计
  - 优雅关闭

## 🎛️ 控制面板功能

### 发送端控制
- **颜色模式**: 乘法混合/叠加混合/线性插值
- **肤色采样**: 自动采样/手动设置
- **透明度控制**: 0-100%材质透明度
- **RGB调节**: 精确的颜色调整
- **人脸跟踪**: 68点特征检测

### 接收端控制
- **画面缩放**: 50%-200%
- **亮度调节**: 50%-150%
- **对比度**: 50%-150%
- **全屏显示**: 一键全屏
- **保存功能**: 保存当前帧为PNG

## 🔧 技术细节

### 画面合成原理
```javascript
// 创建合成画布
const compositeCanvas = document.createElement('canvas');
const compositeCtx = compositeCanvas.getContext('2d');

// 第一层：原始视频画面
compositeCtx.drawImage(videoElement, 0, 0, width, height);

// 第二层：Three.js渲染结果（透明度遮罩）
compositeCtx.globalCompositeOperation = 'source-over';
compositeCtx.drawImage(threeCanvas, 0, 0, width, height);
```

### WebSocket数据传输
```javascript
// 发送端
compositeCanvas.toBlob((blob) => {
  websocket.send(blob);
}, 'image/jpeg', 0.85);

// 接收端
websocket.onmessage = (event) => {
  const img = new Image();
  img.src = URL.createObjectURL(event.data);
  canvas.drawImage(img, 0, 0);
};
```

## 📊 性能优化

### 帧率控制
- **发送频率**: 30fps (每2帧发送一次)
- **图像质量**: JPEG 85%压缩
- **传输优化**: 禁用WebSocket压缩

### 内存管理
- **自动清理**: 定期清理失效连接
- **Blob URL释放**: 及时释放图像内存
- **画布重用**: 复用合成画布

## 🚨 故障排除

### 常见问题

#### 1. 合成画面黑屏
```bash
解决方案:
- 检查摄像头权限是否授权
- 确认发送端AR跟踪已启动
- 查看浏览器控制台错误信息
```

#### 2. WebSocket连接失败
```bash
解决方案:
- 确认 composite-server.js 已启动
- 检查端口3002是否被占用
- 系统会自动降级到HTTP轮询模式
```

#### 3. 纹理翻转问题
```bash
解决方案:
- 当前版本已修复翻转问题
- 如遇到请检查WebGL变换矩阵
- 确认Canvas绘制方向一致
```

#### 4. 传输延迟过高
```bash
解决方案:
- 降低图像质量 (修改JPEG压缩率)
- 减少发送频率 (增加帧跳过数量)
- 使用有线网络连接
```

## 📈 监控和调试

### 日志文件
```bash
logs/
├── landmarks-server.log     # 人脸特征点服务器日志
└── composite-server.log     # 画面合成服务器日志
```

### 实时监控
- **发送端**: 控制面板显示FPS和连接状态
- **接收端**: 信息面板显示传输统计
- **服务器**: 终端输出连接数和传输帧率

### API端点
```bash
# 健康检查
GET http://localhost:3001/api/health

# WebSocket状态
WS ws://localhost:3002?type=sender
WS ws://localhost:3002?type=receiver
```

## 🎯 使用场景

### 1. 虚拟直播
- 实时面部跟踪效果
- 自定义透明度遮罩
- 高质量画面输出

### 2. AR应用开发
- 快速原型验证
- 效果实时预览
- 多端同步显示

### 3. 机器学习数据采集
- 实时特征点提取
- 画面数据记录
- 训练样本生成

## ⚠️ 注意事项

1. **浏览器兼容性**: 推荐Chrome/Edge最新版本
2. **摄像头权限**: 必须授权摄像头访问权限
3. **网络要求**: 本地运行，无需互联网连接
4. **性能要求**: 建议使用独立显卡以获得最佳性能
5. **关闭顺序**: 先关闭浏览器，再关闭服务器

## 🔄 更新日志

### v1.0.0 (当前版本)
- ✅ 基础画面合成功能
- ✅ WebSocket实时传输
- ✅ 透明度遮罩支持
- ✅ 翻转问题修复
- ✅ 自动启动脚本

### 计划功能
- 📋 多客户端广播
- 📋 画面录制功能
- 📋 更多混合模式
- 📋 移动端支持

---

如有问题请查看日志文件或检查浏览器控制台输出。 