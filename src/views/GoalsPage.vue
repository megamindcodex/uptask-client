<script setup>
import { ref, reactive, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useNavigatorStore } from '@/stores/navigator'

import { useUserStore } from '@/stores/userStore'
import { useCollectionStore } from '@/stores/collectionStore'

import PlusIcon from '@/assets/icons/PlusIcon.vue'
import AddFileIcon from '@/assets/icons/AddFileIcon.vue'
// import { allGoals } from '@/constant/testState'
import GoalCard from '@/components/GoalCard.vue'
import CreateNewCollectionFrom from '@/components/CreateNewCollectionFrom.vue'
import EditCollectionForm from '@/components/EditCollectionForm.vue'

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

const deleteDialog = ref(false)
const toBeDeletedId = ref('')

const toggle_collection_delete_dialog = (goalId) => {
  deleteDialog.value = !deleteDialog.value
  toBeDeletedId.value = goalId || ''
  // console.log('display dialog variable is now:', display.value)
  // console.log(`about to delete collection with id: ${toBeDeletedId.value}`)
}

const run_delete_collection = async (goalId) => {
  const result = await delete_collection(goalId)
  if (!result.success) {
    console.log(result.message)
    return
  }

  // console.log(result.message)
  toggle_collection_delete_dialog()
}

onMounted(async () => {
  const result = await get_all_task_collections()
  // console.log(result.message)
})
</script>


<template>
  <div id="cont" class="px-2">
    <!-- <div v-for="col in taskCollections" :key="col.id" class="w-100 d-flex justify-center"> -->
    <GoalCard
      v-for="col in taskCollections"
      :key="col._id"
      :collection="col"
      @display-dialog="toggle_collection_delete_dialog(col._id)"
      @toggle-edit-collection-dialog="toggle_Edit_collection_dialog(col, 'open')"
    />
    <!-- </div> -->

    <!-- Dialog for creating new task colletion -->
    <v-dialog v-model="collectionCreateDialog" class="d-flex justify-center align-center">
      <!-- <div class="overLay-child"> -->
      <v-card
        max-width="400"
        max-height="400"
        class="w-100 pa-3 d-flex justify-center align-self-center"
      >
        <CreateNewCollectionFrom @show-collection-dialog="toggle_create_collection_dialog" />
      </v-card>
      <!-- </div> -->
    </v-dialog>

    <!-- Edit Collection Dialog -->
    <v-dialog v-model="collectionEditDisplay" class="d-flex justify-center align-center">
      <v-card
        max-width="400"
        max-height="400"
        class="w-100 pa-3 d-flex justify-center align-self-center"
      >
        <EditCollectionForm />
      </v-card>
    </v-dialog>

    <!-- Delete Collection -->
    <v-dialog id="delete-collection-dialog" v-model="deleteDialog">
      <v-card id="del-dialog" class="card w-100 pa-4 ga-4 rounded-xl">
        <div class="w-100 d-flex flex-column align-center justify-center">
          <v-card-title>Delete this Goal?</v-card-title>
        </div>
        <div class="w-100 d-flex ga-2 align-center justify-space-between">
          <v-btn
            variant="tonal"
            class="w-50 text-red rounded-lg"
            @click="run_delete_collection(toBeDeletedId)"
            >delete</v-btn
          >
          <v-btn
            variant="outlined"
            class="w-50 rounded-lg"
            @click="toggle_collection_delete_dialog()"
            >cancel</v-btn
          >
        </div>
      </v-card>
    </v-dialog>

    <div v-if="taskCollections.length < 1"><span>Tap below to add new goal</span></div>
    <div id="add-box" @click="toggle_create_collection_dialog()" v-ripple="{ class: 'text-teal' }">
      <PlusIcon class="plus-icon" />
      <span>Add new task collection</span>
    </div>
  </div>
</template>


<style lang="css" scoped>
#cont {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  /* justify-content: center; */
  align-items: center;
  /* margin-top: 100px; */
}

#add-box {
  position: relative;
  width: 100%;
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #cdedf2;
  border-style: dashed;
  border-color: #086977;
  color: #086977;
}

.plus-icon {
  stroke: #086977;
  stroke-width: 0.2px;
}

.add-icon {
  width: 100px;
  height: 100px;
}

#del-dialog {
  position: relative;
  top: 150px;
}
</style>