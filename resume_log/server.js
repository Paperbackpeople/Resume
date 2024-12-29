const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// 日志文件路径
const logFilePath = '/opt/nginx_logs/https_access.log';

// 提供 API 获取日志
app.get('/logs/', (req, res) => {
  try {
    // 读取日志文件
    const logs = fs.readFileSync(logFilePath, 'utf-8');

    // 筛选包含指定 HTTP 方法的日志
    const filteredLogs = logs
      .split('\n')
      .filter((line) => /GET|POST|HEAD|PUT|DELETE|OPTIONS|PATCH/.test(line));

    res.json({ logs: filteredLogs });
  } catch (error) {
    res.status(500).json({ error: 'Failed to read log file' });
  }
});

// 提供静态文件支持
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
