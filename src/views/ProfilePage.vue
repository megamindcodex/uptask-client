
<script setup>
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/userStore'
import { useCollectionStore } from '@/stores/collectionStore'
import { useAuthStore } from '@/stores/AuthStore'

import { useNavigatorStore } from '@/stores/navigator.js'

import ProfileIcon from '@/assets/icons/ProfileIcon.vue'

const { navigateTo } = useNavigatorStore()

const { checkAuth } = useAuthStore()

const userStore = useUserStore()
const { userData, totalCollection } = storeToRefs(userStore)

const totalCompletedCollections = computed(() => {
  const collections = userData.value.taskCollections || []

  return collections.filter((collection) => {
    const tasks = collection.tasks || []
    return tasks.length > 0 && tasks.every((task) => task.tick === true)
  })
})

const overLay = ref(false)

const toggle_signout_overlay = () => {
  overLay.value = !overLay.value
}
const cookieName = 'uptask-access-token'
const Sign_out = async () => {
  document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
  await checkAuth()
  navigateTo('/login')
}

// const collectionStore = useCollectionStore()
// const { totalCollection, totalCollectionCompleted } = storeToRefs(collectionStore)
</script>
<template>
  <v-container class="h-100">
    <v-card class="d-flex flex-column ga-7" variant="flat">
      <div class="top w-100 d-flex flex-column align-center justify-center">
        <ProfileIcon id="profile-icon" class="dp" />
        <span>Hello, {{ userData.userName }}!</span>
      </div>
      <div class="d-flex flex-column ga-5">
        <div class="col">
          <span class="font-weight-bold">Username:</span>
          <span>{{ userData.userName }}</span>
        </div>
        <div class="col">
          <span class="font-weight-bold">Email:</span>
          <span>{{ userData.email }}</span>
        </div>
        <div class="col">
          <span class="font-weight-bold">Total Goals:</span>
          <span class="text-info">{{ totalCollection }}</span>
        </div>
        <div class="col">
          <span class="font-weight-bold">Total Completed Goals:</span>
          <span class="text-green">{{ totalCompletedCollections.length }}</span>
        </div>
      </div>
      <div id="signout-btn">
        <button @click="toggle_signout_overlay">Log out</button>
      </div>

      <v-dialog persistent v-model="overLay" id="logout-dialog">
        <v-card id="logout-card" class="pa-4 d-flex ga-4">
          <div class="col-1 d-flex flex-column justify-center align-center">
            <span class="font-weight-bold">Log Out</span>
            <p>Are you sure you want to log out?</p>
          </div>
          <div id="dialog-btn-cont" class="col-2">
            <button
              v-ripple="{ class: 'text-indigo' }"
              class="cancel px-4 py-2"
              @click="toggle_signout_overlay"
            >
              Cancel
            </button>
            <button v-ripple="{ class: 'text-white' }" class="ok px-4 py-2" @click="Sign_out">
              Ok
            </button>
          </div>
        </v-card>
      </v-dialog>
    </v-card>
  </v-container>
</template>


<style lang="css" scoped>
#profile-icon {
  width: 70px;
  height: 70px;
  fill: none;
  stroke: #086977;
  /* border: 1.5px solid #086977; */
}

.col {
  font-size: 17px;
  width: 100%;
  display: flex;
  gap: 1rem;
  justify-content: space-between;
}

#signout-btn {
  margin-top: 30px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

#signout-btn button {
  width: 100%;
  padding: 10px;
  text-align: center;
  border: 2px solid #f53a3a;
  border-radius: 12px;
}

#logout-card {
  border-radius: 12px;
}

#dialog-btn-cont {
  width: 100%;
  display: flex;
  gap: 20px;
}

#dialog-btn-cont button {
  width: 100%;
  font-weight: 600;
  border: 1px solid #000;
  border-radius: 12px;
}
</style>