<script setup>
import ResetPasswordForm from '@/components/auth/ResetPasswordForm.vue'
</script>

<template>
  <div class="cont h-100 pa-2 d-flex flex-column ga-4">
    <div class="w-100 d-flex flex-column">
      <span class="text-h5">Set New Password</span>
      <span class="text-subtitle-1">Set Your New Password to reset the old one</span>
    </div>
    <ResetPasswordForm />
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