<template>
    <section class="project-experience-section">
      <h2 class="section-title">项目经验</h2>
      <div class="project-list">
        <div 
          v-for="(project, index) in projects" 
          :key="index" 
          class="project-item"
          @click="openProject(index)">
          <div class="project-header">
            <h3>{{ project.name }}</h3>
            <span class="project-time" v-if="project.time">{{ project.time }}</span>
          </div>
          <p class="brief">{{ project.brief }}</p>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    name: 'ProjectExperience',
    data() {
      return {
        projects: [
          {
            name: '中国食品配送系统',
            brief: '一个基于Vue和Spring Boot的食品配送系统，实现了用户注册、登录、食品浏览、购物车、订单管理等功能。',
            time: '2024.05-2024.09',
            component: 'ProjectOne'
          },
          {
            name: '分布式寻宝游戏',
            brief: '一个无中心化的分布式寻宝游戏，利用Java RMI实现去中心化注册表，并通过选举机制动态确定主服务器和备份服务器，提供容错和高可用性。',
            time: '2024.09-2024.11',
            component: 'ProjectTwo'
          },
          {
            name: '项目三',
            brief: '简短描述',
            component: 'ProjectThree'
          }
        ]
      }
    },
    methods: {
      openProject(index) {
        const selectedProject = this.projects[index];
        this.$emit('open-project-detail', selectedProject);
      }
    }
  }
  </script>
  
  <style scoped>
  .project-experience-section {
    margin-bottom: 30px;
  }
  .project-experience-section h2 {
    color: #2e5b87;
    }
  .section-title {
    font-size: 24px;
    margin-bottom: 20px;
  }
  
  .project-item {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    padding: 15px;
    border-radius: 8px;
    transition: all 0.3s ease;
    border: 1px solid #ccc;
    cursor: pointer;
  }
  
  .project-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  .brief {
    margin: 5px 0;
    color: #666;
  }
  
  .project-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }
  
  .project-time {
    color: #666;
    font-size: 18px;
    font-weight: bold;
    text-align: right;
  }
  </style>