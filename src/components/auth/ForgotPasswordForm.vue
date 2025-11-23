
<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vuetify/lib/composables/router'

import { useValidator } from '@/composables/useValidator' //custom form validator composables

import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()

const { request_resetCode, verify_resetCode } = useUserStore()

const { validate_email_field, validate_resetCode_field } = useValidator()

const router = useRouter()

const isLoading_verifycode = ref(false)
const isLoading_resetcode = ref(false)
const alert = ref({ type: '', message: '' })

const email = ref('')
const resetCode = ref('')
// const resetCodeStatus = ref(null)

// const requestCodeBtn = ref(true)
// const verifyCodeBtn = ref(true)

const emailValidation = ref({ valid: true, errorMsg: '' })
const resetCodeValidation = ref({ valid: true, errorMsg: '' })

const validateField = (field) => {
  if (field === 'email') {
    emailValidation.value = validate_email_field(email.value)
  }

  if (field === 'resetCode') {
    resetCodeValidation.value = validate_resetCode_field(resetCode.value)
  }
}

const run_requestResetCode = async () => {
  validateField('email')
  if (!emailValidation.value.valid) {
    // alert.value = { type: 'error', message: emailValidation.value.errorMsg }
    return
  }

  isLoading_resetcode.value = true
  const result = await request_resetCode(email.value)
  isLoading_resetcode.value = false

  if (!result.success) {
    alert.value = { type: 'error', message: result.message }
    return
  }

  alert.value = { type: 'info', message: result.message }
  console.log('reset code sent to email inbox')
  return
}

// check if all input fields are valid
const validate_all_input_fields = () => {
  validateField('email')
  validateField('resetCode')
  return emailValidation.value.valid && resetCodeValidation.value.valid
}

// Run
const run_verifyResetCode = async () => {
  const fileds_valid = validate_all_input_fields()
  if (!fileds_valid) {
    alert.value = { type: 'error', message: 'Fields are not valid' }
    return
  }

  isLoading_verifycode.value = true
  const result = await verify_resetCode(email.value, resetCode.value)
  isLoading_verifycode.value = false

  if (!result.success) {
    alert.value = { type: 'error', message: result.message }
    return
  }

  alert.value = { type: 'success', message: result.message }

  router.push(`/reset-password/${email.value}`)

  return
}
</script>

<template>
  <div class="alert w-100 d-flex justify-center align-center px-4">
    <Transition name="input-error-fade">
      <span
        v-if="alert.type === 'error'"
        class="bg-red-darken-2 text-red-lighten-5 text-center pa-2 w-100 rounded-lg"
        >{{ alert.message }}</span
      >
      <span
        v-else-if="alert.type === 'success'"
        class="bg-green-darken-2 text-green-lighten-5 text-center pa-2 w-100 rounded-lg"
        >{{ alert.message }}</span
      >
      <span
        v-else-if="alert.type === 'info'"
        class="bg-blue-darken-2 text-blue-lighten-5 text-center pa-2 w-100 rounded-lg"
        >{{ alert.message }}</span
      >
    </Transition>
  </div>
  <v-form id="reset-code-form">
    <!-- Email Field -->
    <div class="form-group">
      <div class="input-field">
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="enter your email"
          class="rounded-lg"
          v-model="email"
          @blur="validateField('email')"
        />
      </div>
      <div class="input-details">
        <Transition name="input-error-fade">
          <span v-if="!emailValidation.valid">{{ emailValidation.errorMsg }}</span>
        </Transition>
      </div>
    </div>

    <div class="row w-100 d-flex justify-center align-center mb-4">
      <div class="btn-cont">
        <v-btn variant="tonal" class="btn py-6" @click="run_requestResetCode()" block>
          <v-progress-circular v-if="isLoading_resetcode" indeterminate></v-progress-circular>
          <span v-if="!isLoading_resetcode">request reset code</span>
        </v-btn>
      </div>
      <!-- <div class="">
        <Transition>
          <span v-if="!resetCodeStatus === true" class="text-success"
            >check your inbox for reset code</span
          >
        </Transition>
        <Transition>
          <span v-if="resetCodeStatus === false" class="text-error"
            >error requesting resest code. try again</span
          >
        </Transition>
      </div> -->
    </div>

    <!-- Reset code Field -->
    <div class="form-group">
      <div class="input-field">
        <label for="resetCode">Reset code</label>
        <input
          type="text"
          id="resetCode"
          placeholder="enter reset code"
          class="rounded-lg"
          v-model="resetCode"
          @blur="validateField('ersetCode')"
        />
      </div>
      <div class="input-details">
        <Transition name="input-error-fade">
          <span v-if="!resetCodeValidation.valid">{{ resetCodeValidation.errorMsg }}</span>
        </Transition>
      </div>
      <div class="btn-cont">
        <v-btn variant="tonal" class="btn py-6" @click="run_verifyResetCode()" block>
          <v-progress-circular v-if="isLoading_verifycode" indeterminate></v-progress-circular>
          <span v-if="!isLoading_verifycode">verify code</span>
        </v-btn>
      </div>
    </div>
  </v-form>
</template>

<style lang="css" scoped>
.alert {
  position: absolute;
  top: 0;
  left: 0;
  height: 30px;
}

#reset-code-form {
  position: relative;
  width: 100%;
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
  justify-content: center;
  /* border: 1px solid green; */
}

.form-group {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
  justify-content: center;
  /* border: 2px solid purple; */
}

.input-field {
  width: 100%;
  display: flex;
  gap: 5px;
  flex-direction: column;
  justify-content: center;
  /* border: 2px solid rgb(145, 226, 244); */
}

.input-field label {
  position: relative;
  width: fit-content;
  padding-left: 0.5rem;
  font-weight: 600;
  padding-left: 0.5rem;
  /* border: 2px solid yellow; */
}

.input-field label:after {
  content: '*';
  font-size: 1rem;
  font-weight: 600;
}

.input-field input {
  padding: 10px;
  outline: none;
  border: 2px solid #8c8989;
}

.input-field input:focus {
  border: 2px solid #464545;
}

.input-details {
  width: 100%;
  height: 20px;
  padding-left: 0.5rem;
  /* border: 2px solid brown; */
}

.input-details span {
  color: #d43232;
}

.btn-cont {
  width: 100%;
  /* border: 1px solid orangered; */
}

.btn {
  background-color: #086977;
  color: #fff;
}

.base {
  font-size: 20px;
}

.base a {
  color: #086977;
  text-decoration: none;
}

.input-error-fade-enter-from {
  opacity: 0;
  transform: translateY(-15px);
}

.input-error-fade-enter-to {
  opacity: 1;
  transform: translateX(0);
}

.input-error-fade-enter-active {
  transition: 0.1s ease-in;
}

.input-error-fade-leave-to {
  opacity: 0;
  transform: translateY(-15px);
}

.input-error-fade-leave-active {
  transition: 0.1s ease-in;
}
</style>