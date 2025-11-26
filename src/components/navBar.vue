<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vuetify/lib/composables/router'
import { storeToRefs } from 'pinia'
import { useNavigatorStore } from '@/stores/navigator'
import { useUserStore } from '@/stores/userStore'
import { useAuthStore } from '@/stores/AuthStore'

import PorfileIcon from '@/assets/icons/PorfileIcon.vue'

import { useCookie } from '@/composables/useCookie'
// import TrashIconVue from '@/assets/icons/TrashIcon.vue'

const { getCookie } = useCookie()

const authStore = useAuthStore()
const { isAuthenticated } = storeToRefs(authStore)

const checkIfAuthenticated = async () => {
  const accessToken = await getCookie()
  if (accessToken === '' || accessToken === null) {
    isAuthenticated.value = false
    return
  }

  isAuthenticated.value = true
  return
}

const route = useRoute()

const userStore = useUserStore()
const { userData } = storeToRefs(userStore)

const navigatorStore = useNavigatorStore()
const { navigateTo } = navigatorStore

const navOptions = ref([
  {
    name: 'Home',
    path: '/home',
  },
  {
    name: 'Goals',
    path: '/goals',
  },
  {
    name: 'Login',
    path: '/login',
  },
  {
    name: 'Sign-Up',
    path: '/signup',
  },
  {
    name: 'About',
    path: '/about',
  },
])

onMounted(async () => {
  await checkIfAuthenticated()
  // console.log(isAuthenticated.value)
})
</script>

<template>
  <div id="nav-cont" class="">
    <div id="nav">
      <v-list v-if="isAuthenticated" class="w-100 border-b-md d-flex align-center pa-2">
        <div
          @click="navigateTo('/profile')"
          class="w-100 d-flex justify-center align-center"
          :class="[{ 'active-profile-nav-item': route.path === '/profile' }]"
          v-ripple="{ class: 'text-black' }"
        >
          <PorfileIcon v-if="route.path === '/profile'" class="active-profile-icon" />
          <PorfileIcon v-else class="not-active-profile-icon" />
          <v-list-item :title="userData.userName" :subtitle="userData.email"></v-list-item>
        </div>
      </v-list>

      <v-divider></v-divider>
      <!--I do not even know what the hel this is "nav". but somehow is adds a padding around the v-list component-->
      <v-list class="w-100 d-flex flex-column ga-2" nav>
        <div v-for="nav in navOptions" :key="nav.key">
          <div
            v-if="
              (isAuthenticated && nav.name === 'Home') ||
              (isAuthenticated && nav.name === 'About') ||
              (isAuthenticated && nav.name === 'Goals') ||
              (!isAuthenticated && nav.name === 'Home') ||
              (!isAuthenticated && nav.name === 'About') ||
              (!isAuthenticated && nav.name === 'Login') ||
              (!isAuthenticated && nav.name === 'Sign-Up')
            "
            class="nav-item pa-0 rounded-lg pa-2"
            :class="[{ 'active-nav-item': nav.path === route.path }]"
            v-ripple="{ class: 'text-teal' }"
            @click="navigateTo(`${nav.path}`)"
          >
            <div>
              <span id="nav-txt" class="ml-5 pa-2">
                {{ nav.name }}
              </span>
            </div>
          </div>
        </div>
      </v-list>
    </div>
    <v-divider></v-divider>
  </div>
</template>

<style lang="css" scoped>
#nav-cont {
  position: relative;
  /* background-color: teal; */
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #f1f7f8;
  /* background-color: #0868771a; */
  /* align-items: center; */
}

#nav {
  position: relative;
  top: 13%;
  /* background-color: brown; */
  width: 100%;
  display: flex;
  gap: 0.3rem;
  flex-direction: column;
  align-items: center;
}

#nav-txt {
  font-size: 1.2rem;
  font-weight: 600;
  color: #086977;
}

.nav-item:hover {
  transition: 0.5s;
  /* border: 1px solid blue; */
  /* background-color: #ffc93e; */
  background-color: #ffc93e;
}

#btn-cont {
  position: relative;
  bottom: 10%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

#logout-btn {
  width: 100%;
  /* border: 1.5px solid red; */
  border-radius: 5px;
  font-size: 1.2rem;
  color: red;
  bottom: 0px;
}

#logout-btn:hover {
  border: 1.5px solid red;
  box-shadow: 0px 0px 10px 0px red;
  transition: ease-in-out 0.5s;
}

.active-nav-item {
  color: #2f4858;
  background-color: #ffc93e;
}

.active-profile-nav-item {
  color: green;
}

.active-profile-icon {
  stroke: green;
}

.not-active-profile-icon {
  stroke: #333333;
}
</style>

