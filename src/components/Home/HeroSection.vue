<script setup>
import { useNavigatorStore } from '@/stores/navigator'

const { navigateTo } = useNavigatorStore()
</script>

<template>
  <div id="hero-section">
    <!-- Main Headline -->
    <div class="hero-content">
      <h1>Organize, Track & Conquer Your Goals</h1>
      <p class="subtitle">
        Add goals, break them into tasks, edit them anytime, check them off, and stay in control of
        your progress.
      </p>

      <div class="cta-wrapper">
        <button @click="navigateTo('/goals')">Get Started</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Outer Hero Container */
#hero-section {
  width: 100%;
  padding: 5rem 10%;
  background-image: linear-gradient(#fecd518e, #0f819379, #ffffff);
  box-shadow: inset 0 0 15px rgba(255, 255, 255, 0.6);
  border-radius: 0 0 25px 25px;
  display: flex;
  justify-content: center;
}

/* Hero Content Wrapper */
.hero-content {
  max-width: 900px;
  width: 100%;
  text-align: center;
}

/* Main Heading */
.hero-content h1 {
  font-size: 3rem;
  font-weight: 800;
  line-height: 1.2;
  color: #1e1e1e;
  margin-bottom: 1.5rem;
}

/* Subtitle */
.subtitle {
  font-size: 1.2rem;
  line-height: 1.7;
  max-width: 700px;
  margin: 0 auto 2.5rem auto;
  color: #333;
  font-weight: 400;
}

/* CTA Section */
.cta-wrapper {
  display: flex;
  justify-content: center;
}

.cta-wrapper button {
  width: 60%;
  max-width: 320px;
  padding: 14px 0;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 30px;
  border: none;
  background-color: #fece51;
  cursor: pointer;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  transition: 0.25s ease;
}

/* Hover + Active Effects */
.cta-wrapper button:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.236);
}

.cta-wrapper button:active {
  transform: scale(0.97);
}
</style>
