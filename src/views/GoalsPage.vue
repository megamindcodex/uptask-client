<script setup>
import { ref, reactive, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useNavigatorStore } from '@/stores/navigator'

import { useUserStore } from '@/stores/userStore'
import { useCollectionStore } from '@/stores/collectionStore'
import { useAlertStore } from '@/stores/alertStore'

import PlusIcon from '@/assets/icons/PlusIcon.vue'
import AddFileIcon from '@/assets/icons/AddFileIcon.vue'
import ErrorIcon from '@/assets/icons/ErrorIcon.vue'
import ReloadIcon from '@/assets/icons/ReloadIcon.vue'
import GoalCard from '@/components/GoalCard.vue'
import CreateNewCollectionFrom from '@/components/CreateNewCollectionFrom.vue'
import EditCollectionForm from '@/components/EditCollectionForm.vue'

const { toggle_alert } = useAlertStore()
const router = useRouter()
const { navigateTo } = useNavigatorStore()
const userStore = useUserStore()
const { get_user_data } = useUserStore()
const { userData } = storeToRefs(userStore)

const collectionStore = useCollectionStore()
const { collectionCreateDialog, taskCollections, collectionEditDisplay } =
  storeToRefs(collectionStore)

const {
  toggle_create_collection_dialog,
  toggle_Edit_collection_dialog,
  get_all_task_collections,
  delete_collection,
} = useCollectionStore()

const isContentLoading = ref(false)
const contentError = ref(false)
const isLoading = ref(false)
const deleteDialog = ref(false)
const toBeDeletedId = ref('')

const toggle_collection_delete_dialog = (goalId) => {
  deleteDialog.value = !deleteDialog.value
  toBeDeletedId.value = goalId || ''
}

const run_delete_collection = async (goalId) => {
  isLoading.value = true
  const result = await delete_collection(goalId)
  isLoading.value = false

  if (!result.success) {
    toggle_alert({ type: 'error', text: result.message })
    return
  }

  toggle_collection_delete_dialog()
  toggle_alert({ type: 'success', text: result.message })
}

const reload_get_all_task_collection_function = async () => {
  contentError.value = false
  isContentLoading.value = true
  const result = await get_all_task_collections()
  isContentLoading.value = false

  if (!result.success) {
    contentError.value = true
    return
  }

  return
}

onMounted(async () => {
  isContentLoading.value = true
  const result = await get_all_task_collections()
  isContentLoading.value = false

  if (!result.success) {
    contentError.value = true
    return
  }
})
</script>

