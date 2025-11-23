
import apiClient from "@/api/axiosConfig";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useCookie } from "@/composables/useCookie";
import { useAlertStore } from "./alertStore";


export const useUserStore = defineStore("userStore", () => {

    const { toggle_alert } = useAlertStore()

    const { setCookie, getCookie } = useCookie()

    const accessToken = ref(null)
    const userData = ref({})
    const totalCollection = ref(0)
    const totalCollectionCompleted = ref(0)
    const totalCollection_notCompleted = ref(0)







    // ******************Register user code functions****************//
    const registerUser = async (formData) => {
        try {
            const res = await apiClient.post("/auth/register", formData)

            if (res.status !== 201) {
                throw new Error(res.data?.message || "Registration Failed") // Manually Throw Error into the catch block to be handled properly
            }

            accessToken.value = await setCookie(res.data?.accessToken)
            if (res.data.cookie === null) {
                throw new Error("No cookie returned. but try Logging in now")
            }

            userData.value = res.data.newUser


            // toggle_alert({ type: "success", text: res.data.message })
            return { success: true, message: res.data.message }

        } catch (err) {
            const msg = err.response?.data?.message || err.message || "Unkown registration error occurred"
            // toggle_alert({ type: "error", text: msg })
            console.error(`Registration error: ${msg}`)
            return { success: false, message: msg }
        }
    }



    // ********************Login user code function****************//
    const loginUser = async (formData) => {
        try {
            const res = await apiClient.post("/auth/login", formData)

            if (res.status !== 200) {
                throw new Error(res.data?.message || "Log-in Failed") // Manually Throw Error into the catch block to be handled properly
            }

            accessToken.value = await setCookie(res.data?.accessToken)
            if (res.data.cookie === null) {
                throw new Error("No cookie returned. but try Logging in now")
            }


            userData.value = res.data.user

            // toggle_alert({ type: "success", text: res.data.message })
            return { success: true, message: res.data.message }
        } catch (err) {
            const msg = err.response?.data?.message || err.message || "Unkown log-in error occurred"
            // toggle_alert({ type: "error", text: msg })
            console.error(`Log-in error: ${msg}`)
            return { success: false, message: msg }

        }
    }



    // ********************Request reset code function****************//
    const request_resetCode = async (email) => {
        try {
            const res = await apiClient.post("/auth/request-password-reset-code", { email: email })

            if (res.status !== 200) {
                throw new Error(res.data?.message || "Request reset code Failed")
            }

            accessToken.value = await setCookie(res.data?.accessToken)
            if (res.data.cookie === null) {
                throw new Error("No cookie returned. but try Logging in now")
            }



            // toggle_alert({ type: "info", text: res.data.message })
            return { success: true, message: res.data?.message }


        } catch (err) {
            const msg = err.response?.data?.message || err.message || "Unkown request reset code error"
            // toggle_alert({ type: "error", text: msg })
            console.error(`request_resetCode error: ${msg}`)
            return { success: false, message: msg }
        }
    }


    // ********************Request reset code function****************//
    const verify_resetCode = async (email, resetCode) => {
        try {
            const res = await apiClient.post("/auth/verify-reset-code", { email, resetCode })

            if (res.status !== 200) {
                throw new Error(res.data?.message || "Verify reset code Failed")
            }

            // toggle_alert({ type: "success", text: res.data.message })
            return { success: true, message: res.data?.message }
        } catch (err) {
            const msg = err.response?.data?.message || err.message || "Unknown verify_resetCode error"
            // toggle_alert({ type: "error", text: msg })
            console.log(`verify_resetCode error: ${msg}`)
            return { success: false, message: msg }
        }
    }

    // ********************Reset Password function****************//
    const reset_user_password = async (formData) => {
        try {
            const res = await apiClient.post("/auth/reset-password", formData)

            if (res.status !== 200) {
                throw new Error(res.data?.message || "Reset user password Failed")
            }



            // toggle_alert({ type: "success", text: res.data.message })
            return { success: true, message: res.data?.message }
        } catch (err) {
            const msg = err.response?.data?.message || err.message || "Unkown reset user password error"
            // toggle_alert({ type: "error", text: msg })
            console.log(`reset_user_password error: ${msg} `)
            return { success: false, message: msg }
        }
    }

    // ******************** Get User data function****************//
    const get_user_data = async () => {
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
            const res = await apiClient.get("/api/get-user-data", reqConfig)

            if (res.status !== 200) {
                throw new Error(res.data.message || "Get user data Failed")
            }

            userData.value = res.data.user
            totalCollection.value = userData.value.taskCollections.length
            // console.log(userData.value)
            return { success: true, message: res.data.message }

        } catch (err) {
            const msg = err.response?.data?.message || err.message || "Unkown get_user_data error"
            console.error(`get_user_data error: ${msg}`)
            return { success: false, message: msg }
        }
    }





    return {
        userData,
        totalCollection,
        totalCollectionCompleted,

        registerUser,
        loginUser,
        request_resetCode,
        verify_resetCode,
        reset_user_password,

        get_user_data
    }
})
