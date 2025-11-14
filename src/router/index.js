import { createRouter, createWebHistory } from 'vue-router'
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

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      component: HomePage,
    },
    {
      path: '/goals',
      name: "goals",
      component: GoalsPage
    },
    {
      path: '/goals/:id',
      name: "goal-task",
      component: GoalTasksPage
    },
    {
      path: "/signup",
      component: SignupPage
    },
    {
      path: "/login",
      component: LoginPage
    },
    {
      path: "/forgot-password",
      component: ForgotPasswordPage
    },
    {
      path: "/reset-password/:email",
      component: ResetPasswordPage
    },
    {
      path: '/profile',
      component: ProfilePage
    },
    {
      path: "/about",
      component: AboutPage
    },
    {
      path: "/404",
      component: PageNotFound
    }

  ],
})

export default router
