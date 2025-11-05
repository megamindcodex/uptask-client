<script setup>
import { ref } from 'vue'
import NavBar from './components/NavBar.vue'
import FooterComp from './components/FooterComp.vue'
import HeaderBar from './components/HeaderBar.vue'
import AddTaskFrom from './components/AddTaskFrom.vue'

const drawer = ref(false)
const dialog = ref(false)

const toggleNav = () => {
  drawer.value = !drawer.value
}

const showDialog = () => {
  dialog.value = !dialog.value
  console.log(dialog.value)
}
</script>

<template>
  <v-app id="main" class="w-100">
    <HeaderBar @toggle-nav="toggleNav()" @show-dialog="showDialog()" />
    <RouterView></RouterView>
    <v-navigation-drawer v-model="drawer" class="h-100 top-0">
      <NavBar />
    </v-navigation-drawer>

    <v-dialog v-model="dialog">
      <v-card max-width="400" max-height="400" class="pa-3 d-flex justify-center">
        <AddTaskFrom @show-dialog="showDialog()" />
      </v-card>
    </v-dialog>

    <!-- <button @click="toggleNav()">toggle</button> -->
    <FooterComp />
  </v-app>
</template>

<style lang="css" scoped>
/* #main {
  display: flex;
  gap: 1rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
} */

.nav-drawer {
  /* z-index: -1000; */
  /* color: red; */
}

.v-navigation-drawer {
  z-index: 1006;
}
</style>
