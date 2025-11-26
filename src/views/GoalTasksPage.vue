
<script setup>
import { useRoute } from 'vuetify/lib/composables/router'
import { useTaskStore } from '@/stores/taskStore'
import { useAlertStore } from '@/stores/alertStore'
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref } from 'vue'

import AddNewTaskFrom from '@/components/AddNewTaskFrom.vue'
import EditTaskFrom from '@/components/EditTaskFrom.vue'

import AddFileIcon from '@/assets/icons/AddFileIcon.vue'
import DotMenuIcon from '@/assets/icons/DotOptioncon.vue'
import ChevronLeftIcone from '@/assets/icons/ChevronLeftIcone.vue'
import ChevronRightIcon from '@/assets/icons/ChevronRightIcon.vue'
import ArrowLeftIcon from '@/assets/icons/ArrowLeftIcon.vue'
import SolidCompleteIcon from '@/assets/icons/SolidCompleteIcon.vue'
import CompleteIcon from '@/assets/icons/CompleteIcon.vue'
import EditIcon from '@/assets/icons/EditIcon.vue'
import TrashIcon from '@/assets/icons/TrashIcon.vue'
import CancelIcon from '@/assets/icons/CancelIcon.vue'
import TickIcon from '@/assets/icons/TickIcon.vue'
import ErrorIcon from '@/assets/icons/ErrorIcon.vue'
import ReloadIcon from '@/assets/icons/ReloadIcon.vue'

const route = useRoute()
const collectionId = ref(route.value.params.id)

const { toggle_alert } = useAlertStore()

const taskStore = useTaskStore()
const {
  taskDialog,
  editTaskDisplay,
  tasks,
  goalTitle,
  goalDescription,
  taskDeleteDialog,
  taskToBeDeletedId,
  selectedTask,
} = storeToRefs(taskStore)
const {
  toggle_add_task_dialog,
  toggle_edit_task_dialog,
  toggle_task_delete_dialog,

  selectTask,
  cancel_selectedTask,

  get_all_task_in_collection,
  toggle_task_tick,
  delete_task,
} = useTaskStore()

// const toBeDeleted = []

const isLoadingDelete = ref(false)
const isLoadingcheckTask = ref(false)
const isContentLoading = ref(false)
const contentError = ref(false)

// run delete task function
const run_delet_task = async () => {
  isLoadingDelete.value = true
  const result = await delete_task(taskToBeDeletedId.value, collectionId.value)
  isLoadingDelete.value = false
  if (!result.success) {
    isLoadingDelete.value = false
    toggle_alert({ type: 'error', text: `${result.message}!` })
    console.log(result.message)
    return
  }

  console.log(result.message)
  toggle_alert({ type: 'success', text: `${result.message}!` })

  toggle_task_delete_dialog()
  await get_all_task_in_collection(collectionId.value)
  return
}

//run Toggle toggle task tick function
const run_toggle_task_tick = async (taskId) => {
  isLoadingcheckTask.value = true
  const result = await toggle_task_tick(taskId, collectionId.value)
  isLoadingcheckTask.value = false

  if (!result.success) {
    toggle_alert({ type: 'error', text: result.message })
    console.log(result.message)
    return
  }

  toggle_alert({ type: 'info', text: 'updated' })
  await get_all_task_in_collection(collectionId.value)
  selectTask()
  console.log(result.message)
  return
}

