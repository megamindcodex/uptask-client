
<script setup>
import HeroSection from '@/components/Home/HeroSection.vue'
import FeatureSection from '@/components/Home/FeatureSection.vue'
import HowItWorksSection from '@/components/Home/HowItWorksSection.vue'
import TestimonialSection from '@/components/Home/TestimonialSection.vue'
</script>
<template>
  <v-container class="d-flex flex-column ga-10 pa-0">
    <HeroSection />
    <FeatureSection />
    <HowItWorksSection />
    <!-- <TestimonialSection /> -->
  </v-container>
</template>

<style lang="css" scoped>
.cont {
  width: 100%;
  height: 100%;
}
</style>