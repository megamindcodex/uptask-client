
<script setup>
import { computed, ref } from 'vue'
import { useAlertStore } from '@/stores/alertStore'
import { storeToRefs } from 'pinia'

import CloseXIcon from './CloseXIcon.vue'

const alertStore = useAlertStore()
const { alertDisplay, message } = storeToRefs(alertStore)
const { hide_alert } = useAlertStore()
</script>

<template>
  <div :class="message.type">
    <!-- <small class="text-uppercase">{{ message.type }}</small> -->
    <span class="">{{ message.text }}</span>
    <CloseXIcon id="closex-icon" @click="hide_alert()" />
  </div>
</template>

<style lang="css" scoped>
div {
  font-size: 17px;
  font-weight: bold;
  width: auto;
  display: flex;
  gap: 1rem;
  /* flex-direction: column; */
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
  padding: 5px;
}

.info {
  color: #316ee1;
  background-color: #dfe9fa;
  border: 1px solid #316ee1;
}
.success {
  color: #1e8f1e;
  background-color: #c2f8c2;
  border: 1px solid #1e8f1e;
}
.error {
  color: #e12121;
  border: 1px solid #e12121;
  background-color: #ffd6d6;
}

#closex-icon {
  width: 21px;
  height: 21px;
}
</style>