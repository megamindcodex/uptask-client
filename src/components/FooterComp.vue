
<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vuetify/lib/composables/router'

import UpworkIcon from '@/assets/icons/UpworkIcon.vue'
import XTwitterIcon from '@/assets/icons/X-TwitterIcon.vue'
import GithubIcon from '@/assets/icons/GithubIcon.vue'
import HeartIcon from '@/assets/icons/HeartIcon.vue'
// import EnvelopIcon from '@/assets/icons/EnvelopIcon.vue'

const route = useRoute()

onMounted(() => {
  // const currentRouteName = ref(route.value.name)
  // console.log(route)
  // console.log(route._)
})
</script>


<template>
  <v-footer id="footer" class="pa-4">
    <div id="links">
      <ul>
        <span class="title">Public</span>
        <li :class="[{ 'active-nav-item': '/home' === route.path }]" class="nav-item">
          <RouterLink to="/home">Home</RouterLink>
        </li>
        <li :class="[{ 'active-nav-item': '/about' === route.path }]">
          <RouterLink to="/about">About</RouterLink>
        </li>
        <li :class="[{ 'active-nav-item': '/goals' === route.path }]">
          <RouterLink to="/goals">Goals</RouterLink>
        </li>
      </ul>
      <ul>
        <span class="title">Auth</span>
        <li :class="[{ 'active-nav-item': '/login' === route.path }]">
          <RouterLink to="/login">Login</RouterLink>
        </li>
        <li :class="[{ 'active-nav-item': '/signup' === route.path }]">
          <RouterLink to="/signup">Sign-Up</RouterLink>
        </li>
      </ul>
    </div>
    <div id="socials">
      <ul>
        <span class="title">Socials</span>

        <li>
          <a href="https://twitter.com/megamindcodex" target="_blank" rel="noopener">
            <XTwitterIcon id="x-icon" />
          </a>
        </li>

        <li>
          <a
            href="https://www.upwork.com/freelancers/~01ecd2e6254692c47c?mp_source=share"
            target="_blank"
            rel="noopener"
          >
            <UpworkIcon id="upwork-icon" />
          </a>
        </li>

        <li>
          <a href="https://github.com/megamindcodex" target="_blank" rel="noopener">
            <GithubIcon id="github-icon" />
          </a>
        </li>
      </ul>
    </div>
    <div id="base">
      <span class="d-flex align-center ga-1"
        >Designed and developed by Emman<HeartIcon id="heart-icon"
      /></span>
      <span>© 2025 — MegamindCodex Software Solutions</span>
    </div>
  </v-footer>
</template>

<style lang="css" scoped>
#footer {
  margin-top: 2rem;
  width: 100%;
  display: flex;
  gap: 1rem;
  flex-direction: column;
  background-color: #f0f8f9;
  /* border: 1px solid blue; */
}

.title {
  color: #000;
  font-weight: 600;
}

#links {
  width: 100%;
  display: flex;
  gap: 5rem;
  /* justify-content: space-between; */
}

#links ul {
  display: flex;
  gap: 5px;
  flex-direction: column;
  list-style: none;
  color: #096977;
}

ul li a {
  text-decoration: none;
  color: #096977;
}

#links ul li a:hover {
  color: #ffc93e;
}

#socials {
  width: 100%;
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
}

#socials ul {
  width: 100%;
  display: flex;
  gap: 5px;
  flex-direction: column;
  list-style: none;
}

#socials ul li {
  color: #096977;
}

#socials ul li:hover {
  color: #ffc93e;
}

.active-nav-item a {
  color: #ffc93e;
}

#x-icon {
  width: 20px;
  /* height: 27px; */
}

#upwork-icon {
  width: 60px;
  /* height: 70px; */
}

#github-icon {
  width: 22px;
  height: 22px;
}

/* #envelop-icon {
  width: 30px;
  height: 30px;
} */

#base {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: 600;
  color: #4f4c4c;
}

#heart-icon {
  width: 18px;
  height: 18px;
  fill: #ff8daa;
}
</style>