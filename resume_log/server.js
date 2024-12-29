// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// 日志文件路径（请根据自己的实际情况修改）
const logFilePath = '/opt/nginx_logs/https_access.log';

// 提供 API 获取日志
app.get('/log', (req, res) => {
  try {
    // 读取日志文件（假设使用 UTF-8 编码）
    const logsContent = fs.readFileSync(logFilePath, 'utf-8');

    // 将日志按行拆分
    const lines = logsContent.split('\n');

    // 如果只想要常见HTTP方法的日志，可在此做初步筛选
    // 当然也可以不筛选，直接返回全部，再由前端再过滤
    const filteredLogs = lines.filter((line) =>
      /GET|POST|HEAD|PUT|DELETE|OPTIONS|PATCH/.test(line)
    );

    // 返回 JSON，其中 logs 为数组
    res.json({ logs: filteredLogs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to read log file' });
  }
});

// 提供静态文件支持，使得可以直接访问到前端 HTML/CSS/JS
app.use(express.static(path.join(__dirname, 'public')));

// 启动服务器
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
