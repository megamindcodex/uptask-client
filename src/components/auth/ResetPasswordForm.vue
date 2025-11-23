
<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vuetify/lib/composables/router'

import { useValidator } from '@/composables/useValidator' //custom form validator composables
import { useUserStore } from '@/stores/userStore'

const route = useRoute()
const router = useRouter()

const { reset_user_password } = useUserStore()

const { validate_password_field, validate_confirmPassowrd_field } = useValidator()

const alert = ref({ type: '', message: 'testing alert message' })

const isLoading = ref(false)

const formData = reactive({
  email: route.value.params.email,
  newPassword: '',
})
const confirmPassword = ref('')

// const newPassword = ref('')
// const confirmPassword = ref('')

const newPasswordValidation = ref({ valid: true, errorMsg: '' })
const confirmPasswordValidation = ref({ valid: true, errorMsg: '' })

const validateField = (field) => {
  if (field === 'newPassword') {
    newPasswordValidation.value = validate_password_field(formData.newPassword)
  }

  if (field === 'confirm-password') {
    confirmPasswordValidation.value = validate_confirmPassowrd_field(
      formData.newPassword,
      confirmPassword.value
    )
  }
}

const validateForm = () => {
  validateField('newPassword')
  validateField('confirm-password')

  return newPasswordValidation.value.valid && confirmPasswordValidation.value.valid
}

const submitForm = async () => {
  const isFormValid = validateForm()

  if (!isFormValid) {
    console.log('form is not valid')
    alert.value = { type: 'error', message: 'Form is not valid' }
    return
  }

  console.log(`form is valid: ${isFormValid}`)

  isLoading.value = true
  const result = await reset_user_password(formData)
  isLoading.value = false
  if (!result.success) {
    console.log(`${result.message}`)
    alert.value = { type: 'error', message: result.message }
    return
  }

  alert.value = { type: 'success', message: result.message }
  router.push('/login')
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
    <!-- New passwrord Field -->
    <div class="form-group">
      <div class="input-field">
        <label for="newPassword">New password</label>
        <input
          type="password"
          id="newPassword"
          placeholder="enter new password"
          class="rounded-lg"
          v-model="formData.newPassword"
          @blur="validateField('newPassword')"
        />
      </div>
      <div class="input-details">
        <Transition name="input-error-fade">
          <span v-if="!newPasswordValidation.valid">{{ newPasswordValidation.errorMsg }}</span>
        </Transition>
      </div>
    </div>

    <!-- confirm password Field -->
    <div class="form-group">
      <div class="input-field">
        <label for="confrim-password">Confirm-password</label>
        <input
          type="password"
          id="confirm-password"
          placeholder="confirm your password"
          class="rounded-lg"
          v-model="confirmPassword"
          @blur="validateField('confirm-password')"
        />
      </div>
      <div class="input-details">
        <Transition name="input-error-fade">
          <span v-if="!confirmPasswordValidation.valid">{{
            confirmPasswordValidation.errorMsg
          }}</span>
        </Transition>
      </div>
    </div>

    <div class="btn-cont mt-4">
      <v-btn type="submit" variant="tonal" class="btn py-6" block>
        <v-progress-circular v-if="isLoading" indeterminate></v-progress-circular>
        <span v-if="!isLoading">set New Password</span>
      </v-btn>
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