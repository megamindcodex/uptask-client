<script setup>
import { ref } from 'vue'

// props can also be assing to a variable incase it is meant to be used in the script or computed. like the mothod right below
// defindProps(["goals"])

const props = defineProps(['goal'])
</script>

<template>
  <v-card class="card" variant="outlined">
    <v-card-title>{{ props.goal.title }}</v-card-title>
    <v-card-subtitle>{{ props.goal.description }}</v-card-subtitle>
    <v-card-text>{{ props.goal.completed }}</v-card-text>
  </v-card>
</template>

<style lang="css" scoped>
.card {
  border-radius: 0;
  /* border: 1px solid #2f4858; */
  /* width: 100%; */
  /* display: flex; */
  /* gap: 0.5rem; */
  /* flex-direction: column; */
  /* justify-content: center; */
  /* border: 1px solid red; */
  /* padding: 1rem; */
}

.card:hover {
  color: #2f4858;
  border: 1px solid #2f4858;
}

span {
  font-size: 1rem;
  color: rgb(40, 39, 39);
  cursor: pointer;
}
</style>
