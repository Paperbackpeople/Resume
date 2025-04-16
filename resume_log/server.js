const express = require('express');
const fs = require('fs');
const readline = require('readline');
const path = require('path');
const cors = require('cors');
const fetch = require('node-fetch');
const { execFile } = require('child_process');

const app = express();
const port = 3000;
const logFilePath = '/opt/nginx_logs/https_access.log';

function queryIp2Region(ip) {
  return new Promise((resolve, reject) => {
    execFile('python3', ['ip2region.py', ip], { cwd: __dirname }, (error, stdout) => {
      if (error) {
        return reject(error);
      }
      const result = stdout.toString().trim();
      if (result === "error" || result === "") {
        return resolve(null);
      }
      resolve(result); // 可以是字符串，如“中国|0|广东|广州|电信”
    });
  });
}

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/geo/:ip', async (req, res) => {
  const ip = req.params.ip.trim();

  try {
    const regionStr = await queryIp2Region(ip);
    if (regionStr) {
      const parts = regionStr.split('|');
      return res.json({
        status: 'success',
        country: parts[0] || '未知',
        province: parts[2] || '',
        city: parts[3] || '',
        isp: parts[4] || '',
        query: ip
      });
    }

    const geoResponse = await fetch(`http://ip-api.com/json/${ip}`);
    const geoJson = await geoResponse.json();
    return res.json(geoJson);

  } catch (err) {
    console.error('fallback to ip-api due to error:', err);
    try {
      const geoResponse = await fetch(`http://ip-api.com/json/${ip}`);
      const geoJson = await geoResponse.json();
      return res.json(geoJson);
    } catch (finalErr) {
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
    res.status(500).json({ error: 'Failed to process logs' });
  }
});

async function getLatestLogs(filePath, maxLogs) {
  const logs = [];
  const fileStream = fs.createReadStream(filePath, { encoding: 'utf-8' });
  const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

  for await (const line of rl) {
    if (/^(\S+) - \[.+\] "((GET|POST).+HTTP\/1\.\d)" (?!4\d{2})\d{3} \d+ .+$/.test(line)) {
      logs.push(line);
      if (logs.length > maxLogs) logs.shift();
    }
  }
  return logs;
}

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});