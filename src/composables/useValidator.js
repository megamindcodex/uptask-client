
//######## Field Validator ######## //
export const useValidator = () => {

    //######## goal title field Validator ######## //
    const validate_goal_title_field = (data) => {
        if (data === "" || data === null) {
            return { valid: false, errorMsg: "goal title required" }
        } else if (data.length < 4) {
            return { valid: false, errorMsg: "goal title must be at least 4 characters" }
        }

        return { valid: true, errorMsg: "" }
    }


    //######## goal Description field Validator ######## //
    const validate_goal_description_field = (data) => {
        if (data === "" || data === null) {
            return { valid: false, errorMsg: "goal description required" }
        }

        return { valid: true, errorMsg: "" }
    }





    //************************************* VALIDATION FOR MAIN FORM INPUT FIELD ********************************\\

    //######## Email Field Validator ######## //
    const validate_email_field = (data) => {
        if (data === "" || data === null) {
            return { valid: false, errorMsg: "email required" }
        }

        return { valid: true, errorMsg: "" }
    }

    //######## UserName Field Validator ######## //
    const validate_userName_field = (data) => {
        if (data === "" || data === null) {
            return { valid: false, errorMsg: "username required" }
        } else if (data.lenght < 4) {
            return { valid: false, errorMsg: "user name must be at least 4 characters" }
        }

        return { valid: true, errorMsg: "" }
    }

    //######## Password Field Validator ######## //
    const validate_password_field = (data) => {

        // console.log(`password validation running: ${data}`)
        if (data === "" || data === null) {
            return { valid: false, errorMsg: "password required" }
        }
        if (data.length < 8) {
            return { valid: false, errorMsg: "password needs to be at least 8 characters" }
        }

        return { valid: true, errorMsg: "" }
    }

    //######## Confirm Password Field Validator ######## //
    const validate_confirmPassowrd_field = (password, confirmPassowrd) => {
        if (!confirmPassowrd || confirmPassowrd === "" || confirmPassowrd === "") {
            return { valid: false, errorMsg: "please confirm your password" }
        } else if (confirmPassowrd !== password) {
            return { valid: false, errorMsg: "password does not match" }
        }


        return { valid: true, errorMsg: "" }
    }


    //######## Reset Code Field Validator ######## //
    const validate_resetCode_field = (data) => {
        if (!data || data === '') {
            return { valid: false, errorMsg: 'reset code required' }
        }

        return { valid: true, errorMsg: '' }
    }



    return {
        validate_goal_title_field,
        validate_goal_description_field,

        validate_userName_field,
        validate_email_field,
        validate_password_field,
        validate_confirmPassowrd_field,
        validate_resetCode_field

    }
}