
<script setup>
import SignupForm from '@/components/auth/SignupForm.vue'
</script>

<template>
  <div class="cont h-100 pa-2 d-flex flex-column ga-4">
    <div class="w-100 d-flex flex-column">
      <span class="text-h5">Create an Account</span>
      <span class="text-subtitle-1">Hey there!, enter your details to create an account</span>
    </div>
    <SignupForm />
  </div>
</template>

<style lang="css" scoped>
.cont {
  position: relative;
  width: 100%;
  height: 100%;
  /* margin-top: 100px; */
  /* border: 1px solid #000; */
}
</style>