<template>
  <div id="cont">
    <div v-if="!isContentLoading" class="wrapper">
      <GoalCard
        v-for="col in taskCollections"
        :key="col._id"
        :collection="col"
        @display-dialog="toggle_collection_delete_dialog(col._id)"
        @toggle-edit-collection-dialog="toggle_Edit_collection_dialog(col, 'open')"
      />

      <!-- Create dialog -->
      <v-dialog persistent v-model="collectionCreateDialog" class="dialog-center">
        <v-card class="dialog-card rounded-xl pa-4">
          <CreateNewCollectionFrom @show-collection-dialog="toggle_create_collection_dialog" />
        </v-card>
      </v-dialog>

      <!-- Edit dialog -->
      <v-dialog persistent v-model="collectionEditDisplay" class="dialog-center">
        <v-card class="dialog-card rounded-xl pa-4">
          <EditCollectionForm />
        </v-card>
      </v-dialog>

      <!-- Delete dialog -->
      <v-dialog persistent v-model="deleteDialog" class="dialog-center">
        <v-card class="delete-card rounded-lg pa-4">
          <v-card-title class="text-center text-red mb-4">Delete this Goal?</v-card-title>

          <div class="btn-row">
            <v-btn variant="tonal" class="btn-delete" @click="run_delete_collection(toBeDeletedId)">
              <v-progress-circular v-if="isLoading" indeterminate></v-progress-circular>
              <span v-if="!isLoading">Delete</span>
            </v-btn>
            <v-btn variant="outlined" class="btn-cancel" @click="toggle_collection_delete_dialog()">
              <span> Cancel</span>
            </v-btn>
          </div>
        </v-card>
      </v-dialog>

      <div v-if="taskCollections?.length < 1 && contentError !== true" class="empty-hint">
        <span>You have no goals yet. Tap below to add goals.</span>
      </div>

      <!-- Add new goal -->
      <div
        v-if="contentError !== true"
        id="add-box"
        @click="toggle_create_collection_dialog()"
        v-ripple="{ class: 'text-teal' }"
      >
        <PlusIcon class="plus-icon" />
        <span>Add New Goal</span>
      </div>
    </div>

    <!-- Loader Components -->
    <div id="loader" v-if="isContentLoading">
      <v-skeleton-loader :loading="isContentLoading" type="paragraph" class="loader-item">
        <!-- <v-list-item lines="three" subtitle="Subtitle" title="Title"></v-list-item> -->
      </v-skeleton-loader>
      <v-skeleton-loader :loading="isContentLoading" type="paragraph" class="loader-item">
        <!-- <v-list-item lines="three" subtitle="Subtitle" title="Title"></v-list-item> -->
      </v-skeleton-loader>
      <v-skeleton-loader :loading="isContentLoading" type="paragraph" class="loader-item">
        <!-- <v-list-item lines="three" subtitle="Subtitle" title="Title"></v-list-item> -->
      </v-skeleton-loader>
      <v-skeleton-loader :loading="isContentLoading" type="paragraph" class="loader-item">
        <!-- <v-list-item lines="three" subtitle="Subtitle" title="Title"></v-list-item> -->
      </v-skeleton-loader>
      <v-skeleton-loader :loading="isContentLoading" type="paragraph" class="loader-item">
        <!-- <v-list-item lines="three" subtitle="Subtitle" title="Title"></v-list-item> -->
      </v-skeleton-loader>
      <v-skeleton-loader :loading="isContentLoading" type="paragraph" class="loader-item">
        <!-- <v-list-item lines="three" subtitle="Subtitle" title="Title"></v-list-item> -->
      </v-skeleton-loader>
      <v-skeleton-loader :loading="isContentLoading" type="paragraph" class="loader-item">
        <!-- <v-list-item lines="three" subtitle="Subtitle" title="Title"></v-list-item> -->
      </v-skeleton-loader>
    </div>

    <v-card id="content-error" v-if="contentError" variant="flat">
      <ErrorIcon id="error-icon" />
      <span>Somthing went wrong. please try again, or reload the page</span>
      <span class="d-flex align-center ga-2">
        Reload<ReloadIcon id="reload-icon" @click="reload_get_all_task_collection_function()"
      /></span>
    </v-card>
  </div>
</template>

<style scoped>
/* Container styling */
#cont {
  width: 100%;
  height: 100%;
  /* padding: 1rem 0.5rem; */
  display: flex;
  flex-direction: column;
  align-items: center;
}

.wrapper {
  width: 100%;
  height: auto;
  padding: 1rem 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  /* align-items: center; */
}

/* Add Box (CTA) */
#add-box {
  width: 100%;
  height: 100px;
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

.plus-icon {
  width: 28px;
  height: 28px;
  margin-bottom: 3px;
  stroke: #2f4858;
}

/* Empty hint text */
.empty-hint {
  margin-top: 1rem;
  color: #556b78;
  font-size: 1.1rem;
  opacity: 0.7;
}

/* Dialog styling */
.dialog-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.dialog-card {
  width: 100%;
  max-width: 400px;
  background: #ffffff;
  box-shadow: 0 6px 20px rgba(20, 25, 38, 0.15);
}

/* Delete dialog */
.delete-card {
  width: 100%;
  max-width: 360px;
  text-align: center;
}

.btn-row {
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
}

.btn-delete {
  width: 50%;
  color: #d7263d;
  /* background-color: #d7263d !important; */
}

.btn-cancel {
  width: 50%;
  color: #2f4858;
  border-color: #2f4858 !important;
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
  fill: red;
  stroke-width: 10px;
}

#reload-icon {
  width: 40px;
  height: 40px;
  fill: #1c7ff8;
  transition: 0.2s ease;
}

#reload-icon:hover {
  fill: #0a4d9e;
  scale: 1.1;
  transition: 0.2s ease;
}
#content-error button {
  background-color: #e6e3e3;
  width: 50%;
  max-width: 300px;
  color: blue;
  padding: 8px 0px;
  border-radius: 8px;
}
</style>
