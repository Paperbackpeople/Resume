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
      <h3>技术栈</h3>
      <ul>
        <li v-for="(tech, index) in technologies" :key="index">{{ tech }}</li>
      </ul>
      <h3>项目详情</h3>
      <ul>
        <li v-for="(detail, index) in details" :key="index">{{ detail }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectOne',
  data() {
    return {
      name: '中国食品配送系统 (Chinese Food Delivery System)',
      brief: '简短描述',
      description: '这是一个基于 Vue 和 Spring Boot 开发的中国食品配送系统。',
      technologies: ['Vue.js', 'Webpack', 'ES6', 'Spring Boot', 'MySQL', 'Redis', 'Nginx', 'Docker'],
      video: 'lv3.mp4',
      details: [
        '后端开发：使用 Spring Boot 开发 RESTful APIs，根据项目需求设计数据库模式，并结合 MyBatis 实现数据持久化。通过 Redis 缓存提高性能。',
        '前端开发：使用 Vue 3 构建用户界面，通过 Vuex 管理资源和令牌存储，实现状态管理。',
        '安全性：配置过滤器确保请求安全，防止未经授权的访问。',
        '性能优化：利用 Nginx 进行缓存、负载均衡和反向代理，提升系统响应时间。',
        '容器化：通过 Docker 部署应用，简化环境配置和部署流程。'
      ]
    }
  }
}
</script>

<style scoped>
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
</style>