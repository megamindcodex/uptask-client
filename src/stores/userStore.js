
import apiClient from "@/api/axiosConfig";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useCookie } from "@/composables/useCookie";


export const useUserStore = defineStore("userStore", () => {

    const { setCookie, getCookie } = useCookie()

    const accessToken = ref(null)
    const userData = ref({})







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


            return { success: true, message: res.data.message }

        } catch (err) {
            const msg = err.response?.data?.message || err.message || "Unkown registration error occurred"
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


            userData.value = res.data.newUser

            return { success: true, message: res.data.message }
        } catch (err) {
            const msg = err.response?.data?.message || err.message || "Unkown log-in error occurred"
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


            return { success: true, message: res.data?.message }


        } catch (err) {
            const msg = err.response?.data?.message || err.message || "Unkown request reset code error"
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

            return { success: true, message: res.data?.message }
        } catch (err) {
            const msg = err.response?.data?.message || err.message || "Unknown verify_resetCode error"
            console.log(`verify_resetCode error: ${msg}`)
            return { success: false, message: msg }
        }
    }

    // ********************Reset Password function****************//
    const reset_user_password = async (formData) => {
        try {
            const res = await apiClient.post("/auth/reset-password", formData)

            if (res.status !== 200) {
                throw new Error(res.data?.message || "Reset user passeord Failed")
            }

            return { success: true, message: res.data?.message }
        } catch (err) {
            const msg = err.response?.data?.message || err.message || "Unkown reset user password error"
            console.log(`reset_user_password error: ${msg} `)
            return { success: false, message: msg }
        }
    }
    return {
        userData,

        registerUser,
        loginUser,
        request_resetCode,
        verify_resetCode,
        reset_user_password
    }
})
