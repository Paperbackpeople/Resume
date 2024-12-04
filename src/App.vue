<template>
  <div class="container" :class="{ 'show-detail': showDetail }">
    <div class="resume-container">
      <div class="resume" :class="{ 'shifted': showDetail }">
        <h1>个人简历</h1>
        <PersonalInfo />
        
        <div class="section">
          <h2>项目经验</h2>
          <div class="project-list">
            <div v-for="(project, index) in projects" 
                 :key="index" 
                 class="project-item"
                 @click="showProjectDetail(index)">
              <h3>{{ project.name }}</h3>
              <p>{{ project.brief }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <transition name="slide">
      <div v-if="showDetail" class="detail-panel">
        <button class="close-btn" @click="closeDetail">返回总览</button>
        <div class="detail-content">
          <h2>{{ currentProject.name }}</h2>
          <div class="detail-info">
            <p>{{ currentProject.description }}</p>
            
            <div class="video-container">
              <video 
                v-if="currentProject.video" 
                controls 
                class="project-video">
                <source :src="currentProject.video" type="video/mp4">
                您的浏览器不支持视频播放。
              </video>
            </div>

            <h3>技术栈</h3>
            <ul>
              <li v-for="(tech, index) in currentProject.technologies" 
                  :key="index">{{ tech }}</li>
            </ul>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import PersonalInfo from './components/PersonalInfo/index.vue';

export default {
  name: 'App',
  components: {
    PersonalInfo
  },
  data() {
    return {
      showDetail: false,
      currentProject: null,
      projects: [
        {
          name: '项目一',
          brief: '简短描述',
          description: '详细描述...',
          technologies: ['Vue.js', 'Webpack', 'ES6'],
          video: '/path/to/your/video.mp4'
        },
        // 添加更多项目...
        {
          name: '项目二',
          brief: '简短描述',
          description: '详细描述...',
          technologies: ['Vue.js', 'Webpack', 'ES6'],
          video: '/path/to/your/video.mp4'
        },
        {
          name: '项目三',
          brief: '简短描述',
          description: '详细描述...',
          technologies: ['Vue.js', 'Webpack', 'ES6'],
          video: '/path/to/your/video.mp4'
        }
      ]
    }
  },
  methods: {
    showProjectDetail(index) {
      this.currentProject = this.projects[index]
      this.showDetail = true
    },
    closeDetail() {
      this.showDetail = false
    }
  }
}
</script>

<style>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  position: relative;
  min-height: 100vh;
}

.resume-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  padding: 20px;
  overflow-y: auto;
  background: #fff;
}

.resume {
  transition: all 0.5s ease;
  max-width: 800px;
  margin: 0 auto;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0,0,0,0.1);

  h1 {
    text-align: center;
    vertical-align: middle;
  }
}

.resume.shifted {
  transform: translateX(-30%);
  max-width: 40%;
}

.project-item {
  padding: 15px;
  margin: 10px 0;
  border: 1px solid #eee;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.project-item:hover {
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
  transform: translateY(-2px);
}

.detail-panel {
  position: fixed;
  right: 0;
  top: 0;
  width: 50%;
  height: 100vh;
  background: #fff;
  padding: 20px;
  box-shadow: -2px 0 10px rgba(0,0,0,0.1);
  overflow-y: auto;
}

.slide-enter-active, .slide-leave-active {
  transition: transform 0.5s ease;
}

.slide-enter-from, .slide-leave-to {
  transform: translateX(100%);
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

.section {
  margin-bottom: 30px;
}

h1, h2, h3 {
  color: #2c3e50;
}

.detail-content {
  padding: 40px 20px;
}

.video-container {
  margin: 20px 0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.project-video {
  width: 100%;
  max-width: 100%;
  display: block;
}

/* 优化滚动条样式 */
.resume-container::-webkit-scrollbar,
.detail-panel::-webkit-scrollbar {
  width: 6px;
}

.resume-container::-webkit-scrollbar-thumb,
.detail-panel::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 3px;
}

.resume-container::-webkit-scrollbar-track,
.detail-panel::-webkit-scrollbar-track {
  background: #f1f1f1;
}
</style>
