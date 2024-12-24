<template>
  <div>
    <h2>{{ name }}</h2>
    <div class="detail-info">
      <p>{{ description }}</p>
      <div class="video-container">
        <video 
          v-if="video" 
          controls 
          class="project-video">
          <source :src="video" type="video/mp4">
          您的浏览器不支持视频播放。
        </video>
      </div>
      <h3>项目详情</h3>
      <ul>
        <li v-for="(detail, index) in details" :key="index">
          <span class="detail-title">{{ getDetailTitle(detail)}}：</span>
          {{ getDetailContent(detail)}}
        </li>
      </ul>
      <h3>技术栈</h3>
      <ul>
        <li v-for="(tech, index) in technologies" :key="index">{{ tech }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectOne',
  data() {
    return {
      name: '中国食品配送系统',
      brief: '一个基于 Vue.js 和 Spring Boot 的食品配送平台。',
      description: '中国食品配送系统是一个全栈应用，结合现代前端和高性能后端，旨在优化食品配送操作，提供安全稳定的系统性能。',
      technologies: ['Vue 3', 'Spring Boot', 'MySQL', 'Redis', 'MyBatis', 'RabbitMQ', 'Nginx', 'Docker', 'Docker-Compose', 'AWS'],
      video: 'https://www.wangzhaoyu.com/videos/deliver.mp4',
      details: [
        '后端开发：使用 Spring Boot 构建 RESTful APIs，基于项目需求设计数据库模式，结合 MyBatis 实现数据持久化。使用 Redis 进行缓存，确保高性能数据访问，并通过 Redis 保证订单插入的唯一性。 使用 RabbitMQ 进行消息队列，确保高峰期订单插入的稳定性。',
        '前端开发：使用 Vue 3 构建用户界面，结合 Vue Router 实现前端页面的高效路由跳转，使用 Vuex 进行资源和令牌存储管理，并通过 Local Storage 保持用户状态的持久化。',
        '安全性：使用 JWT Token 实现用户登录认证，配置过滤器确保请求安全，防止未授权访问。',
        '性能优化：通过 Nginx 实现缓存、负载均衡和反向代理，优化系统响应时间，提升系统稳定性。',
        '容器化部署：使用 Docker 容器化后端与前端应用，结合 Docker-Compose 管理多容器部署，简化开发与部署流程。最终部署到 AWS 云服务，确保系统高可用性和可扩展性。'
      ]
    }
  },
  methods: {
    getDetailTitle(detail) {
      return detail.split('：')[0];
    },
    getDetailContent(detail) {
      return detail.split('：')[1];
    }
  }
}
</script>

<style>
.detail-info {
  margin-top: 20px;
}

ul {
  margin-top: 10px;
  list-style-type: disc;
  padding-left: 20px;
}

h3 {
  margin-top: 20px;
  color: #2c3e50;
}

.detail-title {
  font-weight: bold;
  color: #2c3e50;
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

</style>