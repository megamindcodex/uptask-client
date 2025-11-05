
<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()

const { userData } = userStore
</script>
<template>
  <div class="cont">
    <h1>Profile Page</h1>
    <div>{{ userData }}</div>
  </div>
</template>

<style lang="css" scoped>
.cont {
  margin-top: 100px;
}
</style>