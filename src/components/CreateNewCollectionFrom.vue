
<script setup>
import { reactive, ref } from 'vue'
import { useValidator } from '@/composables/useValidator'
import { useUserStore } from '@/stores/userStore'
import { useCollectionStore } from '@/stores/collectionStore'
import { useAlertStore } from '@/stores/alertStore'

import CancelIcon from '@/assets/icons/CancelIcon.vue'

const { toggle_alert } = useAlertStore()

// const { get_user_data } = useUserStore()

// defineEmits(['showCollectionDialog'])

const { validate_goal_title_field, validate_goal_description_field } = useValidator()

const { toggle_create_collection_dialog, create_new_collection, get_all_task_collections } =
  useCollectionStore()

const isLoading = ref(false)
const formData = reactive({
  title: '',
  description: '',
})

const titleFieldeValidator = ref({ valid: true, errorMsg: '' })
const descriptionFieldValidator = ref({ valid: false, errorMsg: '' })

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

const run_create_new_collection = async () => {
  const isFormValid = validateForm()
  if (isFormValid === false) {
    console.log('Form is not valid')
    return
  }

  isLoading.value = true
  const result = await create_new_collection(formData)
  isLoading.value = false
  if (!result.success) {
    toggle_alert({ type: 'error', text: result.message })
    console.log(result.message)
    return
  }

  toggle_alert({ type: 'success', text: result.message })
  console.log(result.message)
  await get_all_task_collections()
  toggle_create_collection_dialog()
  return
  // console.log(`form valid is ${isFormValid}`)
}
</script>

<template>
  <v-form @submit.prevent="run_create_new_collection" id="addCollection-form">
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
          <span v-if="!titleFieldeValidator.valid" class="text-error">{{
            titleFieldeValidator.errorMsg
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
          <span v-if="!descriptionFieldValidator.valid" class="text-error">{{
            descriptionFieldValidator.errorMsg
          }}</span>
        </Transition>
      </div>
    </div>

    <div class="w-100 btn d-flex ga-5 flex-column justify-space-around">
      <v-btn type="submit" id="add-btn" class="rounded-md py-5" variant="tonal" block>
        <v-progress-circular v-if="isLoading" indeterminate></v-progress-circular>
        <span v-if="!isLoading">Add</span>
      </v-btn>
      <v-btn
        @click.prevent.stop="toggle_create_collection_dialog()"
        class="rounded-md py-5"
        variant="outlined"
        block
        >Cancel</v-btn
      >
    </div>
  </v-form>
</template>

<style lang="css" scoped>
#addCollection-form {
  position: relative;
  width: 100%;
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
  justify-content: center;
  /* background-color: blue; */
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