import { defineStore, storeToRefs } from "pinia";
import { useCookie } from "@/composables/useCookie";
import { ref } from "vue";


export const useAuthStore = defineStore("authStore", () => {

    const { getCookie } = useCookie()
    const isAuthenticated = ref(false)


    const checkAuth = async () => {
        try {
            const accessToken = await getCookie()

            if (accessToken === "" || accessToken === null) {
                isAuthenticated.value = false
                return
            }

            isAuthenticated.value = true

        } catch (err) {
            const msg = err.message
            console.log(msg)
            return { success: false, message: err.msg }
        }
    }




    return {
        isAuthenticated,

        checkAuth
    }
})