
<script setup>
import { reactive, ref } from 'vue'
import { useValidator } from '@/composables/useValidator'
import CancelIcon from '@/assets/icons/CancelIcon.vue'

defineEmits(['showDialog'])

const { validate_goal_title_field, validate_goal_description_field } = useValidator()

const formData = reactive({
  title: '',
  description: '',
})

const titleFieldeValidator = ref({ valid: true, error: false, message: '' })
const descriptionFieldValidator = ref({ valid: false, error: false, message: '' })

const validateField = (field) => {
  if (field === 'title') {
    titleFieldeValidator.value = validate_goal_title_field(formData.title)
  }

  if (field === 'description') {
    descriptionFieldValidator.value = validate_goal_description_field(formData.description)
  }
}

const validateForm = () => {
  validateField('title')
  validateField('description')

  return titleFieldeValidator.value.valid && descriptionFieldValidator.value.valid
}

const add_task = () => {
  const isFormValid = validateForm()
  console.log(`form valid is ${isFormValid}`)
}
</script>

<template>
  <v-form @submit.prevent="add_task" id="addTask-form" class="form">
    <div class="w-100 d-flex justify-center align-center">
      <span id="h-text">Add New Goal</span>
      <!-- <CancelIcon @click="$emit('showDialog')" class="cancel-icon" /> -->
    </div>
    <!-- Title Feild -->
    <div class="form-group">
      <div class="input-field">
        <label for="title">title</label>
        <input
          type="text"
          id="title"
          placeholder="input goal title"
          class="rounded-lg"
          v-model="formData.title"
        />
      </div>
      <div class="input-details">
        <Transition name="input-error-fade">
          <span v-if="titleFieldeValidator.error" class="text-error">{{
            titleFieldeValidator.message
          }}</span>
        </Transition>
      </div>
    </div>

    <!-- description Feild -->
    <div class="form-group">
      <div class="input-field">
        <label for="description">Description</label>
        <input
          type="text"
          id="description"
          placeholder="decribe your goal"
          class="rounded-lg"
          v-model="formData.description"
        />
      </div>
      <div class="input-details">
        <Transition name="input-error-fade">
          <span v-if="descriptionFieldValidator.error" class="text-error">{{
            descriptionFieldValidator.message
          }}</span>
        </Transition>
      </div>
    </div>

    <div class="w-100 btn d-flex ga-5 flex-column justify-space-around">
      <v-btn type="submit" id="add-btn" class="rounded-md py-5" variant="tonal" block
        ><span>Add</span></v-btn
      >
      <v-btn
        @click.prevent.stop="$emit('showDialog')"
        class="rounded-md py-5"
        variant="outlined"
        block
        >Cancel</v-btn
      >
    </div>
  </v-form>
</template>

<style lang="css" scoped>
.form {
  position: relative;
  width: 100%;
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
  justify-content: center;
  /* border: 1px solid blue; */
}

#h-text {
  color: #086977;
  font-weight: 600;
  font-size: 1.2rem;
}

.form-group {
  position: relative;
  width: 100%;
  display: flex;
  gap: 5px;
  flex-direction: column;
  justify-content: center;
  /* border: 1px solid green; */
}

.input-field {
  width: 100%;
  display: flex;
  gap: 5px;
  flex-direction: column;
  /* border: 1px solid purple; */
}

.input-field label {
  width: fit-content;
  padding-left: 0.5rem;
  font-weight: 600;
  color: #086977;
  /* border: 1px solid pink; */
}

.input-field label:after {
  content: '*';
  font-size: 1rem;
  font-weight: 600;
}

.input-field input {
  /* border: 1px solid black; */
  outline: none;
  padding: 10px;
  border: 2px solid #8c8989;
}

.input-field input:focus {
  border: 2px solid #464545;
}

.input-details {
  width: 100%;
  height: 20px;
  display: flex;
  align-items: center;
  padding-left: 0.5rem;
  /* border: 1px solid red; */
}

.cancel-icon {
  position: absolute;
  right: 0;
  top: 0;
  stroke: #000;
}

#add-btn {
  color: #fff;
  background-color: #086977;
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