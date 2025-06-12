const WebSocket = require('ws');

// ==================================================
// 可开关：是否将 source/target 点位写入 swap_point 目录
// true  = 开启写文件
// false = 关闭写文件（仅转发，不落盘）
// 也可以通过环境变量 SWITCH_SWAP_POINT 控制
// ==================================================
const ENABLE_SWAP_POINT = process.env.SWITCH_SWAP_POINT !== 'false';

console.log('🎯 启动面部关键点传输服务器...');

// 创建 WebSocket 服务器，监听 3003 端口
const wss = new WebSocket.Server({ 
  port: 3003,
  perMessageDeflate: false
});

// 存储连接的客户端
const clients = {
  source: null,    // index-pure-texture.html (发送我的轮廓)
  target: null,    // index-pure-mesh.html (发送明星轮廓)  
  receiver: null   // pre-prepared-video.html (接收形变)
};

// 统计信息
let stats = {
  sourceCount: 0,
  targetCount: 0,
  receiverCount: 0,
  messagesRelayed: 0
};

wss.on('connection', (ws, request) => {
  const url = new URL(request.url, 'http://localhost:3003');
  const clientType = url.searchParams.get('type') || 'unknown';
  
  console.log(`📡 新连接: ${clientType} (${request.socket.remoteAddress})`);
  
  // 根据类型分配客户端
  if (clientType === 'source') {
    clients.source = ws;
    stats.sourceCount++;
    console.log('✅ source 客户端已连接 (index-pure-texture.html)');
  } else if (clientType === 'target') {
    clients.target = ws;
    stats.targetCount++;
    console.log('✅ target 客户端已连接 (index-pure-mesh.html)');
  } else if (clientType === 'receiver') {
    clients.receiver = ws;
    stats.receiverCount++;
    console.log('✅ receiver 客户端已连接 (pre-prepared-video.html)');
  }
  
  // 发送欢迎消息
  ws.send(JSON.stringify({
    type: 'welcome',
    role: clientType,
    message: `欢迎连接到面部关键点传输服务器！您的角色: ${clientType}`,
    timestamp: Date.now()
  }));
  
  // 处理消息
  ws.on('message', (data) => {
    try {
      const message = JSON.parse(data);
      
      // 转发关键点数据到接收端
      if (message.type === 'landmarks' && clients.receiver) {
        // 添加发送者信息和时间戳
        const relayMessage = {
          ...message,
          sender: clientType,
          relayTime: Date.now()
        };
        
        clients.receiver.send(JSON.stringify(relayMessage));
        stats.messagesRelayed++;
        
        // === 新增: 将 source/target 点位写入 swap_point 文件夹 ===
        try {
          if (ENABLE_SWAP_POINT) {
            const fs = require('fs');
            const path = require('path');
            const saveDir = path.join(__dirname, 'swap_point');
            if (!fs.existsSync(saveDir)) {
              fs.mkdirSync(saveDir, { recursive: true });
            }
            const frameId = message.frame !== undefined ? message.frame : Date.now();
            const fileName = `${clientType}_${frameId}.json`;
            fs.writeFile(path.join(saveDir, fileName), JSON.stringify(message, null, 2), (err) => {
              if (err) {
                console.error('❌ 无法保存 swap_point 文件:', err.message);
              }
            });
          }
        } catch (fsErr) {
          console.error('❌ 写入 swap_point 失败:', fsErr.message);
        }
        
        console.log(`🔄 转发关键点: ${clientType} → receiver (${message.pts71?.length || message.pts68?.length || 0} 个点)`);
      }
      
      // 处理状态查询
      if (message.type === 'status') {
        ws.send(JSON.stringify({
          type: 'status',
          stats: stats,
          clients: {
            source: clients.source ? 'connected' : 'disconnected',
            target: clients.target ? 'connected' : 'disconnected', 
            receiver: clients.receiver ? 'connected' : 'disconnected'
          },
          timestamp: Date.now()
        }));
      }
      
    } catch (error) {
      console.error('❌ 消息解析失败:', error.message);
    }
  });
  
  // 处理断开连接
  ws.on('close', () => {
    console.log(`📡 连接断开: ${clientType}`);
    
    if (clients.source === ws) {
      clients.source = null;
      console.log('❌ source 客户端已断开');
    } else if (clients.target === ws) {
      clients.target = null;
      console.log('❌ target 客户端已断开');
    } else if (clients.receiver === ws) {
      clients.receiver = null;
      console.log('❌ receiver 客户端已断开');
    }
  });
  
  // 处理错误
  ws.on('error', (error) => {
    console.error(`❌ WebSocket 错误 (${clientType}):`, error.message);
  });
});

// 定期输出统计信息
setInterval(() => {
  const connectedClients = Object.values(clients).filter(c => c !== null).length;
  console.log(`📊 状态: ${connectedClients}/3 客户端在线 | 已转发 ${stats.messagesRelayed} 条消息`);
}, 30000); // 每30秒输出一次

// 服务器启动成功
wss.on('listening', () => {
  console.log('✅ 面部关键点传输服务器已启动');
  console.log('📡 监听端口: 3003');
  console.log('🔗 连接方式:');
  console.log('   source:   ws://localhost:3003?type=source   (index-pure-texture.html)');
  console.log('   target:   ws://localhost:3003?type=target   (index-pure-mesh.html)');
  console.log('   receiver: ws://localhost:3003?type=receiver (pre-prepared-video.html)');
  console.log('');
});

// 优雅关闭
process.on('SIGTERM', () => {
  console.log('🛑 收到关闭信号，正在关闭服务器...');
  wss.close(() => {
    console.log('✅ 面部关键点传输服务器已关闭');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('\n🛑 收到中断信号，正在关闭服务器...');
  wss.close(() => {
    console.log('✅ 面部关键点传输服务器已关闭');
    process.exit(0);
  });
}); 