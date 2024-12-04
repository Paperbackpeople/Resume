<template>
  <div class="section">
    <h2>项目经验</h2>
    <div class="project-list">
      <ProjectItem
        v-for="(project, index) in projects"
        :key="index"
        :project="project"
        @click="$emit('show-detail', index)"
      />
    </div>
  </div>
</template>

<script>
import ProjectItem from './components/ProjectItem.vue'

export default {
  name: 'ProjectExperience',
  components: {
    ProjectItem
  },
  props: {
    projects: {
      type: Array,
      required: true
    }
  }
}
</script> 