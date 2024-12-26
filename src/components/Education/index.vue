<template>
    <section class="education-section">
      <h2 class="section-title">{{ $t('education') }}</h2>
      <div class="education-list">
        <div 
          v-for="(edu, index) in educationList" 
          :key="index" 
          class="education-item"
          @click="openDetailPanel(index)"> 
          <div class="edu-period">{{ edu.period }}</div>
          <div class="edu-content">
            <h3 class="school-name">{{ edu.school }}</h3>
            <p class="major">{{ $t('major') }}: {{ edu.major }}</p>
            <p class="degree">{{ $t('degree') }}: {{ edu.degree }}</p>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    name: 'EducationSection',
    data() {
      return {
        educationList: [
          {
            period: '2023-2025',
            school: '新加坡国立大学',
            major: '计算机科学与技术',
            degree: '计算机硕士',
            component: 'Nus'
          },
          {
            period: '2019-2023',
            school: '北京邮电大学',
            major: '电子商务及法律',
            degree: '管理学学士 + 工学学士',
            component: 'Bupt'
          }
        ]
      }
    },
    methods: {
      openDetailPanel(index) {
        const selectedSchool = this.educationList[index];
        this.$emit('open-education-detail', selectedSchool);
      }
    }
  }
  </script>
  
  <style scoped>
  .education-section {
    margin-bottom: 30px;
  }
  .section-title {
    font-size: 24px;
    margin-bottom: 20px;
  }
  .education-section h2 {
    color: #2e5b87;
    }
  
  .education-item {
    display: flex;
    margin-bottom: 20px;
    padding: 15px;
    border-radius: 8px;
    background-color: #f5f5f5;
    transition: all 0.3s ease;
  }
  
  .education-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  .edu-period {
    min-width: 120px;
    font-weight: bold;
  }
  
  .edu-content {
    flex: 1;
  }
  
  .school-name {
    font-size: 18px;
    margin: 0 0 10px 0;
  }
  
  .major, .degree {
    margin: 5px 0;
    color: #666;
  }
  </style>