<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vuetify/lib/composables/router'
import { useUserStore } from './stores/userStore'
import { useCollectionStore } from './stores/collectionStore'
import { useTaskStore } from './stores/taskStore'
import { useAlertStore } from './stores/alertStore'

import NavBar from '@/components/NavBar.vue'
import FooterComp from './components/FooterComp.vue'
import HeaderBar from './components/HeaderBar.vue'
import Alert from './components/Alert.vue'
// import CreateNewCollectionFrom from './components/CreateNewCollectionFrom.vue'
// import AddNewTaskFrom from './components/AddNewTaskFrom.vue'

import ErrorIcon from './assets/icons/ErrorIcon.vue'

const alertStore = useAlertStore()
const { alertDisplay, message } = storeToRefs(alertStore)
const { toggle_alert, hide_alert } = useAlertStore()

const userStore = useUserStore()
const { get_user_data } = useUserStore()

const collectionStore = useCollectionStore()
const { collectionDialog } = storeToRefs(collectionStore)
const { toggle_create_collection_dialog } = useCollectionStore()

const taskStore = useTaskStore()
const { taskDialog } = storeToRefs(taskStore)
const { show_task_dialog } = useTaskStore()

const { userData } = storeToRefs(userStore)

const route = useRoute()
// console.log(route)

const networkError = ref(false)
const userErrorMsg = ref('')

const drawer = ref(false)
// const dialog = ref(false)

const toggleNav = () => {
  drawer.value = !drawer.value
}

onMounted(async () => {
  get_user_data()

  // console.log(userData.value)
})
</script>

<template>
  <v-app id="main">
    <Teleport defer to="#alert">
      <Transition name="slide">
        <Alert v-if="alertDisplay" />
      </Transition>
    </Teleport>
    <HeaderBar
      @show-collection-dialog="toggle_create_collection_dialog()"
      @toggle-nav="toggleNav()"
      @show-task-dialog="show_task_dialog()"
    />
    <v-navigation-drawer v-model="drawer" class="h-100 top-0">
      <NavBar />
    </v-navigation-drawer>
    <div id="view">
      <!-- <div>
        <v-btn
          @click="
            toggle_alert({
              type: 'success',
              text: 'Testing Alet messages',
            })
          "
          >toggle alert</v-btn
        >
        <v-btn @click="hide_alert()">hide alert</v-btn>
      </div> -->
      <RouterView></RouterView>
      <!-- <v-sheet v-if="networkError" id="goal-error-cont">
        <span id="error-txt">{{ userErrorMsg }}</span>
        <ErrorIcon id="error-icon" />
      </v-sheet> -->
    </div>

    <FooterComp v-if="route.name !== 'goal-task' && route.name !== 'goals'" />
    <!-- <button @click="toggleNav()">toggle</button> -->
  </v-app>
</template>

<style lang="css" scoped>
#main {
  width: 100%;
  height: 100%;
  /* background-color: red; */
  /* margin-top: 100px; */
}

#view {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* background-color: green; */
  margin-top: 100px;
}

.slide-enter-active {
  transition: 0.2s ease;
}

.slide-leave-active {
  transition: 0.1s ease;
}

.slide-enter-from {
  opacity: 0;
  transform: translatey(-20px);
}
.slide-leave-to {
  opacity: 0;
  transform: translatey(-100px);
}

#goal-error-cont {
  width: 100%;
  max-width: 350px;
  height: 300px;
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  border: 1px solid #dc2f2f;
  background-color: #feecec;
}

#error-txt {
  font-size: 20px;
  color: #dc2f2f;
}

#error-icon {
  width: 50px;
  height: 50px;
  /* stroke: #dc2f2f; */
  fill: #dc2f2f;
}
</style>
