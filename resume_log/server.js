const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// 日志文件路径（请根据实际情况修改）
const logFilePath = '/opt/nginx_logs/https_access.log';

app.get('/geo/:ip', async (req, res) => {
  const ip = req.params.ip;
  try {
    const geoData = await fetch(`https://ip-api.com/json/${ip}`);
    const geoJson = await geoData.json();
    res.json(geoJson);
  } catch (error) {
    console.error('Error fetching geo location:', error);
    res.status(500).json({ error: 'Failed to fetch geo location' });
  }
});

app.get('/log', (req, res) => {
  handleLogRequest(req, res);
});

app.get('/log/', (req, res) => {
  handleLogRequest(req, res);
});

function handleLogRequest(req, res) {
  try {
    const logsContent = fs.readFileSync(logFilePath, 'utf-8');
    const lines = logsContent.split('\n');
    const validLogs = lines.filter((line) =>
      /^(\S+) - \[.+\] "((GET|POST|HEAD|PUT|DELETE|OPTIONS|PATCH) .+ HTTP\/1\.\d)" \d{3} \d+ .+$/.test(line)
    );
    res.set('Cache-Control', 'no-store'); // 禁用缓存
    res.json({ logs: validLogs });
  } catch (error) {
    console.error('Error reading log file:', error);
    res.status(500).json({ error: 'Failed to process logs' });
  }
}


// 提供静态文件支持，使得可以直接访问到前端 HTML/CSS/JS
app.use(express.static(path.join(__dirname, 'public')));

// 启动服务器
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
