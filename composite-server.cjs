#!/usr/bin/env node

/**
 * 🎬 画面合成WebSocket服务器
 * 用于从index-pure-texture.html接收合成画面并转发给pre-prepared-video.html
 */

const WebSocket = require('ws');
const fs = require('fs');
const path = require('path');

console.log('🎬 画面合成WebSocket服务器启动中...');

// 创建WebSocket服务器
const wss = new WebSocket.Server({ 
  port: 3002,
  perMessageDeflate: false  // 禁用压缩以提高性能
});

// 存储连接的客户端
const clients = {
  senders: new Set(),    // 发送端 (index-pure-texture.html)
  receivers: new Set()   // 接收端 (pre-prepared-video.html)
};

let frameCount = 0;
let lastLogTime = Date.now();

console.log('🌐 WebSocket服务器运行在 ws://localhost:3002');
console.log('📡 等待客户端连接...');

wss.on('connection', (ws, req) => {
  const clientIP = req.socket.remoteAddress;
  const userAgent = req.headers['user-agent'] || 'Unknown';
  
  console.log(`🔗 新客户端连接: ${clientIP}`);
  
  // 根据连接参数判断客户端类型
  const url = new URL(req.url, `http://${req.headers.host}`);
  const clientType = url.searchParams.get('type') || 'receiver'; // 默认为接收端
  
  if (clientType === 'sender') {
    clients.senders.add(ws);
    console.log(`📤 发送端已连接 (发送端总数: ${clients.senders.size})`);
  } else {
    clients.receivers.add(ws);
    console.log(`📥 接收端已连接 (接收端总数: ${clients.receivers.size})`);
  }
  
  // 处理消息 (主要是图像数据)
  ws.on('message', (data) => {
    try {
      frameCount++;
      
      // 定期输出统计信息
      const now = Date.now();
      if (now - lastLogTime > 5000) { // 每5秒输出一次
        const fps = Math.round((frameCount * 1000) / (now - lastLogTime));
        console.log(`📊 传输统计: ${fps} FPS, 发送端: ${clients.senders.size}, 接收端: ${clients.receivers.size}`);
        frameCount = 0;
        lastLogTime = now;
      }
      
      // 转发数据给所有接收端
      if (clients.receivers.size > 0) {
        const deadReceivers = [];
        
        clients.receivers.forEach((receiver) => {
          if (receiver.readyState === WebSocket.OPEN) {
            try {
              receiver.send(data);
            } catch (error) {
              console.warn('⚠️ 向接收端发送数据失败:', error.message);
              deadReceivers.push(receiver);
            }
          } else {
            deadReceivers.push(receiver);
          }
        });
        
        // 清理失效连接
        deadReceivers.forEach(receiver => {
          clients.receivers.delete(receiver);
        });
        
        if (deadReceivers.length > 0) {
          console.log(`🧹 清理了 ${deadReceivers.length} 个失效的接收端连接`);
        }
      }
      
    } catch (error) {
      console.error('❌ 处理消息失败:', error);
    }
  });
  
  // 处理连接关闭
  ws.on('close', (code, reason) => {
    console.log(`🔌 客户端断开连接: ${clientIP} (代码: ${code}, 原因: ${reason})`);
    
    // 从对应集合中移除
    if (clients.senders.has(ws)) {
      clients.senders.delete(ws);
      console.log(`📤 发送端已断开 (剩余发送端: ${clients.senders.size})`);
    }
    
    if (clients.receivers.has(ws)) {
      clients.receivers.delete(ws);
      console.log(`📥 接收端已断开 (剩余接收端: ${clients.receivers.size})`);
    }
  });
  
  // 处理错误
  ws.on('error', (error) => {
    console.error(`❌ WebSocket错误 (${clientIP}):`, error.message);
    
    // 清理连接
    clients.senders.delete(ws);
    clients.receivers.delete(ws);
  });
  
  // 发送欢迎消息
  if (ws.readyState === WebSocket.OPEN) {
    try {
      const welcomeMessage = JSON.stringify({
        type: 'welcome',
        message: `欢迎连接到画面合成服务器！您的类型: ${clientType}`,
        timestamp: Date.now(),
        serverVersion: '1.0.0'
      });
      ws.send(welcomeMessage);
    } catch (error) {
      console.warn('⚠️ 发送欢迎消息失败:', error.message);
    }
  }
});

// 服务器错误处理
wss.on('error', (error) => {
  console.error('❌ WebSocket服务器错误:', error);
});

// 优雅关闭处理
process.on('SIGINT', () => {
  console.log('\n🛑 收到关闭信号，正在优雅关闭服务器...');
  
  // 通知所有客户端
  const closeMessage = JSON.stringify({
    type: 'server-shutdown',
    message: '服务器正在关闭',
    timestamp: Date.now()
  });
  
  const allClients = [...clients.senders, ...clients.receivers];
  allClients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      try {
        client.send(closeMessage);
        client.close(1001, 'Server shutdown');
      } catch (error) {
        console.warn('⚠️ 关闭客户端连接失败:', error.message);
      }
    }
  });
  
  // 关闭服务器
  wss.close((error) => {
    if (error) {
      console.error('❌ 关闭WebSocket服务器失败:', error);
      process.exit(1);
    } else {
      console.log('✅ WebSocket服务器已成功关闭');
      process.exit(0);
    }
  });
});

// 定期清理死连接
setInterval(() => {
  const cleanupSenders = [];
  const cleanupReceivers = [];
  
  clients.senders.forEach((sender) => {
    if (sender.readyState !== WebSocket.OPEN) {
      cleanupSenders.push(sender);
    }
  });
  
  clients.receivers.forEach((receiver) => {
    if (receiver.readyState !== WebSocket.OPEN) {
      cleanupReceivers.push(receiver);
    }
  });
  
  cleanupSenders.forEach(sender => clients.senders.delete(sender));
  cleanupReceivers.forEach(receiver => clients.receivers.delete(receiver));
  
  if (cleanupSenders.length > 0 || cleanupReceivers.length > 0) {
    console.log(`🧹 定期清理: 移除 ${cleanupSenders.length} 个发送端, ${cleanupReceivers.length} 个接收端`);
  }
}, 30000); // 每30秒清理一次

// 输出启动完成信息
console.log('✅ 画面合成WebSocket服务器启动完成！');
console.log('📋 使用说明:');
console.log('   - 发送端 (index-pure-texture.html): ws://localhost:3002?type=sender');
console.log('   - 接收端 (pre-prepared-video.html): ws://localhost:3002?type=receiver');
console.log('   - 按 Ctrl+C 优雅关闭服务器');
console.log('�� 等待画面数据传输...\n'); 