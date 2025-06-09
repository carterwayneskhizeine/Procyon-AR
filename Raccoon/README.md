# 🦝 Raccoon Face Tracking - 离线版本

这是一个完全本地化的浣熊面部跟踪演示，所有资源都已下载到本地，可以完全离线运行。

## 📂 目录结构

```
Raccoon/
├── index.html              # 主页面（已修改为使用本地资源）
├── assets/
│   └── raccoon_head.glb   # 浣熊3D模型 (8.8MB)
└── libs/
    ├── mindar-face-three.prod.js  # MindAR库 (7.1KB)
    └── three/
        ├── three.module.js        # Three.js核心库 (1.2MB)
        └── addons/
            └── loaders/
                └── GLTFLoader.js  # GLTF加载器 (106KB)
```

## 🚀 运行方法

### 方法一：使用项目开发服务器
在项目根目录运行：
```bash
npm run dev
```
然后访问：`https://localhost:5174/Raccoon/`

### 方法二：任何本地HTTP服务器
```bash
# Python
cd Raccoon && python -m http.server 8080

# Node.js
cd Raccoon && npx serve

# PHP
cd Raccoon && php -S localhost:8080
```

## 📋 已本地化的资源

✅ **Three.js v0.160.0** - 3D图形库
✅ **MindAR v1.2.5** - 面部跟踪库
✅ **GLTFLoader** - 3D模型加载器
✅ **Raccoon Model** - 浣熊头部3D模型

## 🎮 功能特性

- 🎯 **实时面部跟踪**：检测468个面部关键点
- 😊 **表情同步**：浣熊会同步你的面部表情
- 📹 **镜像视频**：右下角显示实时摄像头画面
- 🔄 **完全离线**：无需网络连接
- ⚡ **GPU加速**：WebGL渲染和MediaPipe推理

## 💡 使用提示

1. **允许摄像头权限**：首次访问时需要授权
2. **良好光照**：确保面部光线充足
3. **正面对着摄像头**：获得最佳跟踪效果
4. **Chrome浏览器**：推荐使用Chrome或Edge

## 🎨 页面显示

- 右上角：🔄 离线模式指示器
- 主画面：3D浣熊头像
- 右下角：实时摄像头画面

享受你的离线面部跟踪体验！ 🎉 