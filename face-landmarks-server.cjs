const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 3001;

// 中间件
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// 确保 swap_point 目录存在
const ensureSwapPointDir = async () => {
  const swapPointDir = path.join(__dirname, 'swap_point');
  try {
    await fs.access(swapPointDir);
  } catch (error) {
    await fs.mkdir(swapPointDir, { recursive: true });
    console.log('📁 创建 swap_point 目录');
  }
};

// API端点：保存人脸特征点 (Texture版本)
app.post('/api/save-landmarks', async (req, res) => {
  try {
    const landmarkData = req.body;
    const filePath = path.join(__dirname, 'swap_point', 'face_landmarks_texture.json');
    
    // 添加服务器端时间戳
    landmarkData.serverTimestamp = Date.now();
    landmarkData.saveTime = new Date().toISOString();
    
    // 保存到文件
    await fs.writeFile(filePath, JSON.stringify(landmarkData, null, 2));
    
    console.log(`💾 Texture版人脸特征点已保存 - 特征点数量: ${landmarkData.landmarks?.length || 0}`);
    
    res.json({ 
      success: true, 
      message: 'Texture版人脸特征点保存成功',
      pointCount: landmarkData.landmarks?.length || 0,
      timestamp: landmarkData.serverTimestamp
    });
    
  } catch (error) {
    console.error('❌ 保存Texture版人脸特征点失败:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// API端点：保存人脸特征点 (Mesh版本)
app.post('/api/save-landmarks-local', async (req, res) => {
  try {
    const landmarkData = req.body;
    const filePath = path.join(__dirname, 'swap_point', 'face_landmarks_mesh.json');
    
    // 添加服务器端时间戳
    landmarkData.serverTimestamp = Date.now();
    landmarkData.saveTime = new Date().toISOString();
    
    // 保存到文件
    await fs.writeFile(filePath, JSON.stringify(landmarkData, null, 2));
    
    console.log(`💾 Mesh版人脸特征点已保存 - 特征点数量: ${landmarkData.landmarks?.length || 0}`);
    
    res.json({ 
      success: true, 
      message: 'Mesh版人脸特征点保存成功',
      pointCount: landmarkData.landmarks?.length || 0,
      timestamp: landmarkData.serverTimestamp
    });
    
  } catch (error) {
    console.error('❌ 保存Mesh版人脸特征点失败:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// API端点：获取最新的人脸特征点 (Texture版本)
app.get('/api/get-landmarks', async (req, res) => {
  try {
    const filePath = path.join(__dirname, 'swap_point', 'face_landmarks_texture.json');
    const data = await fs.readFile(filePath, 'utf8');
    const landmarkData = JSON.parse(data);
    
    res.json({
      success: true,
      data: landmarkData,
      source: 'texture'
    });
    
  } catch (error) {
    console.warn('⚠️ 读取Texture版人脸特征点失败:', error.message);
    res.status(404).json({
      success: false,
      error: '未找到Texture版人脸特征点数据'
    });
  }
});

// API端点：获取最新的人脸特征点 (Mesh版本)
app.get('/api/get-landmarks-local', async (req, res) => {
  try {
    const filePath = path.join(__dirname, 'swap_point', 'face_landmarks_mesh.json');
    const data = await fs.readFile(filePath, 'utf8');
    const landmarkData = JSON.parse(data);
    
    res.json({
      success: true,
      data: landmarkData,
      source: 'mesh'
    });
    
  } catch (error) {
    console.warn('⚠️ 读取Mesh版人脸特征点失败:', error.message);
    res.status(404).json({
      success: false,
      error: '未找到Mesh版人脸特征点数据'
    });
  }
});

// 健康检查端点
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    service: 'face-landmarks-server',
    timestamp: Date.now()
  });
});

// 启动服务器
const startServer = async () => {
  await ensureSwapPointDir();
  
  app.listen(PORT, () => {
    console.log('🚀 人脸特征点保存服务器已启动');
    console.log(`📡 服务地址: http://localhost:${PORT}`);
    console.log(`💾 保存目录: ${path.join(__dirname, 'swap_point')}`);
    console.log(`📊 API端点:`);
    console.log(`   POST /api/save-landmarks       - 保存特征点 (Texture版)`);
    console.log(`   POST /api/save-landmarks-local - 保存特征点 (Mesh版)`);
    console.log(`   GET  /api/get-landmarks        - 获取特征点 (Texture版)`);
    console.log(`   GET  /api/get-landmarks-local  - 获取特征点 (Mesh版)`);
    console.log(`   GET  /api/health               - 健康检查`);
  });
};

startServer().catch(console.error); 