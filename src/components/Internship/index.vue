<template>
  <section class="internship-section">
    <h2 class="section-title">实习经历</h2>
    <div class="internship-list">
      <div
        v-for="(internship, index) in internships"
        :key="index"
        class="internship-item"
        :class="{ 'clickable': internship.clickable }"
        v-on="internship.clickable ? { click: () => openInternship(index) } : {}"
      >
        <div class="internship-header">
          <h3>
            <template v-if="internship.link">
              <a
                :href="internship.link"
                target="_blank"
                rel="noopener noreferrer"
                class="internship-link"
              >
                {{ internship.name }}
              </a>
            </template>
            <template v-else>
              {{ internship.name }}
            </template>
          </h3>
          <span class="internship-time" v-if="internship.time">{{ internship.time }}</span>
        </div>
        <p class="brief">{{ internship.brief }}</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'InternshipExperience',
  data() {
    return {
      internships: [
        {
          name: 'Level 3 AI, Singapore',
          brief:
            '为多家公司开发AI客服，设计并构建聊天所需的数据库，深度参与项目中相关算法和流程的开发工作。',
          time: '2024.09-至今',
          component: 'InternshipOne',
          link: 'https://www.lv3.ai',
          clickable: true,
        },
        {
          name: 'Dolby, Beijing',
          brief: '参与pHRTF项目，完成耳部数据集采集、网络设计和数据分析。',
          time: '2023.07-2024.01',
          component: 'InternshipTwo',
          clickable: true,
        },
        {
          name: '北京 ZX-CE 科技有限公司',
          brief: '设计咖啡店微信小程序用户界面，并参与搜索引擎优化分析。',
          time: '2022.08-2022.09',
          component: 'InternshipThree',
          clickable: false,
        },
        {
          name: '模式识别与智能系统实验室 (北京)',
          brief: '参与跨模态行人重识别方法研究，完成数据预处理和模型可视化。',
          time: '2022.02-2022.06',
          component: 'InternshipFour',
          clickable: false,
        },
      ],
    };
  },
  methods: {
    openInternship(index) {
      const selectedInternship = this.internships[index];
      this.$emit('open-internship-detail', selectedInternship);
    },
  },
};
</script>

<style scoped>
.internship-item {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  padding: 15px;
  border-radius: 8px;
  transition: all 0.3s ease;
  border: 1px solid #ccc;
  background-color: white; /* 统一背景色 */
  cursor: pointer; /* 鼠标指针默认设为可点击 */
}

.internship-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* 悬浮效果 */
}

/* 链接样式 */
.internship-link {
  color: #2e5b87;
  text-decoration: none;
  font-weight: bold;
}

.internship-link:hover {
  text-decoration: underline;
}

/* 禁用状态的样式（仅改变鼠标指针，不影响悬浮效果） */
.internship-item:not(.clickable) {
  cursor: not-allowed;
}

/* 其他样式 */
.brief {
  margin: 5px 0;
  color: #666;
}

.internship-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.internship-time {
  color: #666;
  font-size: 18px;
  font-weight: bold;
  text-align: right;
}

.section-title {
  font-size: 24px;
  margin-bottom: 20px;
}

</style>
