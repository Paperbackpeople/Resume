<template>
  <div class="internship-detail">
    <h2>Level 3 AI (Singapore)</h2>
    <div class="time-location">
    </div>
    
    <div class="content">
      <h3>工作内容</h3>
      <ul>
        <li>为 GetGo 和 Webuy 开发 AI 聊天机器人，将客户满意度保持在 90%以上，并将拦截率从 39% 提升至 55%。</li>
        <li>优化 Webuy 的房间报价算法，显著提升报价效率和准确性。</li>
        <li>构建公共演示数据库，通过 API 集成和网页爬取获取数据，并基于大语言模型开发 AI 驱动的预订助手。</li>
        <li>为两家公司搭建早期数据监控看板，利用 Docker、Kubernetes、AWS 和 PostgreSQL 完成部署，确保系统可靠性和扩展性；后续通过 Metabase 制作标准化指标监控看板。</li>
        <li>使用 Prefect 构建自动化数据处理流水线，从生产环境无缝获取数据，并结合分析模块生成综合报告。</li>
      </ul>
      <p class="conclusion-text">关于数据监控的示例视频：</p>
      <div class="video-container">
        <video 
          v-if="video" 
          controls 
          class="project-video">
          <source src="https://www.wangzhaoyu.com/videos/lv3.mp4" type="video/mp4">
          您的浏览器不支持视频播放。
        </video>
      </div>

      <h3>技术栈</h3>
      <ul>
        <li>Python</li>
        <li>Metabase</li>
        <li>Docker、Kubernetes</li>
        <li>AWS、PostgreSQL</li>
        <li>Dify、大语言模型 (LLMs)</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InternshipOne',
  data() {
    return {
      video: true, // 控制是否显示视频
    };
  },
};
</script>

<style scoped>
.internship-detail {
  padding: 20px;
}

.time-location {
  color: #666;
  margin: 10px 0 20px;
}

.time-location span {
  margin-right: 20px;
}

.content {
  margin-top: 20px;
}

h3 {
  color: #2e5b87;
  margin: 20px 0 10px;
}

ul {
  list-style-type: disc;
  padding-left: 20px;
}

li {
  margin: 8px 0;
  color: #333;
}

.video-container {
  width: 100%; /* 父容器宽度占 80% */
  max-width: 1000px; /* 最大宽度 */
  max-height: 500px; /* 最大高度 */
  margin: 20px auto; /* 上下 20px 间距，水平居中 */
  border-radius: 8px; /* 圆角 */
  overflow: hidden; /* 隐藏超出部分 */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* 添加阴影 */
}

.project-video {
  width: 100%; /* 填满父容器 */
  height: auto; /* 高度自动适配 */
  max-height: 400px; /* 最大高度限制 */
  object-fit: contain; /* 保持完整内容显示 */
  display: block; /* 独占一行 */
}

.conclusion-text {
    font-weight: 500;
    font-size: 1.1rem;
    padding: 15px;
    background-color: #f8f9fa;
    border-left: 4px solid #42b983;
    border-radius: 4px;
    margin: 1.5em 0;
  }
</style>