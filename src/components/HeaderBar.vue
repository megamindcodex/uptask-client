
<script setup>
import { ref } from 'vue'
import { useRoute } from 'vuetify/lib/composables/router'
import { useNavigatorStore } from '@/stores/navigator'
import { useTaskStore } from '@/stores/taskStore'

import MenuIcon from '@/assets/icons/MenuIcon.vue'
import PlusIcon from '@/assets/icons/PlusIcon.vue'

const taskStore = useTaskStore()
const { toggle_add_task_dialog } = useTaskStore()

const route = useRoute()

const { navigateTo } = useNavigatorStore()

defineEmits(['showCollectionDialog', 'toggleNav'])
</script>
<template>
  <v-app-bar scroll-behavior="" :elevation="0" class="w-100 pa-2" id="header" variant="compact">
    <div class="d-flex justify-space-between w-100">
      <div class="d-flex align-center ga-5">
        <MenuIcon @click="$emit('toggleNav')" class="menu-svg" />
        <v-app-bar-title id="logo" @click="navigateTo('/')">
          <span id="txt1" class="font-weight-bold">Up</span>
          <span id="txt2" class="font-weight-bold">Task</span>
        </v-app-bar-title>
      </div>
      <!--the button to display the dialog to create new task collection is meant to only display when the route path is equal to '/goal'-->
      <div v-if="route.path === '/goals'" class="d-flex align-center">
        <PlusIcon @click="$emit('showCollectionDialog')" class="plus-svg" />
      </div>

      <!--the button to display the dialog to add new task is meant to only display when the route.name is equal to 'goal-task'-->
      <div v-if="route.name === 'goal-task'" class="d-flex align-center">
        <PlusIcon @click="toggle_add_task_dialog()" class="plus-svg" />
      </div>
    </div>
  </v-app-bar>
</template>

<style lang="css" scoped>
#header {
  /* display: none; */
  background-color: #f1f7f8;
}

#txt1 {
  color: #ffc93e;
}

#txt2 {
  color: #086977;
}

.menu-svg {
  color: #086977;
}

.plus-svg {
  color: #086977;
}
</style>