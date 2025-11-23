import apiClient from "@/api/axiosConfig";
import { defineStore, storeToRefs } from "pinia";
import { computed, reactive, ref } from "vue";
import { useCookie } from "@/composables/useCookie";
import { useUserStore } from "./userStore";


export const useCollectionStore = defineStore("collectionStore", () => {

    const userStore = useUserStore()
    const { userData } = storeToRefs(userStore)
    const { get_user_data } = useUserStore()


    const taskCollections = ref([])
    // const totalCollection = ref(0)
    // const totalCollectionCompleted = ref(0)
    const collectionCreateDialog = ref(false)
    const collectionEditDisplay = ref(false)
    const collectionToEdit = ref({})
    // const collectionId = ref(null)

    // const totalCollection = computed(() => {
    //     // safely handle cases where userData or taskCollections may be undefined
    //     return taskCollections.value?.length ?? 0
    // })






    const { getCookie } = useCookie()


    const accessToken = ref(null)





    const toggle_create_collection_dialog = () => {
        collectionCreateDialog.value = !collectionCreateDialog.value
        // console.log(`collectionCreateDialog is: ${collectionCreateDialog.value}`)
    }

    const toggle_Edit_collection_dialog = (data, type) => {

        if (type === 'open') {
            // console.log(data)
            collectionEditDisplay.value = true
            collectionToEdit.value = {
                collectionId: data._id,
                title: data.title,
                description: data.description
            }


            // console.log(collectionToEdit.value.collectionId)
            // console.log(`collectionEditDisplay is: ${collectionEditDisplay.value}`)
            return
        }

        collectionEditDisplay.value = false
        collectionToEdit.value = null
        // console.log(`collectionEditDisplay is: ${collectionEditDisplay.value}`)
        return
    }

    const create_new_collection = async (formData) => {
        try {
            accessToken.value = await getCookie()
            if (!accessToken.value) {
                throw new Error("No access token in cookie")
            }

            // console.log(accessToken.value)
            const reqConfig = {
                headers: {
                    Authorization: `Bearer ${accessToken.value}`
                }
            }

            // console.log(reqConfig.headers)

            const res = await apiClient.post("/api/create-new-collection", formData, reqConfig)

            if (res.status !== 201) {
                throw new Error(res.data.message || "Create new task collection Failed")
            }

            taskCollections.value.push(res.data.newCollection)
            // console.log(res.data.newCollection)
            // console.log(`${res.data.message}: ${taskCollections.value[0]}`)
            return { success: true, message: res.data?.message }

        } catch (err) {
            const msg = err.response?.data?.message || err.message || "Unkown create_new_collection error"
            console.log(`create_new_collection error: ${msg}`)
            return { success: false, message: msg }
        }
    }



    const edit_collection = async (formData) => {
        try {
            console.log(collectionToEdit.value.collectionId)
            const collectionId = collectionToEdit.value.collectionId
            accessToken.value = await getCookie()
            if (!accessToken.value) {
                throw new Error("No access token in cookie")
            }

            const reqConfig = {
                headers: {
                    Authorization: `Bearer ${accessToken.value}`
                },
                params: {
                    collectionId
                }
            }

            const res = await apiClient.put("/api/edit-collection/", formData, reqConfig)

            if (res.status !== 200) {
                throw new Error(res.data.message || "Edit task collection Failed")
            }

            await get_all_task_collections()
            return { success: true, message: res.data?.message }

        } catch (err) {
            const msg = err.response?.data?.message || err.message || "Unkown edit_collection error"
            console.log(`edit_collection error: ${msg}`)
            return { success: false, message: msg }
        }

    }



    const get_all_task_collections = async () => {
        try {
            //>>>>>>>>>>>>>>> this Logic block is meant to be used 
            //if one choses to get all user task collection using
            // the API method <<<<<<<<<<<<<<<<//

            // accessToken.value = await getCookie()
            // if (!accessToken.value) {
            //     throw new Error("No access token in cookie")
            // }
            // const reqConfig = {
            //     headers: {
            //         Authorization: `Bearer ${accessToken.value}`
            //     }
            // }
            // const res = await apiClient.get("/api/get-all-collections", reqConfig)
            // if (res.status !== 200) {
            //     throw new Error(res.data.message || "get all task collection Failed")
            // }
            // taskCollections.value = res.data.taskCollections
            // return { success: true, message: res.data.message }

            const result = await get_user_data()
            if (!result.success) {
                throw new Error(result.message || "Something went wrong!")
            }

            taskCollections.value = userData.value.taskCollections

            // totalCollection.value = userData.value.taskCollections.length

            return { success: false, message: "get all task collection successfull", data: taskCollections.value }

        } catch (err) {
            const msg = err.response?.data?.message || err?.message || "Unkown get_all_task_collection error"
            console.log(msg)
            return { success: false, message: msg }
        }
    }


    const delete_collection = async (collectionId) => {
        try {
            accessToken.value = await getCookie()

            if (!accessToken.value) {
                throw new Error("No access token in cookie")
            }

            const reqConfig = {
                headers: {
                    Authorization: `Bearer ${accessToken.value}`
                },
                params: { collectionId }
            }

            const res = await apiClient.delete("/api/delete-collection/", reqConfig)

            if (res.status !== 200) {
                throw new Error(res.data.message || "Delete task collection failed")
            }

            await get_all_task_collections()

            return { success: true, message: res.data.message }

        } catch (err) {
            const msg = err.response?.data?.message || err.message || "Unknown delete_task_collection error"
            console.log(`delete_task_collection error: ${msg}`)
            return { success: false, message: msg }
        }
    }



    return {
        taskCollections,
        // totalCollection,
        // totalCollectionCompleted,
        collectionCreateDialog,
        collectionEditDisplay,
        collectionToEdit,

        toggle_create_collection_dialog,
        toggle_Edit_collection_dialog,
        create_new_collection,
        edit_collection,
        get_all_task_collections,
        delete_collection
    }
})