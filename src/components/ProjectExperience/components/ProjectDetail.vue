<template>
  <div class="detail-panel">
    <button class="close-btn" @click="$emit('close')">返回总览</button>
    <div class="detail-content">
      <h2>{{ project.name }}</h2>
      <div class="detail-info">
        <p>{{ project.description }}</p>
        
        <div class="video-container">
          <video v-if="project.video" controls class="project-video">
            <source :src="project.video" type="video/mp4">
            您的浏览器不支持视频播放。
          </video>
        </div>

        <h3>技术栈</h3>
        <ul>
          <li v-for="(tech, index) in project.technologies" 
              :key="index">{{ tech }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectDetail',
  props: {
    project: {
      type: Object,
      required: true
    }
  }
}
</script> 