<script setup>
import { computed, onMounted, ref } from 'vue'
import { useNavigatorStore } from '@/stores/navigator'
import { useCollectionStore } from '@/stores/collectionStore'
import { useTaskStore } from '@/stores/taskStore'
import TaskCompleteIcon from '@/assets/icons/TaskCompleteIcon.vue'
import TrashIcon from '@/assets/icons/TrashIcon.vue'
import EditIcon from '@/assets/icons/EditIcon.vue'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

const { navigateTo } = useNavigatorStore()
const { toggle_Edit_collection_dialog } = useCollectionStore()

const props = defineProps(['collection'])
defineEmits(['displayDialog', 'toggleEditCollectionDialog'])

const timestamp = ref(props.collection.createdAt)
const timeStampFormatted = dayjs(timestamp.value).format('HH:mm, MM/DD')

const tasksCompleted = computed(() => {
  const tasks = props.collection.tasks || []
  if (tasks.length === 0) return false
  return tasks.every((task) => task.tick === true)
})
</script>

<template>
  <v-card class="card rounded-lg" variant="outlined">
    <div id="col-1" @click="navigateTo(`/goals/${props.collection._id}`)">
      <span id="title">{{ props.collection.title }}</span>
      <span id="sub-title">{{ props.collection.description }}</span>

      <div class="d-flex align-center">
        <span id="timestamp-txt">{{ timeStampFormatted }}</span>

        <div v-if="tasksCompleted" class="w-100 d-flex align-center justify-center">
          <span class="txt-complete">Completed</span>
          <TaskCompleteIcon id="task-complete-icon" />
        </div>
      </div>
    </div>

    <div id="col-2">
      <EditIcon id="edit-icon" @click="toggle_Edit_collection_dialog(props.collection, 'open')" />
      <TrashIcon id="trash-icon" @click="$emit('displayDialog')" />
    </div>
  </v-card>
</template>

<style scoped>
/* Card Container */
.card {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0.7rem;
  border-radius: 10px;
  border: 1px solid #0f8193;
  /* background: #f1f7f8; */
  transition: 0.25s ease-in-out;
}

/* Hover subtle lift + color pop */
.card:hover {
  border-color: #086977;
  /* transform: translateY(-2px); */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.07);
}

/* Content Column */
#col-1 {
  width: 100%;
  display: flex;
  gap: 5px;
  flex-direction: column;
  cursor: pointer;
}

#col-1 span {
  padding: 3px 0;
}

#title {
  max-width: 300px;
  font-size: 1.25rem;
  font-weight: 600;
  color: #086977;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

#sub-title {
  font-size: 1rem;
  color: #2f4858;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Right-side Column */
#col-2 {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding-left: 10px;
  /* border-left: 1px solid #0f8193; */
  background: rgba(15, 129, 147, 0.08);
}

/* Icons */
#edit-icon {
  width: 22px;
  height: 22px;
  fill: #222121;
  cursor: pointer;
  transition: 0.2s;
}
#edit-icon:hover {
  /* transform: scale(1.15); */
}

#trash-icon {
  width: 25px;
  height: 25px;
  fill: #222121;
  cursor: pointer;
  transition: 0.2s;
}
#trash-icon:hover {
  /* transform: scale(1.2); */
}

/* Completed Tag */
.txt-complete {
  font-size: 0.9rem;
  font-weight: 600;
  color: #0a8f34;
}

#task-complete-icon {
  width: 20px;
  height: 20px;
  fill: #0a8f34;
}

#timestamp-txt {
  font-size: 12px;
  color: #2f4858;
}
</style>
