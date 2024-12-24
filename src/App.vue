<template>
  <div class="container" :class="{ 'show-detail': showDetail }">
    <div class="resume-container">
      <div class="resume" :class="{ 'shifted': showDetail }">
        <h1>个人简历</h1>
        <PersonalInfo />
        <EducationSection @open-education-detail="handleEducationDetailOpen" />
        <ProjectExperience @open-project-detail="handleProjectDetailOpen" />
        <InternshipExperience @open-internship-detail="handleInternshipDetailOpen" />
        <SkillsSection @open-skill-detail="handleSkillDetailOpen" />
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

          <!-- 实习详情 -->
          <component v-else-if="currentInternship" :is="currentInternship.component" @close="handleDetailClose" />    

          <!-- 技能详情 -->
          <component v-else-if="currentSkill" :is="currentSkill.component" :skill-data="currentSkill" @close="handleDetailClose" />
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
import ProjectFour from './components/ProjectExperience/components/ProjectFour.vue'
import InternshipExperience from './components/Internship/index.vue'
import InternshipOne from './components/Internship/components/InternshipOne.vue'
import InternshipTwo from './components/Internship/components/InternshipTwo.vue'

// 在 script 部分添加导入
import SkillsSection from './components/Skills/index.vue'

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
    ProjectThree,
    ProjectFour,
    InternshipExperience,
    InternshipOne,
    InternshipTwo,
    SkillsSection,
  },
  data() {
    return {
      showDetail: false,
      currentProject: null,
      currentSchool: null,
      currentInternship: null,
      currentSkill: null,
    }
  },
  methods: {
    handleProjectDetailOpen(selectedProject) {
      if (this.showDetail) {
        this.handleDetailClose();
        this.$nextTick(() => {
          // 确保在关闭原有详情后再打开项目详情
          this.currentSchool = null;
          this.currentProject = selectedProject;
          this.showDetail = true;
        });
      } else {
        // 如果有详情在展示，直接打开项目详情
        this.currentSchool = null;
        this.currentProject = selectedProject;
        this.showDetail = true;
      }
    },

    handleInternshipDetailOpen(internship) {
      if (this.showDetail) {
        this.handleDetailClose();
        this.$nextTick(() => {
          this.currentProject = null;
          this.currentInternship = internship;
          this.showDetail = true;
        });
      } else {
        this.currentProject = null;
        this.currentInternship = internship;
        this.showDetail = true;
      } 
    },

    handleEducationDetailOpen(schoolData) {
      // 为BUPT准备详细数据
      if (schoolData.component === 'Bupt') {
        schoolData = {
          ...schoolData,
          name: '北京邮电大学（Queen Mary University of London 合作办学）',
          period: '2019.09-2023.06',
          major: '电子商务及法律',
          GPA : '3.7/4.0',
          honors: '一等荣誉学位',
          ranking: '前20%',
          modules: [
            '数据结构与算法',
            'Java高级编程',
            '数据库',
            '数字电路设计',
            '软件工程',
            '安全与认证',
            '网络协议',
            '信息与隐私保护法'
          ],
          scholarships: [
            { year: '2019-2020', award: '二等奖学金' },
            { year: '2020-2021', award: '二等奖学金' },
            { year: '2021-2022', award: '一等奖学金' }
          ]
        };
      }
      // 为NUS准备详细数据
      if (schoolData.component === 'Nus') {
        schoolData = {
          ...schoolData,
          name: '新加坡国立大学',
          period: '2024.01-2025.11',
          major: '计算机科学',
          GPA : '4.5/5.0',
          modules: [
            '神经网络和深度学习',
            '分布式系统',
            '分布式数据库',
            '软件工程与应用架构',
            '软件开发',
            '人工智能'
          ]
        };
      }

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

    handleSkillDetailOpen(skill) {
      if (this.showDetail) {
        this.handleDetailClose();
        this.$nextTick(() => {
          this.currentProject = null;
          this.currentSchool = null;
          this.currentInternship = null;
          this.currentSkill = skill;
          this.showDetail = true;
        });
      } else {
        this.currentProject = null;
        this.currentSchool = null;
        this.currentInternship = null;
        this.currentSkill = skill;
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
  padding: 10px 20px;
  border: none;
  background: linear-gradient(90deg, #42b983, #2e5b87);
  color: white;
  font-size: 16px;
  font-weight: bold;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.close-btn:hover {
  background: linear-gradient(90deg, #2e5b87, #42b983);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  transform: translateY(-2px);
}

.close-btn:active {
  transform: translateY(1px);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
}


.section {
  margin-bottom: 30px;
}

h1 {
  color: #2c3e50;
  text-align: center; 
}

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