// reload get all task in collection function
const reload_get_all_task_in_collection_function = async () => {
  contentError.value = false
  isContentLoading.value = true
  const result = await get_all_task_in_collection(collectionId.value)
  isContentLoading.value = false

  if (!result.success) {
    contentError.value = true
    return
  }

  return
}
onMounted(async () => {
  isContentLoading.value = true
  const result = await get_all_task_in_collection(collectionId.value)
  isContentLoading.value = false

  if (!result.success) {
    contentError.value = true
    return
  }

  // console.log(goalTitle.value)
  // console.log(tasks.value)
})
</script>
<template>
  <div id="cont">
    <!-- Sub Header for goal title and goal description -->
    <div v-if="!isContentLoading" id="sub-head" class="px-2">
      <div id="goal-title">
        <span class="">{{ goalTitle }}</span>
      </div>
      <div id="goal-description">
        <p class="text-subtitle">{{ goalDescription }}</p>
      </div>
    </div>
    <div v-if="!isContentLoading" id="wrapper">
      <div id="task-item-wrapper" class="px-2">
        <div class="task-item" v-for="task in tasks" :key="task._id">
          <TickIcon id="tick-icon" v-show="task.tick && task._id !== selectedTask" />
          <div id="row-1">
            <div id="content" class="text-subtitle-1 font-weight-bold">{{ task.content }}</div>
            <DotMenuIcon
              id="dot-option-icon"
              v-if="selectedTask !== task._id"
              @click="selectTask(task._id)"
            />
            <!-- <ChevronLeftIcone
            id="chevronLeft-icon"
            v-if="selected !== task._id"
            @click="selectTask(task._id)"
          /> -->
            <!-- <ArrowLeftIcon
            id="ArrowLeft-icon"
            v-if="selected !== task._id"
            @click="selectTask(task._id)"
          /> -->
          </div>
          <transition name="grow-fade">
            <div id="row-2" v-show="task._id === selectedTask">
              <v-progress-circular
                v-if="isLoadingcheckTask"
                size="25"
                color="green"
                indeterminate
              ></v-progress-circular>
              <span id="check-btn" v-if="!task.tick && !isLoadingcheckTask">
                <!-- this shows when the an individual task is unchecked -->
                <CompleteIcon
                  id="complete-icon"
                  class="complete-icon"
                  @click="run_toggle_task_tick(task._id)"
                />
              </span>
              <span id="check-solid-btn" v-if="task.tick && !isLoadingcheckTask">
                <!-- this shows when the an individual task is checked -->
                <SolidCompleteIcon
                  id="solid-complete-icon"
                  class="solid-complete-icon"
                  @click="run_toggle_task_tick(task._id)"
                />
              </span>
              <span
                id="edit-btn"
                v-ripple="{ class: 'text-black' }"
                @click="toggle_edit_task_dialog((type = 'open'), task)"
              >
                <EditIcon id="edit-icon" />
              </span>
              <span
                id="delete-btn"
                v-ripple="{ class: 'text-black' }"
                @click="toggle_task_delete_dialog((type = 'open'), task._id, collectionId)"
              >
                <TrashIcon id="trash-icon" />
              </span>
              <span id="chevronRight-btn" v-ripple="{ class: 'text-black' }" @click="selectTask()">
                <!-- <CancelIcon id="cancel-icon" /> -->
                <ChevronRightIcon id="chevronRight-icon" />
              </span>
            </div>
          </transition>
        </div>
      </div>

      <!-- Add new Task -->
      <div class="pa-4">
        <div
          v-if="tasks?.length < 1 && contentError !== true"
          id="add-box"
          @click="toggle_add_task_dialog()"
          v-ripple="{ class: 'text-teal' }"
          class="w-100 d-flex flex-column align-center justify-self-center"
        >
          <AddFileIcon class="add-icon" />
          <span>Click to add task to this goal</span>
        </div>
      </div>
    </div>

    <!-- Loader Components -->
    <div id="loader" v-if="isContentLoading">
      <v-skeleton-loader :loading="isContentLoading" type="list-item" class="loader-item">
        <!-- <v-list-item lines="three" subtitle="Subtitle" title="Title"></v-list-item> -->
      </v-skeleton-loader>
      <v-skeleton-loader :loading="isContentLoading" type="list-item" class="loader-item">
        <!-- <v-list-item lines="three" subtitle="Subtitle" title="Title"></v-list-item> -->
      </v-skeleton-loader>
      <v-skeleton-loader :loading="isContentLoading" type="list-item" class="loader-item">
        <!-- <v-list-item lines="three" subtitle="Subtitle" title="Title"></v-list-item> -->
      </v-skeleton-loader>
      <v-skeleton-loader :loading="isContentLoading" type="list-item" class="loader-item">
        <!-- <v-list-item lines="three" subtitle="Subtitle" title="Title"></v-list-item> -->
      </v-skeleton-loader>
      <v-skeleton-loader :loading="isContentLoading" type="list-item" class="loader-item">
        <!-- <v-list-item lines="three" subtitle="Subtitle" title="Title"></v-list-item> -->
      </v-skeleton-loader>
      <v-skeleton-loader :loading="isContentLoading" type="list-item" class="loader-item">
        <!-- <v-list-item lines="three" subtitle="Subtitle" title="Title"></v-list-item> -->
      </v-skeleton-loader>
      <v-skeleton-loader :loading="isContentLoading" type="list-item" class="loader-item">
        <!-- <v-list-item lines="three" subtitle="Subtitle" title="Title"></v-list-item> -->
      </v-skeleton-loader>
      <v-skeleton-loader :loading="isContentLoading" type="list-item" class="loader-item">
        <!-- <v-list-item lines="three" subtitle="Subtitle" title="Title"></v-list-item> -->
      </v-skeleton-loader>
      <v-skeleton-loader :loading="isContentLoading" type="list-item" class="loader-item">
        <!-- <v-list-item lines="three" subtitle="Subtitle" title="Title"></v-list-item> -->
      </v-skeleton-loader>
      <v-skeleton-loader :loading="isContentLoading" type="list-item" class="loader-item">
        <!-- <v-list-item lines="three" subtitle="Subtitle" title="Title"></v-list-item> -->
      </v-skeleton-loader>
      <v-skeleton-loader :loading="isContentLoading" type="list-item" class="loader-item">
        <!-- <v-list-item lines="three" subtitle="Subtitle" title="Title"></v-list-item> -->
      </v-skeleton-loader>
      <v-skeleton-loader :loading="isContentLoading" type="list-item" class="loader-item">
        <!-- <v-list-item lines="three" subtitle="Subtitle" title="Title"></v-list-item> -->
      </v-skeleton-loader>
    </div>

    <!-- Content Error -->
    <v-card id="content-error" v-if="contentError" variant="flat">
      <ErrorIcon id="error-icon" />
      <span>Somthing went wrong. please try again, or reload the page</span>
      <span class="d-flex align-center ga-2">
        Reload<ReloadIcon id="reload-icon" @click="reload_get_all_task_in_collection_function()"
      /></span>
    </v-card>
  </div>

  <!--Dailog for adding new task in user task collection -->
  <v-dialog persistent v-model="taskDialog" class="d-flex justify-center align-center">
    <div class="overLay-child">
      <v-card
        max-width="400"
        max-height="400"
        rounded="lg"
        class="w-100 pa-3 d-flex justify-center align-center align-self-center"
      >
        <AddNewTaskFrom />
      </v-card>
    </div>
  </v-dialog>

  <!-- Edit Collection Dialog -->
  <v-dialog persistent v-model="editTaskDisplay" class="d-flex justify-center align-center">
    <v-card
      max-width="400"
      max-height="400"
      class="w-100 pa-3 d-flex justify-center align-self-center"
    >
      <EditTaskFrom />
    </v-card>
  </v-dialog>

  <!-- Delete Collection -->
  <v-dialog persistent id="delete-task-dialog" v-model="taskDeleteDialog">
    <v-card id="del-card" class="card w-100 pa-4 ga-4 rounded-xl">
      <div class="w-100 d-flex flex-column align-center justify-center">
        <v-card-title>Delete this task?</v-card-title>
      </div>
      <div class="w-100 d-flex ga-2 align-center justify-space-between">
        <v-btn variant="tonal" class="w-50 text-red rounded-lg" @click="run_delet_task()">
          <v-progress-circular v-if="isLoadingDelete" indeterminate></v-progress-circular>

          <span v-if="!isLoadingDelete"> delete </span>
        </v-btn>
        <v-btn variant="outlined" class="w-50 rounded-lg" @click="toggle_task_delete_dialog()"
          >cancel</v-btn
        >
      </div>
    </v-card>
  </v-dialog>
