<template>
  <div class="detail-panel">
    <button class="close-btn" @click="$emit('close')">返回</button>
    <div class="detail-content">
      <h2>{{ schoolData.name }}</h2>
      <div class="detail-info">
        <p>{{ schoolData.description }}</p>
        <div class="video-container" v-if="schoolData.video">
          <video controls class="project-video">
            <source :src="schoolData.video" type="video/mp4">
            您的浏览器不支持视频播放。
          </video>
        </div>
        <h3>技术栈</h3>
        <ul>
          <li v-for="(tech, index) in schoolData.technologies" :key="index">{{ tech }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    schoolData: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.detail-panel {
  position: fixed;
  right: 0;
  top: 0;
  width: 50%;
  height: 100vh;
  background: #fff;
  padding: 20px;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  box-sizing: border-box;
  border: 1px solid #ccc;
}

.close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 8px 16px;
  border: none;
  background: #42b983;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

.detail-content {
  padding: 40px 20px;
}

.video-container {
  margin: 20px 0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.project-video {
  width: 100%;
  max-width: 100%;
  display: block;
}

h3 {
  margin: 20px 0 10px;
  color: #2c3e50;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 8px 0;
  padding: 5px 0;
  color: #666;
}
</style>