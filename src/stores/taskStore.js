import { defineStore, storeToRefs } from "pinia";
import apiClient from "@/api/axiosConfig";
import { computed, ref } from "vue";
import { useCookie } from "@/composables/useCookie";
import { useCollectionStore } from "./collectionStore";
export const useTaskStore = defineStore("taskStore", () => {
    const collectionStore = useCollectionStore()
    const { taskCollections } = storeToRefs(collectionStore)
    const { get_all_task_collections } = useCollectionStore()

    const collection = ref({})
    const goalTitle = ref("")
    const goalDescription = ref("")
    const tasks = ref([])
    const taskDialog = ref(false)
    const editTaskDisplay = ref(false)
    const taskToEdit = ref({})
    const taskDeleteDialog = ref(false)
    const taskToBeDeletedId = ref(null)


    const { getCookie } = useCookie()
    const accessToken = ref(null)






    const toggle_add_task_dialog = () => {
        taskDialog.value = !taskDialog.value
        // console.log(`dialog is: ${taskDialog.value}`)
    }

    const toggle_edit_task_dialog = (type, data) => {
        if (type === 'open') {

            taskToEdit.value = {
                content: data.content,
                note: data.note,
                taskId: data._id,
            }
            editTaskDisplay.value = true
            console.log(taskToEdit.value)
            return
        }

        editTaskDisplay.value = !editTaskDisplay.value
        taskToEdit.value = null
        // console.log(`edit dialog is: ${editTaskDisplay.value}`)
        return
    }


    const toggle_task_delete_dialog = (type, taskId) => {
        if (type === 'open') {
            taskToBeDeletedId.value = taskId
            taskDeleteDialog.value = true

            console.log("taskToBeDeletedIds is: ", taskToBeDeletedId.value)

            return
        }
        taskDeleteDialog.value = !taskDeleteDialog.value
        // console.log(`delete dialog is: ${taskDeleteDialog.value}`)
    }



    const add_new_task = async (formData) => {
        try {
            accessToken.value = await getCookie()
            if (!accessToken.value) {
                throw new Error("No access token in cookie")
            }

            const reqConfig = {
                headers: {
                    Authorization: `Bearer ${accessToken.value}`
                }
            }

            const res = await apiClient.post("/api/add-task", formData, reqConfig)

            if (res.status !== 201) {
                throw new Error(res.data.message || "add_new_ task Failed")
            }

            return { success: true, message: res.data.message }

        } catch (err) {
            const msg = err.response.data.message || err.message || "Unkown add_new_task error"
            return { success: false, message: msg }
        }
    }



    // Fetch all task in a particular collection
    const get_all_task_in_collection = async (collectionId) => {
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
            //     },
            //     params: {
            //         collectionId
            //     }

            // }

            // const res = await apiClient.get("/api/get-all-tasks-in-collection", reqConfig)

            // if (res.status !== 200) {
            //     throw new Error(res.data.message || "get_all_task_in_collection Failed")
            // }
            // tasks.value = res.data.tasks
            // return { success: true, message: res.data.message }



            // This actual function invocation is meant to be used
            // if one choses to get all user task collection from 
            // the store directly instead of making an API call
            await get_all_task_collections()
            // console.log(taskCollections.value)

            // console.log(`collectionId passed is: ${collectionId}`)
            collection.value = await taskCollections.value.find(col => col._id === collectionId)
            // console.log(taskCollections.value)
            if (!collection.value) {
                throw new Error(`could not find this particular colletion with the id: ${collectionId}`)
            }

            tasks.value = collection.value.tasks
            goalTitle.value = collection.value.title
            goalDescription.value = collection.value.description



            return { success: true, message: `All task in user taskCollection ${collectionId} Fetched`, data: tasks.value }

        } catch (err) {
            const msg = err.response?.data?.message || err.message || "Unkown get_all_task_in_collection error"
            console.error(msg)
            return { success: false, message: msg }
        }
    }


    const edit_task = async (formData, collectionId, taskId) => {
        console.log(`formData: ${formData}, collectionId: ${collectionId}, taskId: ${taskId}`)
        try {
            accessToken.value = await getCookie()
            if (!accessToken.value) {
                throw new Error("No access token in cookie")
            }
            const reqConfig = {
                headers: {
                    Authorization: `Bearer ${accessToken.value}`
                },
                params: {
                    taskId,
                    collectionId
                }
            }
            const res = await apiClient.put("/api/edit-task", formData, reqConfig)

            if (res.status !== 200) {
                throw new Error(res.data.message || "edit_task Failed")
            }
            return { success: true, message: res.data.message }

        } catch (err) {
            const msg = err?.response?.data?.message || err.message || "Unkown edit_task error"
            return { success: false, message: msg }
        }
    }


    const toggle_task_tick = async (taskId, collectionId) => {
        try {
            accessToken.value = await getCookie()

            if (!accessToken.value) {
                throw new Error("No access token in cookies")
            }

            const reqConfig = {
                headers: {
                    Authorization: `Bearer ${accessToken.value}`
                },
                params: { taskId, collectionId }
            }

            const res = await apiClient.put("/api/toggle-task-tick", {}, reqConfig)

            if (res.status !== 200) {
                throw new Error(res.data.message || "toggle task tick failed")
            }

            return { success: true, message: res.data.message }

        } catch (err) {
            const msg = err?.response?.data?.message || err.message || "Unknown tick_task error"
            return { success: false, message: msg }
        }
    }



    const delete_task = async (taskId, collectionId) => {
        console.log(`taskId: ${taskId}, collectionId: ${collectionId}`)
        try {
            // const formData = {
            //     taskId,
            //     collectionId
            // }

            accessToken.value = await getCookie()
            if (!accessToken.value) {
                throw new Error("No access token in cookie")
            }
            const reqConfig = {
                headers: {
                    Authorization: `Bearer ${accessToken.value}`
                },
                params: {
                    taskId,
                    collectionId
                }
            }
            const res = await apiClient.delete("/api/delete-task", reqConfig)
            if (res.status !== 200) {
                throw new Error(res.data.message || "Delete task Failed")
            }
            return { success: true, message: res.data.message }
        } catch (err) {
            const msg = err.response.data.message || err.message || "Unkown delete_task error"
            return { success: false, message: msg }
        }

    }




    return {
        taskDialog,
        editTaskDisplay,
        taskDeleteDialog,
        taskToBeDeletedId,
        taskToEdit,
        goalTitle,
        goalDescription,
        collection,
        tasks,


        toggle_add_task_dialog,
        toggle_edit_task_dialog,
        toggle_task_delete_dialog,

        add_new_task,
        get_all_task_in_collection,
        edit_task,
        toggle_task_tick,
        delete_task
    }
})