</template>

<style lang="css" scoped>
#cont {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  gap: 1rem;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  margin: 5px;
  /* border: 1px solid blue; */
}

#sub-head {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #2f4858;
  text-transform: capitalize;
  border-bottom: 1px solid #086977;
  background-color: #08687738;
}

#goal-title {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  font-size: 1.6rem;
}

#goal-description {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  margin-bottom: 5px;
  color: #2f4858;
}

#wrapper {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
}

#task-item-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.task-item {
  position: relative;
  width: 100%;
  display: flex;
  gap: 5px;
  flex-direction: row;
}

#row-1 {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  border: 1px solid #554008;
  /* border: 3px solid #ffc93e; */
  padding: 0.6rem;
  /* border-radius: 12px 5px 12px 5px; */
  border-radius: 12px;
  color: #2f4858;
  /* background-color: #ffc93e; */
  /* color: #fff; */
  /* background-color: green; */
  overflow-x: scroll;
}

#dot-option-icon {
  top: 0;
  right: 5px;
  width: 40px;
  height: 40px;
  position: absolute;
}

#chevronLeft-icon {
  position: absolute;
  top: 10px;
  right: 0;
  width: 25px;
  height: 25px;
}

#ArrowLeft-icon {
  position: absolute;
  top: 10px;
  right: 0;
  width: 25px;
  height: 25px;
}

