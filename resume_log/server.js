const express = require('express');
const fs = require('fs');
const readline = require('readline');
const path = require('path');
const cors = require('cors');
const fetch = require('node-fetch');
const { Ip2Region } = require('node-ip2region');

const app = express();
const port = 3000;
const logFilePath = '/opt/nginx_logs/https_access.log';

let ip2regionSearcher;

function initIp2RegionSearcher() {
  ip2regionSearcher = new Ip2Region();
  ip2regionSearcher.loadContentFromFile('/root/ip2region.xdb');
}

initIp2RegionSearcher();

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/geo/:ip', async (req, res) => {
  const ip = req.params.ip.trim();
  try {
    let regionInfo = ip2regionSearcher.search(ip);
    if (regionInfo && regionInfo.country && regionInfo.country !== '0') {
      return res.json({
        status: 'success',
        country: regionInfo.country || '未知',
        region: regionInfo.region || '',
        province: regionInfo.province || '',
        city: regionInfo.city || '',
        isp: regionInfo.isp || '',
        query: ip
      });
    }
    const geoResponse = await fetch(`http://ip-api.com/json/${ip}`);
    const geoJson = await geoResponse.json();
    return res.json(geoJson);
  } catch (error) {
    console.error('Error querying ip2region or fallback:', error);
    try {
      const geoResponse = await fetch(`http://ip-api.com/json/${ip}`);
      const geoJson = await geoResponse.json();
      return res.json(geoJson);
    } catch (fallbackErr) {
      console.error('Error fetching geo location:', fallbackErr);
      return res.status(500).json({ error: 'Failed to fetch geo location' });
    }
  }
});

app.get('/log', async (req, res) => {
  try {
    const logs = await getLatestLogs(logFilePath, 500);
    res.set('Cache-Control', 'no-store');
    res.json({ logs });
  } catch (error) {
    console.error('Error processing logs:', error);
    res.status(500).json({ error: 'Failed to process logs' });
  }
});

async function getLatestLogs(filePath, maxLogs) {
  const logs = [];
  const fileStream = fs.createReadStream(filePath, { encoding: 'utf-8' });
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  for await (const line of rl) {
    if (/^(\S+) - \[.+\] "((GET|POST|HEAD|PUT|DELETE|OPTIONS|PATCH) .+ HTTP\/1\.\d)" (?!4\d{2})\d{3} \d+ .+$/.test(line)) {
      logs.push(line);
      if (logs.length > maxLogs) {
        logs.shift();
      }
    }
  }
  return logs;
}

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});