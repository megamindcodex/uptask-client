import { defineStore } from "pinia";
import { ref } from "vue";
import { computeColor } from "vuetify/lib/composables/color";


export const useAlertStore = defineStore("useStore", () => {

    const message = ref({})
    const alertDisplay = ref(false)



    const toggle_alert = (data) => {
        message.value = data
        alertDisplay.value = true

        // console.log(message.value)
        // console.log(alertDisplay.value)


        // setTimeout(() => {
        //     hide_alert()
        // }, 4000)
    }

    const hide_alert = () => {
        alertDisplay.value = false
        message.value = {}
    }




    return {
        message,
        alertDisplay,

        toggle_alert,
        hide_alert
    }
})