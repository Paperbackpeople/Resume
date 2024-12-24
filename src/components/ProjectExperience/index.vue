<template>
  <section class="project-experience-section">
    <h2 class="section-title">项目经验</h2>
    <div class="project-list">
      <div 
        v-for="(project, index) in projects" 
        :key="index" 
        class="project-item"
        :class="{ 'disabled': !project.clickable }"
        @click="project.clickable && openProject(index)">
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
          component: 'ProjectOne',
          clickable: true,
        },
        {
          name: '分布式寻宝游戏',
          brief: '一个无中心化的分布式寻宝游戏，利用Java RMI实现去中心化注册表，并通过选举机制动态确定主服务器和备份服务器，提供容错和高可用性。',
          time: '2024.09-2024.11',
          component: 'ProjectTwo',
          clickable: true,
        },
        {
          name: '自动微分在机器学习中的评估',
          brief: '使用MATLAB和PyTorch实现GAN的梯度计算，比较自动微分、手动微分和数值微分的效率与生成效果。',
          time: '2022.10-2023.04',
          component: 'ProjectThree',
          clickable: false,
        },
        {
          name: 'MIT交换生项目：计算机视觉方向',
          brief: '掌握计算机视觉和机器学习概念，使用ResNet50进行迁移学习，实现真实鞋子图像与草图的匹配。',
          time: '2022.01-2022.02',
          component: 'ProjectFour',
          clickable: false,
        },
        {
          name: '基于行人重识别的3D数据增强方法研究',
          brief: '使用SMPL模型将2D人像转换为3D，通过GAN评估3D参数的真实性，并结合3D姿态变换解决数据不足问题。',
          time: '2021.05-2022.05',
          component: 'ProjectFive',
          clickable: false,
        },
        {
          name: '智能家居管理系统',
          brief: '开发RESTful风格的家具管理系统，使用MyBatis和MySQL提高数据查询效率，并基于Vue.js构建用户界面。',
          time: '2021.07-2021.11',
          component: 'ProjectSix',  
          clickable: false,
        },
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