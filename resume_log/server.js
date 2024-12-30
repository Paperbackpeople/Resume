const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// 日志文件路径（请根据实际情况修改）
const logFilePath = '/opt/nginx_logs/https_access.log';

// 提供 API 获取日志
app.get('/log', (req, res) => {
  try {
    // 读取日志文件
    const logsContent = fs.readFileSync(logFilePath, 'utf-8');

    // 将日志按行拆分
    const lines = logsContent.split('\n');

    // 只保留有效的 HTTP 请求日志
    const validLogs = lines.filter((line) =>
      /^(\S+) - \[.+\] "((GET|POST|HEAD|PUT|DELETE|OPTIONS|PATCH) .+ HTTP\/1\.\d)" \d{3} \d+ .+$/.test(line)
    );

    // 返回 JSON，其中 logs 为数组
    res.json({ logs: validLogs });
  } catch (error) {
    console.error('Error reading log file:', error);
    // 返回 JSON 格式的错误消息，而不是 HTML
    res.status(500).json({ error: 'Failed to process logs' });
  }
});

// 提供静态文件支持，使得可以直接访问到前端 HTML/CSS/JS
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  console.log('Incoming request on:', req.url);
  next();
});

// 启动服务器
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
