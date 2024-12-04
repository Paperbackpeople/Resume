<template>
  <div class="project-item" @click="$emit('click')">
    <h3>{{ project.name }}</h3>
    <p>{{ project.brief }}</p>
  </div>
</template>

<script>
export default {
  name: 'ProjectItem',
  props: {
    project: {
      type: Object,
      required: true
    }
  }
}
</script> 