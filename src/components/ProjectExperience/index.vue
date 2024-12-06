<template>
    <section class="project-experience-section">
      <h2 class="section-title">项目经验</h2>
      <div class="project-list">
        <div 
          v-for="(project, index) in projects" 
          :key="index" 
          class="project-item"
          @click="openProject(index)">
          <h3>{{ project.name }}</h3>
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
            name: '项目一',
            brief: '简短描述',
            component: 'ProjectOne'
          },
          {
            name: '项目二',
            brief: '简短描述',
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
  </style>