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
import GoalCard from '@/components/GoalCard.vue'
import CreateNewCollectionFrom from '@/components/CreateNewCollectionFrom.vue'
import EditCollectionForm from '@/components/EditCollectionForm.vue'

const { toggle_alert } = useAlertStore()
const router = useRouter()
const { navigateTo } = useNavigatorStore()
const { getUserData } = useUserStore()

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

onMounted(async () => {
  isContentLoading.value = true
  await get_all_task_collections()
  isContentLoading.value = false
})
</script>

<template>
  <div id="cont" v-if="!isContentLoading">
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

    <div v-if="taskCollections?.length < 1" class="empty-hint">
      <span>You have no goals yet. Tap below to add one.</span>
    </div>

    <!-- Add new goal -->
    <div id="add-box" @click="toggle_create_collection_dialog()" v-ripple="{ class: 'text-teal' }">
      <PlusIcon class="plus-icon" />
      <span>Add New Goal</span>
    </div>
  </div>
</template>

<style scoped>
/* Container styling */
#cont {
  width: 100%;
  height: 100%;
  padding: 1rem 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  align-items: center;
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
  font-size: 0.9rem;
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
  background: #fff7f7;
  /* border-left: 4px solid #d7263d; */
  box-shadow: 0 6px 20px rgba(20, 25, 38, 0.12);
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
</style>
