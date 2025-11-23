import { ref } from "vue"
import { createRouter, createWebHistory } from 'vue-router'
import { useCookie } from "@/composables/useCookie"

import HomePage from '@/views/HomePage.vue'
import GoalsPage from '@/views/GoalsPage.vue'
import GoalTasksPage from '@/views/GoalTasksPage.vue'
import AboutPage from '@/views/AboutPage.vue'
import ProfilePage from '@/views/ProfilePage.vue'

import SignupPage from '@/views/SignupPage.vue'
import LoginPage from '@/views/LoginPage.vue'
import ForgotPasswordPage from '@/views/ForgotPasswordPage.vue'
import ResetPasswordPage from '@/views/ResetPasswordPage.vue'

import PageNotFound from '@/views/PageNotFound.vue'

const { getCookie } = useCookie()

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Public routes. Does not need authentication before entrey 
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      name: "home",
      component: HomePage,
      meta: {
        public: true,
        requiresAuth: false
      }
    },
    {
      path: "/signup",
      name: "signup",
      component: SignupPage,
      meta: {
        public: true,
        requiresAuth: false
      }
    },
    {
      path: "/login",
      name: "login",
      component: LoginPage,
      meta: {
        public: true,
        requiresAuth: false
      }
    },
    {
      path: "/forgot-password",
      name: "forgot-password",
      component: ForgotPasswordPage,
      meta: {
        public: true,
        requiresAuth: false
      }
    },
    {
      path: "/reset-password/:email",
      name: "reset-password",
      component: ResetPasswordPage,
      meta: {
        public: true,
        requiresAuth: false
      }
    },
    {
      path: "/about",
      name: "about",
      component: AboutPage,
      meta: {
        public: true,
        requiresAuth: false
      }
    },
    {
      path: "/404",
      name: "404",
      component: PageNotFound,
      meta: {
        public: true,
        requiresAuth: false
      }
    },
    //has to be authenticated before entrey
    {
      path: '/profile',
      name: "profile",
      component: ProfilePage,
      meta: {
        isPublic: false,
        requiresAuth: true
      },
    },
    {
      path: '/goals',
      name: "goals",
      component: GoalsPage,
      meta: {
        isPublic: false,
        requiresAuth: true
      },
    },
    {
      path: '/goals/:id',
      name: "goal-task",
      component: GoalTasksPage,
      meta: {
        isPublic: false,
        requiresAuth: true
      },
    },


  ],
})



// Place a navigation guard for authentication
router.beforeEach(async (to, from, next) => {
  // const accessToken = await getCookie()

  const isAuthenticated = await getCookie()

  const isPublic = to.meta.isPublic
  const requiresAuth = to.meta.requiresAuth

  if (requiresAuth && !isAuthenticated) {
    // trying to access a protected page
    return next({ name: "login" })
  }

  if (isPublic && isAuthenticated && (to.name === 'login' || to.name === 'signup')) {
    // authenticated users shouldn't see login/signup
    return next({ name: 'home' })
  }

  next()

})


export default router
