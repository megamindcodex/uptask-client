
<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vuetify/lib/composables/router'
import { useUserStore } from '@/stores/userStore'
import { useAuthStore } from '@/stores/AuthStore'

import { useValidator } from '@/composables/useValidator' //custom form validator composables
import { useAlertStore } from '@/stores/alertStore'

const { checkAuth } = useAuthStore()

const { toggle_alert } = useAlertStore()

const router = useRouter()

const { validate_email_field, validate_password_field } = useValidator()

const userStore = useUserStore()
const { loginUser } = useUserStore()

const isLoading = ref(false)
const alert = ref({ type: '', message: '' })
const formData = reactive({
  email: '',
  password: '',
})

const emailValidation = ref({ valid: true, errorMsg: '' })
const passwordValidation = ref({ valid: true, errorMsg: '' })

const validateField = (field) => {
  if (field === 'email') {
    emailValidation.value = validate_email_field(formData.email)
  }

  if (field === 'password') {
    passwordValidation.value = validate_password_field(formData.password)
  }
}

const validateForm = () => {
  validateField('email')
  validateField('password')

  return emailValidation.value.valid && passwordValidation.value.valid
}

const submitForm = async () => {
  const isFormValid = validateForm()

  if (!isFormValid) {
    console.log('form is not valid')
    alert.value = { type: 'error', message: 'From is not valid' }
    return
  }

  isLoading.value = true

  const result = await loginUser(formData)
  isLoading.value = false
  if (!result.success) {
    console.log(result.message)
    alert.value = { type: 'error', message: result.message }
    return // return to the caller so it does not continue with the next function in line/it just stops
  }

  toggle_alert({ type: 'success', text: result.message })
  console.log(`form is valid: ${isFormValid}`)

  console.log(`submited: ${result.message}`)
  await checkAuth()
  router.push('/goals')
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
  <v-form @submit.prevent="submitForm" id="login-form">
    <!-- Email Field -->
    <div class="form-group">
      <div class="input-field">
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="enter your email"
          class="rounded-lg"
          v-model="formData.email"
          @blur="validateField('email')"
        />
      </div>
      <div class="input-details">
        <Transition name="input-error-fade">
          <span v-if="!emailValidation.valid">{{ emailValidation.errorMsg }}</span>
        </Transition>
      </div>
    </div>

    <!-- passwrord Field -->
    <div class="form-group">
      <div class="input-field">
        <label for="password">password</label>
        <input
          type="password"
          id="password"
          placeholder="enter your password"
          class="rounded-lg"
          v-model="formData.password"
          @blur="validateField('password')"
        />
      </div>
      <div class="input-details">
        <Transition name="input-error-fade">
          <span v-if="!passwordValidation.valid">{{ passwordValidation.errorMsg }}</span>
        </Transition>
      </div>
    </div>

    <div class="forgot-pass d-flex align-center">
      <RouterLink to="/forgot-password">Forgot password?</RouterLink>
    </div>

    <div class="btn-cont mt-5">
      <v-btn type="submit" variant="tonal" class="btn py-6" block>
        <v-progress-circular v-if="isLoading" indeterminate></v-progress-circular>
        <span v-if="!isLoading">Log in</span>
      </v-btn>
    </div>
    <div class="base w-100 d-flex ga-2 justify-center align-center mt-2">
      <span>Don't have an account?</span>
      <RouterLink to="/signup" class="">Sign up</RouterLink>
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

#login-form {
  position: relative;
  width: 100%;
  display: flex;
  gap: 5px;
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

.forgot-pass {
  position: relative;
  left: 15px;
  display: flex;
  align-items: center;
}

.forgot-pass a {
  color: teal;
  text-decoration: none;
  font-size: 18px;
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