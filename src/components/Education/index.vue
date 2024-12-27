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
  import { useI18n } from 'vue-i18n'
  import { ref, watch} from 'vue'
  
  export default {
    name: 'EducationSection',
    setup() {
    const { t, messages, locale } = useI18n()
    const educationList = ref(messages.value[locale.value].educationList)
    
    // 监听语言变化
    watch(locale, (newLocale) => {
      educationList.value = messages.value[newLocale].educationList
    })
  
    return {
      t,
      educationList
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