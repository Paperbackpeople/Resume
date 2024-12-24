<template>
  <section class="skills-section">
    <h2 class="section-title">专业技能</h2>
    <div class="skills-container">
      <div class="skills-overview" @click="toggleDetails">
        <ul>
          <li v-for="(skill, index) in skills" :key="index" class="skill-overview-item">
            <strong>{{ skill.category }}</strong>: {{ skill.brief }}
          </li>
        </ul>
      </div>
      <div v-if="showDetails" class="skills-details">
        <h3>技能详情</h3>
        <div v-for="(skill, index) in skills" :key="index" class="skill-detail">
          <h4>{{ skill.category }}</h4>
          <ul>
            <li v-for="(detail, detailIndex) in skill.details" :key="detailIndex">
              {{ detail }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'SkillsSection',
  data() {
    return {
      skills: [
        {
          category: '编程语言',
          brief: 'Java（熟练）、Python（熟练）、C（掌握）、MATLAB、SQL、HTML、Pandas',
          details: ['Java核心开发', 'Python数据处理', 'C语言应用', 'MATLAB建模', '数据库操作', '数据处理与分析'],
        },
        {
          category: 'Web开发',
          brief: 'Springboot、Redis、Vue.js、React、Flask',
          details: ['后端服务开发', '前端界面构建', '缓存优化', 'API设计与开发'],
        },
        {
          category: '框架与库',
          brief: 'TensorFlow、PyTorch、MyBatis、GAMS、Transformer Models、LLM',
          details: ['深度学习模型开发', '自然语言处理', '数据库框架应用', '优化建模'],
        },
        {
          category: '数据库',
          brief: 'MySQL、PostgreSQL、MongoDB、Citus（PostgreSQL集群）',
          details: ['数据库设计', '高效查询', '分布式数据库管理'],
        },
        {
          category: 'DevOps与云计算',
          brief: 'Docker、Kubernetes (k8s)、AWS、Ali Cloud',
          details: ['容器化部署', '云服务管理', 'Kubernetes集群配置'],
        },
        {
          category: '其他工具',
          brief: 'Git、Linux、Anaconda、Microsoft Office',
          details: ['版本控制', '操作系统管理', '科学计算与开发环境', '办公工具应用'],
        },
      ],
      showDetails: false,
    };
  },
};
</script>

<style scoped>
.skills-section {
  margin-bottom: 30px;
}

.section-title {
  font-size: 24px;
  margin-bottom: 20px;
  color: #2e5b87;
}

.skills-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  padding: 15px;
  border-radius: 8px;
  transition: all 0.3s ease;
  border: 1px solid #ccc;
  cursor: pointer;
}

.skills-container:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.skills-overview {
  margin-bottom: 20px;
}

.skill-overview-item {
  margin: 10px 0;
  color: #666;
}

.skills-details {
  margin-top: 20px;
}

.skill-detail {
  margin-bottom: 20px;
}

.skill-detail h4 {
  margin: 10px 0;
  color: #2e5b87;
}

ul {
  padding-left: 20px;
}

li {
  margin: 5px 0;
}
</style>
