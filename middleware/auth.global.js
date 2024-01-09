import {user, getUser} from "~/composable/user.js"
export default defineNuxtRouteMiddleware(async (to, from) => {
    await getUser()
    if(to.name === "login") {
        if(user.value.isLoggedIn) {
            return navigateTo("/")
        } else {
            return
        }
    }
    if(to.name !== "login" && to.name !== "index") {
        if(user.value.isLoggedIn) {
            return
        } else {
            return navigateTo("/login")
        }
    }
})