
<script setup>
import { reactive, ref } from 'vue'
import { useValidator } from '@/composables/useValidator'
import { useUserStore } from '@/stores/userStore'
import { useTaskStore } from '@/stores/taskStore'
import { useRoute } from 'vuetify/lib/composables/router'
import CancelIcon from '@/assets/icons/CancelIcon.vue'
import { storeToRefs } from 'pinia'

// const { get_user_data } = useUserStore()

const route = useRoute()

const taskStore = useTaskStore()
const { taskToEdit } = storeToRefs(taskStore)
const { toggle_edit_task_dialog, get_all_task_in_collection, edit_task, selectTask } =
  useTaskStore()

defineEmits(['showTaskDialog'])

// const { validate_goal_title_field, validate_goal_description_field } = useValidator()

const isLoading = ref(false)
const formData = ref({
  newContent: taskToEdit.value.content || '',
  newNote: taskToEdit.value.note || '',
})
const taskId = ref(taskToEdit.value.taskId || '')
const collectionId = ref(route.value.params.id)

const contentFieldeValidator = ref({ valid: true, errorMsg: '' })
const noteFieldValidator = ref({ valid: true, errorMsg: '' })

const validate_task_content_field = (data) => {
  if (data === '' || data === null) {
    return { valid: false, errorMsg: 'Field is required' }
  }

  return { valid: true, errorMsg: '' }
}

const validate_task_note_field = (data) => {
  if (data === null) {
    return { valid: false, errorMsg: 'Field is required' }
  }
  return { valid: true, errorMsg: '' }
}

const validateField = (field) => {
  if (field === 'content') {
    contentFieldeValidator.value = validate_task_content_field(formData.value.newContent)
    return
  }

  if (field === 'note') {
    noteFieldValidator.value = validate_task_note_field(formData.value.newNote)
    return
  }
}
const validateForm = async () => {
  validateField('content')
  validateField('note')

  return contentFieldeValidator.value.valid && noteFieldValidator.value.valid
}

const run_edit_new_task = async () => {
  const isFormValid = await validateForm()
  if (!isFormValid) {
    console.log('Form is not valid')
    return
  }

  console.log('form valid is', isFormValid)

  isLoading.value = true
  const result = await edit_task(formData.value, collectionId.value, taskId.value)
  isLoading.value = false
  if (!result.success) {
    console.log(result.message)
    return
  }

  console.log(result.message)

  await get_all_task_in_collection(collectionId.value)
  selectTask()
  toggle_edit_task_dialog()
  return
}
</script>

<template>
  <v-form @submit.prevent="run_edit_new_task" id="editTask-form">
    <div class="w-100 d-flex justify-center align-center">
      <span id="h-text">Edit Task</span>
      <!-- <CancelIcon @click="$emit('showDialog')" class="cancel-icon" /> -->
    </div>
    <!-- Content Feild -->
    <div class="form-group">
      <div class="input-field">
        <label for="content">content</label>
        <input
          type="text"
          id="content"
          placeholder="input content"
          class="rounded-lg"
          v-model="formData.newContent"
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

    <!-- Note Feild -->
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
          v-model="formData.newNote"
        ></v-textarea>
      </div>
      <div class="input-details">
        <Transition name="input-error-fade">
          <span v-if="!noteFieldValidator.valid" class="text-error">{{
            noteFieldValidator.errorMsg
          }}</span>
        </Transition>
      </div>
    </div>

    <div class="w-100 btn d-flex ga-5 flex-column justify-space-around">
      <v-btn type="submit" id="add-btn" class="rounded-md py-5" variant="tonal" block>
        <v-progress-circular v-if="isLoading" indeterminate></v-progress-circular>
        <span v-if="!isLoading">Update</span>
      </v-btn>
      <v-btn
        @click.prevent.stop="toggle_edit_task_dialog()"
        class="rounded-md py-5"
        variant="outlined"
        block
        >Cancel</v-btn
      >
    </div>
  </v-form>
</template>

<style lang="css" scoped>
#editTask-form {
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