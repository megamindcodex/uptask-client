import jsCookie from "js-cookie"


export const useCookie = () => {


    // Set accessToken in Browser Cookie
    const setCookie = async (token) => {
        try {
            jsCookie.set(cookieName, token, { expires: 1 })
            return
        } catch (err) {
            console.log(err)
            return
        }
    }


    const cookieName = "uptask-access-token"

    // function to get the cookie using the cookie name
    const getCookie = async () => {
        try {

            const accessToken = jsCookie.get(cookieName)

            if (!accessToken) {
                console.log("cookie not found")
                return null
            }

            return accessToken

        } catch (err) {
            console.error("Error finding cookie", err.message)
            return null
        }
    }




    return { setCookie, getCookie }

}