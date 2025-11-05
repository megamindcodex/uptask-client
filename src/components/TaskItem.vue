
<script setup>
import { ref, reactive } from 'vue'

const task = reactive([
  {
    content: 'brush my teeth',
    checked: false,
  },
])
</script>

<template>
  <div v-if="!task.length" class="cont"></div>
  <div v-else class="task">
    <span>{{ task.content }}</span>
    <span>{{ task.checked }}</span>
  </div>
</template>


<style lang="css" scoped>
.task {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: center;
}
</style>