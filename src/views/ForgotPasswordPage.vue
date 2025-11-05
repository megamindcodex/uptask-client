
<script setup>
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm.vue'
</script>
<template>
  <div class="cont h-100 pa-2 d-flex flex-column ga-4">
    <div class="w-100 d-flex flex-column">
      <span class="text-h5">Forgot Password?</span>
      <span class="text-subtitle-1">Input your email address to request a code</span>
    </div>
    <ForgotPasswordForm />
  </div>
</template>

<style lang="css" scoped>
.cont {
  position: relative;
  width: 100%;
  margin-top: 100px;
  /* border: 1px solid #000; */
}
</style>