<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vuetify/lib/composables/router'
import { useUserStore } from './stores/userStore'
import { useCollectionStore } from './stores/collectionStore'
import { useTaskStore } from './stores/taskStore'

import NavBar from './components/NavBar.vue'
import FooterComp from './components/FooterComp.vue'
import HeaderBar from './components/HeaderBar.vue'
import CreateNewCollectionFrom from './components/CreateNewCollectionFrom.vue'
import AddNewTaskFrom from './components/AddNewTaskFrom.vue'

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

const drawer = ref(false)
// const dialog = ref(false)

const toggleNav = () => {
  drawer.value = !drawer.value
}

get_user_data()
onMounted(async () => {
  // console.log(userData.value)
})
</script>

<template>
  <v-app id="main">
    <HeaderBar
      @show-collection-dialog="toggle_create_collection_dialog()"
      @toggle-nav="toggleNav()"
      @show-task-dialog="show_task_dialog()"
    />
    <v-navigation-drawer v-model="drawer" class="h-100 top-0">
      <NavBar />
    </v-navigation-drawer>
    <div id="view">
      <RouterView></RouterView>
    </div>

    <!-- <button @click="toggleNav()">toggle</button> -->
    <!-- <FooterComp v-if="route.name !== 'goal-task' && route.name !== 'goals'" /> -->
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
  justify-content: center;
  align-items: center;
  /* background-color: green; */
  margin-top: 100px;
}
</style>
