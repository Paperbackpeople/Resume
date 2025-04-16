// server.js
const express = require('express');
const fs = require('fs');
const readline = require('readline');
const path = require('path');
const cors = require('cors');
const fetch = require('node-fetch');

// ====== 新增：引入 node-ip2region ======
const { Ip2Region } = require('node-ip2region');

const app = express();
const port = 3000;

// 日志文件路径
const logFilePath = '/opt/nginx_logs/https_access.log';

// ====== 新增：全局搜索器对象 ======
// 使用全文件缓存（loadContentFromFile）方式
let ip2regionSearcher;

function initIp2RegionSearcher() {
  // 创建一个 ip2region 实例
  ip2regionSearcher = new Ip2Region();

  // 在这里加载 /root/ip2region.xdb 到内存
  // （确保 /root/ip2region.xdb 路径存在、可读）
  ip2regionSearcher.loadContentFromFile('/root/ip2region.xdb');
}

// 在服务器启动时初始化一次
initIp2RegionSearcher();

// 中间件
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// ========== 修改 /geo/:ip 路由 ==========
app.get('/geo/:ip', async (req, res) => {
  const ip = req.params.ip.trim();

  try {
    // 1) 先用 ip2region 查询
    let regionInfo = ip2regionSearcher.search(ip);
    // node-ip2region 的返回值通常是：
    // {
    //   country: '中国',
    //   region: '华南',
    //   province: '广东省',
    //   city: '广州市',
    //   isp: '电信'
    // }
    // 若查不到则可能返回 null 或空对象（视版本/库实现而定）
    if (regionInfo && regionInfo.country && regionInfo.country !== '0') {
      // 构造与 ip-api.com 类似的返回字段
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

    // 2) 若 ip2region 没查到或返回值无效，则回退到 ip-api.com
    const geoResponse = await fetch(`http://ip-api.com/json/${ip}`);
    const geoJson = await geoResponse.json();
    return res.json(geoJson);

  } catch (error) {
    console.error('Error querying ip2region or fallback:', error);
    // 3) 出现任何异常就回退到 ip-api.com
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

// 获取最新 N 条日志
app.get('/log', async (req, res) => {
  try {
    const logs = await getLatestLogs(logFilePath, 500);
    res.set('Cache-Control', 'no-store'); // 禁用缓存
    res.json({ logs });
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
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    // 匹配有效的 HTTP 日志行
    if (/^(\S+) - \[.+\] "((GET|POST|HEAD|PUT|DELETE|OPTIONS|PATCH) .+ HTTP\/1\.\d)" (?!4\d{2})\d{3} \d+ .+$/.test(line)) {
      logs.push(line);
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