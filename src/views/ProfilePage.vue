
<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()

const { userData } = storeToRefs(userStore)
</script>
<template>
  <div class="cont d-flex flex-column justify-center align-center pa-4">
    <h1>Profile Page</h1>
    <div class="w-100 d-flex flex-column justify-centr">
      <span>{{ userData.userName }}</span>
      <span>{{ userData.email }}</span>
    </div>
  </div>
</template>

<style lang="css" scoped>
.cont {
  height: 100%;
  /* margin-top: 100px; */
}
</style>