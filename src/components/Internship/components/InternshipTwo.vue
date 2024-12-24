<template>
  <div class="internship-detail">
    <h2>Dolby (北京)</h2>
    <div class="time-location">
      <span>2023.07-2024.01</span>
      <span>北京</span>
    </div>
    
    <div class="content">
      <h3>工作内容</h3>
      <ul>
        <li>参与 personal head-related-transfer-function（pHRTF）项目，负责耳部数据集的本地化采集及耳部检测网络的设计。</li>
        <li>利用 CycleGAN 对耳部数据进行增强，包括耳戴耳机和耳饰的多种情况，提升训练数据多样性。</li>
        <li>部署 Stable Diffusion WebUI 于 Linux，实验生成式 AI 内容，扩展数据集，最终提升准确率 4%。</li>
        <li>开发脚本测试 pHRTF APK，评估耳部检测网络在不同设备上的鲁棒性，并生成可视化报告。</li>
        <li>创建基于 Flask、Vue 和 MySQL 的数据库管理系统，支持数据统计与下载，加速团队开发所需数据的获取。</li>
      </ul>
      <p class="conclusion-text">数据增强的示例：</p>
      <!-- 在此处添加图片 -->
      <img src="https://www.wangzhaoyu.com/videos/dolby.jpg" alt="数据监控示例视频截图" class="example-image">
      <!-- 图片添加结束 -->
      <h3>技术栈</h3>
      <ul>
        <li>Python</li>
        <li>CycleGAN、Stable Diffusion</li>
        <li>Flask、Vue、MySQL</li>
        <li>Linux</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InternshipTwo',
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

.conclusion-text {
  font-weight: 500;
  font-size: 1.1rem;
  padding: 15px;
  background-color: #f8f9fa;
  border-left: 4px solid #42b983;
  border-radius: 4px;
  margin: 1.5em 0;
}

.example-image {
  width: 100%;
  height: auto;
  object-fit: cover;
  border: 1px solid #ddd;
  border-radius: 4px;
  display: block;
  margin: 10px auto;
}
</style>
