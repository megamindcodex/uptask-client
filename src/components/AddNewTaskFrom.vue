
<script setup>
import { reactive, ref } from 'vue'
import { useValidator } from '@/composables/useValidator'
import { useAlertStore } from '@/stores/alertStore'
import { useUserStore } from '@/stores/userStore'
import { useTaskStore } from '@/stores/taskStore'
import { useRoute } from 'vuetify/lib/composables/router'
import CancelIcon from '@/assets/icons/CancelIcon.vue'

// const { get_user_data } = useUserStore()

const route = useRoute()
const goalId = ref(route.value.params.id)

const { toggle_alert } = useAlertStore()

const { toggle_add_task_dialog, add_new_task, get_all_task_in_collection } = useTaskStore()

defineEmits(['showTaskDialog'])

// const { validate_goal_title_field, validate_goal_description_field } = useValidator()

const isLoading = ref(false)
const formData = reactive({
  content: '',
  note: null,
  collectionId: goalId.value,
})

const contentFieldeValidator = ref({ valid: true, errorMsg: '' })

const validate_task_content_field = (data) => {
  if (data === '' || data === null) {
    return { valid: false, errorMsg: 'Field is required' }
  }

  return { valid: true, errorMsg: '' }
}

const validateField = (field) => {
  if (field === 'content') {
    contentFieldeValidator.value = validate_task_content_field(formData.content)
    return
  }
}

const validateForm = () => {
  validateField('content')
  return contentFieldeValidator.value.valid
}

const run_add_new_task = async () => {
  const isFormValid = validateForm()
  if (isFormValid === false) {
    console.log('Form is not valid')
    return
  }

  console.log(`form valid is ${isFormValid}`)

  isLoading.value = true
  const result = await add_new_task(formData)
  isLoading.value = false
  if (!result.success) {
    toggle_alert({ type: 'error', text: result.message })
    console.log(result.message)
    return
  }

  console.log(result.message)
  toggle_alert({ type: 'success', text: 'New task added!' })
  await get_all_task_in_collection(goalId.value)
  toggle_add_task_dialog()
  return
}
</script>

<template>
  <v-form @submit.prevent="run_add_new_task" id="addTask-form" class="form">
    <div class="w-100 d-flex justify-center align-center">
      <span id="h-text">Add New Task</span>
      <!-- <CancelIcon @click="$emit('showDialog')" class="cancel-icon" /> -->
    </div>
    <!-- Title Feild -->
    <div class="form-group">
      <div class="input-field">
        <label for="title">task</label>
        <input
          type="text"
          id="title"
          placeholder="input task"
          class="rounded-lg"
          @blur="validateField('content')"
          v-model="formData.content"
        />
      </div>
      <div class="input-details">
        <Transition name="input-error-fade">
          <span v-if="!contentFieldeValidator.valid" class="text-error">{{
            contentFieldeValidator.errorMsg
          }}</span>
        </Transition>
      </div>
    </div>

    <!-- description Feild -->
    <div class="form-group">
      <div class="input-field">
        <label for="note">Note (optional)</label>
        <v-textarea
          type="text"
          id="note"
          label="Add note to task (optional)"
          rows="1"
          no-resize
          variant="outlined"
          v-model="formData.note"
        ></v-textarea>
      </div>
      <!-- <div class="input-details">
        <Transition name="input-error-fade">
          <span v-if="!descriptionFieldValidator.valid" class="text-error">{{
            descriptionFieldValidator.errorMsg
          }}</span>
        </Transition>
      </div> -->
    </div>

    <div class="w-100 btn d-flex ga-5 flex-column justify-space-around">
      <v-btn type="submit" id="add-btn" class="rounded-md py-5" variant="tonal" block>
        <v-progress-circular v-if="isLoading" indeterminate></v-progress-circular>
        <span v-if="!isLoading">Add</span>
      </v-btn>
      <v-btn
        @click.prevent.stop="toggle_add_task_dialog()"
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
  /* gap: 0.5rem; */
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