#tick-icon {
  position: absolute;
  width: 27px;
  height: 27px;
  bottom: -15px;
  right: -3px;
  z-index: 1;
  /* fill: green; */
  stroke: green;
  stroke-width: 3px;
}

#content {
  white-space: nowrap;
  text-overflow: ellipsis;
  /* overflow-x: hidden; */
}

#row-2 {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2px;
  transform-origin: right;
}

#check-btn,
#check-solid-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0px 0px 0px 0px;
}

#edit-btn {
  /* width: 50%; */
  display: flex;
  justify-content: center;
  align-items: center;
  /* border-radius: 0px 0px 0px 0px; */
}

#delete-btn {
  /* width: 50%; */
  display: flex;
  justify-content: center;
  align-items: center;
  /* border-radius: 0px 0px 0px 0px; */
}

#chevronRight-btn {
  /* width: 50%; */
  display: flex;
  justify-content: center;
  align-items: center;
  /* border-radius: 0px 5px 12px 0px; */
}

#add-box {
  width: 100%;
  height: auto;
  padding: 0.5rem 0px;
  border-radius: 16px;
  background: #ffffff;
  border: 2px dashed #9eb9c6;
  color: #2f4858;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: 0.3s ease-in-out;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(20, 25, 38, 0.05);
}

#add-box:hover {
  border-color: #2f4858;
  background: #f7fafc;
  /* transform: translateY(-2px); */
}

.add-icon {
  width: 80px;
  height: 80px;
  fill: #086977;
}

#add-box span {
  color: #086977;
}

#row-2 span {
  padding-left: 3px;
  padding-right: 3px;
}

#edit-icon {
  width: 20px;
  height: 20px;
  /* fill: #086977; */
  fill: currentColor;
}

#loader {
  width: 100%;
  align-self: start;
  display: flex;
  flex-direction: column;
}

.loder-item {
  width: 100%;
}

#content-error {
  width: 100%;
  max-width: 300px;
  height: 250px;
  display: flex;
  gap: 1rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0px 0.5rem;
  border: 1px solid #fca7a7;
  border-radius: 12px;
}

#error-icon {
  width: 60px;
  height: 60px;
  fill: red;
}

#reload-icon {
  width: 40px;
  height: 40px;
  fill: #2f4858;
  transition: 0.2s ease;
}

#reload-icon:hover {
  fill: #2594f6;
  scale: 1.1;
  transition: 0.2s ease;
}

.complete-icon {
  width: 20px;
  height: 20px;
  fill: gray;
  stroke-width: 10px;
}

.solid-complete-icon {
  width: 20px;
  height: 20px;
  fill: green;
  /* stroke: green; */
}

#trash-icon {
  width: 24px;
  height: 24px;
  /* stroke:; */
  fill: currentColor;
}

#chevronRight-icon {
  width: 30px;
  height: 30px;
  position: relative;
  stroke: currentColor;
}

#cancel-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 26px;
  height: 26px;
}

#del-card {
  position: relative;
  top: 150px;
}

.checked-complete-solid-icon {
  fill: green;
}
.unchecked-complete-solid-icon {
  fill: gray;
}

.grow-fade-enter-active {
  transition: width 0.3s ease;
}

.grow-fade-enter-from,
.grow-fade-leave-to {
  width: 0px;
  opacity: 0;
}

.grow-fade-enter-to,
.grow-fade-leave-from {
  width: 50%;
  opacity: 1;
}
</style>