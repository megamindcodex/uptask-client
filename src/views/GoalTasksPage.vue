
<script setup>
import { useRoute } from 'vuetify/lib/composables/router'
import { useTaskStore } from '@/stores/taskStore'
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

const route = useRoute()
const collectionId = ref(route.value.params.id)

const taskStore = useTaskStore()
const {
  taskDialog,
  editTaskDisplay,
  tasks,
  goalTitle,
  goalDescription,
  taskDeleteDialog,
  taskToBeDeletedId,
} = storeToRefs(taskStore)
const {
  toggle_add_task_dialog,
  toggle_edit_task_dialog,
  toggle_task_delete_dialog,

  get_all_task_in_collection,
  toggle_task_tick,
  delete_task,
} = useTaskStore()

// const toBeDeleted = []
const selected = ref('')

const selectTask = (taskId) => {
  // console.log(taskId)
  if (taskId === null || taskId === '') {
    selected.value = null
    return
  }

  selected.value = taskId
}

const cancel = (taskId) => {
  selected.value = ''
  console.log(`cancel button clicked for task with id: ${taskId}`)
}

const run_delet_task = async () => {
  const result = await delete_task(taskToBeDeletedId.value, collectionId.value)
  if (!result.success) {
    console.log(result.message)
    return
  }

  console.log(result.message)
  toggle_task_delete_dialog()
  await get_all_task_in_collection(collectionId.value)
}

const run_toggle_task_tick = async (taskId) => {
  const result = await toggle_task_tick(taskId, collectionId.value)

  if (!result.success) {
    console.log(result.message)
    return
  }

  await get_all_task_in_collection(collectionId.value)
  selectTask()
  console.log(result.message)
  return
}
onMounted(async () => {
  await get_all_task_in_collection(collectionId.value)
  // console.log(goalTitle.value)
  // console.log(tasks.value)
})
</script>
<template>
  <div id="cont">
    <!-- Sub Header for goal title and goal description -->
    <div id="sub-head" class="px-2">
      <div id="goal-title">
        <span class="">{{ goalTitle }}</span>
      </div>
      <div id="goal-description">
        <p class="text-subtitle">{{ goalDescription }}</p>
      </div>
    </div>
    <div v-if="tasks.length" class="wrapper px-2">
      <div class="task-item" v-for="task in tasks" :key="task._id">
        <TickIcon id="tick-icon" v-show="task.tick && task._id !== selected" />
        <div id="row-1">
          <div id="content" class="text-subtitle-1 font-weight-bold">{{ task.content }}</div>
          <DotMenuIcon
            id="dot-option-icon"
            v-if="selected !== task._id"
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
          <div id="row-2" v-show="task._id === selected">
            <span id="check-btn" v-if="!task.tick">
              <CompleteIcon
                id="complete-icon"
                class="complete-icon"
                @click="run_toggle_task_tick(task._id)"
              />
            </span>
            <span id="check-solid-btn" v-if="task.tick">
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
            <span
              id="chevronRight-btn"
              v-ripple="{ class: 'text-black' }"
              @click="cancel(task._id)"
            >
              <!-- <CancelIcon id="cancel-icon" /> -->
              <ChevronRightIcon id="chevronRight-icon" />
            </span>
          </div>
        </transition>
      </div>
    </div>
    <div
      v-else
      class="w-100 d-flex flex-column align-center justify-center ga-4"
      @click="toggle_add_task_dialog()"
      v-ripple="{ class: 'text-teal' }"
    >
      <div id="add-box" class="d-flex flex-column align-center justify-self-center">
        <AddFileIcon class="add-icon" />
        <span>Click to add task to this goal</span>
      </div>
    </div>
  </div>

  <!--Dailog for adding new task in user task collection -->
  <v-dialog v-model="taskDialog" class="d-flex justify-center align-center">
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
  <v-dialog v-model="editTaskDisplay" class="d-flex justify-center align-center">
    <v-card
      max-width="400"
      max-height="400"
      class="w-100 pa-3 d-flex justify-center align-self-center"
    >
      <EditTaskFrom />
    </v-card>
  </v-dialog>

  <!-- Delete Collection -->
  <v-dialog id="delete-task-dialog" v-model="taskDeleteDialog">
    <v-card id="del-dialog" class="card w-100 pa-4 ga-4 rounded-xl">
      <div class="w-100 d-flex flex-column align-center justify-center">
        <v-card-title>Delete this task?</v-card-title>
      </div>
      <div class="w-100 d-flex ga-2 align-center justify-space-between">
        <v-btn variant="tonal" class="w-50 text-red rounded-lg" @click="run_delet_task()"
          >delete</v-btn
        >
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
  /* align-items: center; */
  margin: 5px;
  /* border: 1px solid blue; */
}

#sub-head {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
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

.wrapper {
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 100%;
  padding: 1rem;
  background-color: #cdedf2;
  border-style: dashed;
  border-color: #086977;
  cursor: pointer;
}

.add-icon {
  width: 100px;
  height: 100px;
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

#del-dialog {
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