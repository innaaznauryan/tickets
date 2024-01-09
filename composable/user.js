import {ref} from "vue"
import apiClient from "~/apiClient.js"

export const user = ref(null)
export const userError = ref(null)

export const getUser = async () => {
    try {
        const response = await apiClient.get("/user")
        user.value = response.data[0]
    } catch (error) {
        console.log(error)
        userError.value = "Something went wrong"
    }
}

export const updateUser = async (user) => {
    try {
        const response = await apiClient.put("/user/" + user.id, {...user})
        user.value = response.data
    } catch (error) {
        console.log(error)
        userError.value = "Something went wrong"
    }
}