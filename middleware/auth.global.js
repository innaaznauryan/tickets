export default defineNuxtRouteMiddleware(async (to, from) => {
    if (process.client) {
        if (to.name === "login" && localStorage.jwt) {
            return navigateTo("/")
        }
        if (to.name !== "login" && !localStorage.jwt) {
            return navigateTo("/login")
        }
    }
})