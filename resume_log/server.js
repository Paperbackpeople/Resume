const express = require('express');
const fs = require('fs');
const readline = require('readline');
const path = require('path');
const cors = require('cors');
const fetch = require('node-fetch');
const Ip2Region = require('./ip2region/index');

const app = express();
const port = 3000;

const logFilePath = '/opt/nginx_logs/https_access.log';
const DB_PATH = '/root/ip2region.xdb';

// 初始化 ip2region searcher
let searcher;
try {
  const buffer = Ip2Region.loadContentFromFile(DB_PATH);
  searcher = Ip2Region.newWithBuffer(buffer);
  console.log('[INFO] ip2region loaded successfully');
} catch (err) {
  console.error('[ERROR] Failed to load ip2region:', err);
}

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// 查询 IP 地理位置
app.get('/geo/:ip', async (req, res) => {
  const ip = req.params.ip.trim();

  try {
    if (!searcher) throw new Error('ip2region not loaded');

    const data = await searcher.search(ip);
    const [country, , province, city, isp] = data.region.split('|');
    return res.json({
      status: 'success',
      country: country || '未知',
      province: province || '',
      city: city || '',
      isp: isp || '',
      query: ip
    });
  } catch (err) {
    console.error('ip2region 查询失败，fallback 到 ip-api:', err);
    try {
      const geoResponse = await fetch(`http://ip-api.com/json/${ip}`);
      const geoJson = await geoResponse.json();
      return res.json(geoJson);
    } catch (e) {
      return res.status(500).json({ error: 'Failed to fetch geo location' });
    }
  }
});

// 获取最新日志
app.get('/log', async (req, res) => {
  try {
    const logs = await getLatestLogs(logFilePath, 500);
    res.set('Cache-Control', 'no-store');
    res.json({ logs });
  } catch (err) {
    console.error('读取日志失败:', err);
    res.status(500).json({ error: 'Failed to read logs' });
  }
});

// 读取 N 条有效日志行
async function getLatestLogs(filePath, maxLogs) {
  const logs = [];
  const fileStream = fs.createReadStream(filePath, { encoding: 'utf-8' });

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  const temp = [];

  for await (const line of rl) {
    const match = line.match(/^(\S+) - \[.+\] "((GET|POST).+ HTTP\/1\.\d)" \d{3} \d+ "([^"]*)" ".*"$/);
    if (!match) continue;

    const requestLine = match[2];
    const referer = match[4];

    const isStaticResource = requestLine.includes('/css/') || requestLine.includes('/js/');
    const isGoogle = referer.toLowerCase().includes('google');
    const isDash = referer === '-';

    if (!isStaticResource && !isGoogle && !isDash) {
      temp.push(line);
    }
  }

  return temp.slice(-maxLogs);
}

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});