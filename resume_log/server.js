const express = require('express');
const fs = require('fs');
const readline = require('readline');
const path = require('path');

const app = express();
const port = 3000;

// 动态设置日志文件路径
const logFilePath = process.env.LOG_FILE_PATH || '/opt/nginx_logs/https_access.log';

// 获取日志 API，流式读取最新 100 条日志
app.get('/log', async (req, res) => {
  try {
    // 创建一个流式读取接口
    const fileStream = fs.createReadStream(logFilePath, { encoding: 'utf-8' });
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity, // 处理不同平台的换行符
    });

    const logs = [];
    const maxLogs = 100; // 保留的最大日志条数

    for await (const line of rl) {
      // 只保留包含指定 HTTP 方法的日志
      if (/GET|POST|HEAD|PUT|DELETE|OPTIONS|PATCH/.test(line)) {
        logs.push(line);

        // 如果超过 maxLogs，则移除最旧的日志，始终保留最新的日志
        if (logs.length > maxLogs) {
          logs.shift();
        }
      }
    }

    // 返回 JSON，其中 logs 为数组
    res.json({ logs });
  } catch (error) {
    console.error('Error reading log file:', error.message);
    res.status(500).json({ error: 'Failed to read log file' });
  }
});

// 提供静态文件服务
app.use(express.static(path.join(__dirname, 'public')));

// 启动服务器
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});