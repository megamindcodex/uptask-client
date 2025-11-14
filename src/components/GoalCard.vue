<script setup>
import { computed, onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useNavigatorStore } from '@/stores/navigator'
import { useCollectionStore } from '@/stores/collectionStore'
import { useTaskStore } from '@/stores/taskStore'

import TrashIcon from '@/assets/icons/TrashIcon.vue'
import EditIcon from '@/assets/icons/EditIcon.vue'
import TaskCompleteIcon from '@/assets/icons/TaskCompleteIcon.vue'

const { navigateTo } = useNavigatorStore()

const { toggle_Edit_collection_dialog } = useCollectionStore()

// props can also be assing to a variable incase it is meant to be used in the script or computed. like the mothod right below
// defindProps(["goals"])
const props = defineProps(['collection'])

defineEmits(['displayDialog', 'toggleEditCollectionDialog'])

const taskStore = useTaskStore()
// const { tasks } = storeToRefs(taskStore)
// const { get_all_task_in_collection } = useTaskStore()

const tasksCompleted = computed(() => {
  const tasks = props.collection.tasks || []

  if (tasks.length === 0) {
    return false
  }

  return tasks.every((tasks) => {
    // console.log('tasks checked value:', tasks.tick)
    return tasks.tick === true
  })
})

onMounted(async () => {
  // await get_all_task_in_collection(props.collection._id)
})
</script>

<template>
  <v-card class="card rounded-lg" variant="outlined">
    <div id="col-1" @click="navigateTo(`/goals/${props.collection._id}`)">
      <span id="title">{{ props.collection.title }}</span>
      <span id="sub-title">{{ props.collection.description }}</span>
      <div class="d-flex align-center">
        <span id="txt">Date: {{ props.collection.date }}</span>
        <div v-if="tasksCompleted" class="w-100 d-flex align-center justify-center">
          <span class="txt-complete pa-0">Completed</span>
          <TaskCompleteIcon id="task-complete-icon" />
        </div>
      </div>
    </div>
    <div id="col-2" class="">
      <EditIcon id="edit-icon" @click="toggle_Edit_collection_dialog(props.collection, 'open')" />
      <TrashIcon id="trash-icon" @click="$emit('displayDialog')" />
    </div>
  </v-card>
</template>

<style lang="css" scoped>
.card {
  position: relative;
  border-radius: 0;
  width: 100%;
  display: flex;
  gap: 5px;
  /* flex-direction: column; */
  justify-content: space-between;
  border: 1px solid #ffc93e;
  transition: 0.3s ease-in-out;
  padding: 0.5rem;
}

#col-1 {
  width: 100%;
  display: flex;
  gap: 5px;
  flex-direction: column;
  /* border-bottom: 1px solid #000; */
}
#col-1 span {
  padding: 5px;
}

#title {
  font-size: 1.2rem;
  color: #2f4858;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 600;
}

#sub-title {
  font-size: 1rem;
  color: #2f4858;
}

#col-2 {
  position: relative;
  /* width: 100%; */
  height: 100%;
  display: flex;
  /* gap: 94px; */
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: #c7d4dd1a;
}

.card:hover {
  color: #2f4858;
  border: 1px solid #2f4858;
}

/* span {
  font-size: 1rem;
  color: #086977;
  cursor: pointer;
} */

#trash-cont {
  position: relative;
  padding: 5px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

#edit-icon {
  width: 27px;
  height: 27px;
  fill: #086977;
  cursor: pointer;
}

#trash-icon {
  position: relative;
  width: 27px;
  height: 27px;
  fill: red;
}

.txt-complete {
  font-size: 0.9rem;
  color: green;
}

#task-complete-icon {
  position: relative;
  width: 20px;
  height: 20px;
  fill: green;
  /* stroke-width: 20px; */
}

#delete-task-dialog {
  color: #c6ddec57;
}
</style>
