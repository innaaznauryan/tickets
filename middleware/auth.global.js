export default defineNuxtRouteMiddleware(async (to, from) => {
    if (process.client) {
        if (to.name === "login") {
            if (localStorage.jwt) {
                return navigateTo("/")
            } else {
                return
            }
        }
        if (to.name !== "login") {
            if (localStorage.jwt) {
                return
            } else {
                return navigateTo("/login")
            }
        }
    }
})