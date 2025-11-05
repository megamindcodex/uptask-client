<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { allGoals } from '@/constant/testState'
import GoalCard from '@/components/GoalCard.vue'

const router = useRouter()

const navigateTo = (path) => {
  console.log(path)
  router.push(path)
}
</script>


<template>
  <div id="cont">
    <GoalCard
      v-for="goal in allGoals"
      :key="goal.id"
      :goal="goal"
      @click="navigateTo(`/goals/${goal.id}`)"
    />
  </div>
</template>


<style lang="css" scoped>
#cont {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 3px;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
}
</style>