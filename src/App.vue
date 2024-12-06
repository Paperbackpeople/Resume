<template>
  <div class="container" :class="{ 'show-detail': showDetail }">
    <div class="resume-container">
      <div class="resume" :class="{ 'shifted': showDetail }">
        <h1>个人简历</h1>
        <PersonalInfo />
        <EducationSection @open-education-detail="handleEducationDetailOpen" />

        <!-- 使用ProjectExperience组件，从中获得项目列表和事件 -->
        <ProjectExperience @open-project-detail="handleProjectDetailOpen" />
      </div>
    </div>

    <!-- 单一详情面板 -->
    <transition name="slide">
      <div v-if="showDetail" class="detail-panel">
        <button class="close-btn" @click="handleDetailClose">返回总览</button>
        <div class="detail-content">
          <!-- 教育详情 -->
          <component v-if="currentSchool" :is="currentSchool.component" :school-data="currentSchool"
            @close="handleDetailClose" />

          <!-- 项目详情 -->
          <component v-else-if="currentProject" :is="currentProject.component" @close="handleDetailClose" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import PersonalInfo from './components/PersonalInfo/index.vue';
import EducationSection from './components/Education/index.vue';
import Bupt from './components/Education/components/buptSection.vue';
import Nus from './components/Education/components/nusSection.vue';
import Mit from './components/Education/components/mitSection.vue';

// 引入刚才编写的ProjectExperience/index.vue
import ProjectExperience from './components/ProjectExperience/index.vue'
import ProjectOne from './components/ProjectExperience/components/ProjectOne.vue'
import ProjectTwo from './components/ProjectExperience/components/ProjectTwo.vue'
import ProjectThree from './components/ProjectExperience/components/ProjectThree.vue'

export default {
  name: 'App',
  components: {
    PersonalInfo,
    EducationSection,
    Bupt,
    Nus,
    Mit,
    ProjectExperience,
    ProjectOne,
    ProjectTwo,
    ProjectThree
  },
  data() {
    return {
      showDetail: false,
      currentProject: null,
      currentSchool: null
    }
  },
  methods: {
    handleProjectDetailOpen(selectedProject) {
      // 如果此时已有学历或项目详情显示，需要先关闭当前详情再打开新的
      if (this.showDetail) {
        this.handleDetailClose();
        this.$nextTick(() => {
          // 确保在关闭原有详情后再打开项目详情
          this.currentSchool = null;
          this.currentProject = selectedProject;
          this.showDetail = true;
        });
      } else {
        // 如果没有详情在展示，直接打开项目详情
        this.currentSchool = null;
        this.currentProject = selectedProject;
        this.showDetail = true;
      }
    },
    handleEducationDetailOpen(schoolData) {
      // 如果此时已有项目或学历详情显示，先关闭再打开
      if (this.showDetail) {
        this.handleDetailClose();
        this.$nextTick(() => {
          this.currentProject = null;
          this.currentSchool = schoolData;
          this.showDetail = true;
        });
      } else {
        this.currentProject = null;
        this.currentSchool = schoolData;
        this.showDetail = true;
      }
    },
    handleDetailClose() {
      this.showDetail = false;
      this.currentProject = null;
      this.currentSchool = null;
    }
  }
}
</script>

<style>
/* 样式保持不变 */
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
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

.resume.shifted {
  transform: translateX(-60%);
  max-width: 40%;
}

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

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s ease, opacity 0.5s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
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

h1,
h2,
h3 {
  color: #2c3e50;
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