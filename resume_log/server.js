const express = require('express');
const fs = require('fs');
const readline = require('readline');
const path = require('path');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const port = 3000;

// 日志文件路径
const logFilePath = '/opt/nginx_logs/https_access.log';

// 中间件
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// 获取 IP 地理信息
app.get('/geo/:ip', async (req, res) => {
  const ip = req.params.ip;
  try {
    const geoResponse = await fetch(`http://ip-api.com/json/${ip}`);
    const geoJson = await geoResponse.json();
    res.json(geoJson); // 返回地理信息
  } catch (error) {
    console.error('Error fetching geo location:', error);
    res.status(500).json({ error: 'Failed to fetch geo location' });
  }
});

// 获取最新 100 条日志
app.get('/log', async (req, res) => {
  try {
    const logs = await getLatestLogs(logFilePath, 100); // 获取最新的 100 条日志
    res.set('Cache-Control', 'no-store'); // 禁用缓存
    res.json({ logs }); // 返回日志
  } catch (error) {
    console.error('Error processing logs:', error);
    res.status(500).json({ error: 'Failed to process logs' });
  }
});

// 流式读取日志并获取最新 N 条
async function getLatestLogs(filePath, maxLogs) {
  const logs = [];
  const fileStream = fs.createReadStream(filePath, { encoding: 'utf-8' });

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity, // 处理不同平台的换行符
  });

  for await (const line of rl) {
    // 匹配有效的 HTTP 日志行
    if (/^(\S+) - \[.+\] "((GET|POST|HEAD|PUT|DELETE|OPTIONS|PATCH) .+ HTTP\/1\.\d)" (?!4\d{2})\d{3} \d+ .+$/.test(line)) {
      logs.push(line);

      // 保持 logs 长度为 maxLogs，移除最旧的
      if (logs.length > maxLogs) {
        logs.shift();
      }
    }    
  }

  return logs;
}

// 启动服务器
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});