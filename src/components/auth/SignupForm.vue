
<script setup>
import { ref, reactive } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vuetify/lib/composables/router'

import { useValidator } from '@/composables/useValidator' //custom form validator composables
import { useUserStore } from '@/stores/userStore'

const router = useRouter()
const userStore = useUserStore()

// StoreToRefs here is used to be able to destructore state from the store because disctructuring directly will make the state not reactive
const { userData } = storeToRefs(userStore)
const { registerUser } = useUserStore() // but function/actions can be distructured directly from the store because it is bound to the store itself (thats what i read from the pinia documentation)

const {
  validate_userName_field,
  validate_email_field,
  validate_password_field,
  validate_confirmPassowrd_field,
} = useValidator()

const alert = ref({ type: '', message: '' })
const formData = reactive({
  userName: '',
  email: '',
  password: '',
})

const confirmPassword = ref('')

const userNameValidation = ref({ valid: true, error: false, message: '' })
const emailValidation = ref({ valid: true, error: false, message: '' })
const passwordValidation = ref({ valid: true, error: false, message: '' })
const confirmPasswordValidation = ref({ valid: true, error: false, message: '' })

const validateField = (field) => {
  if (field === 'userName') {
    userNameValidation.value = validate_userName_field(formData.userName)
  }

  if (field === 'email') {
    emailValidation.value = validate_email_field(formData.email)
  }

  if (field === 'password') {
    passwordValidation.value = validate_password_field(formData.password)
  }

  if (field === 'confirm-password') {
    confirmPasswordValidation.value = validate_confirmPassowrd_field(
      formData.password,
      confirmPassword.value
    )
  }
}

const validateForm = () => {
  validateField('userName')
  validateField('email')
  validateField('password')
  validateField('confirm-password')

  return (
    userNameValidation.value.valid &&
    emailValidation.value.valid &&
    passwordValidation.value.valid &&
    confirmPasswordValidation.value.valid
  )
}

const submitForm = async () => {
  const isFormValid = validateForm()

  if (!isFormValid) {
    console.log('form is not valid')
    alert.value = { type: 'error', message: 'Form is not valid' }
    return
  }

  const result = await registerUser(formData)

  if (!result.success) {
    console.log(result.message)
    alert.value = { type: 'error', message: result.message }
    return // return to the caller so it does not continue with the next function in line/it just stops
  }

  alert.value = { type: 'success', message: result.message }
  console.log(`form is valid: ${isFormValid}`)

  console.log(`submited: ${result.message}`)
  router.push('/profile')
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
  <v-form @submit.prevent="submitForm" id="signup-form">
    <!-- UserName Field -->
    <div class="form-group">
      <div class="input-field">
        <label for="userName">User name</label>
        <input
          type="text"
          id="userName"
          placeholder="enter your username"
          class="rounded-lg"
          v-model="formData.userName"
          @blur="validateField('userName')"
        />
      </div>
      <div class="input-details">
        <Transition name="input-error-fade">
          <span v-if="!userNameValidation.valid">{{ userNameValidation.errorMsg }}</span>
        </Transition>
      </div>
    </div>

    <!-- UserName Field -->
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

    <div class="btn-cont mt-2">
      <v-btn type="submit" variant="tonal" class="btn py-6" block>
        <span>sign up</span>
      </v-btn>
    </div>

    <div class="base w-100 d-flex ga-2 justify-center align-center mt-2">
      <span>Already have an account?</span>
      <RouterLink to="/login">Login</RouterLink>
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

#signup-form {
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
  /* gap: 5px; */
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