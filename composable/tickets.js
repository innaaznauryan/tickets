import {ref} from "vue"
import apiClient from "~/apiClient.js"

export const tickets = ref([])
export const singleTicket = ref(null)
export const ticketsError = ref(null)

export const getTickets = async () => {
    try {
        const response = await apiClient.get("/tickets")
        tickets.value = response.data
    } catch (error) {
        console.log(error)
        ticketsError.value = "Something went wrong"
    }
}

export const getSingleTicket = async (id) => {
    try {
        const response = await apiClient.get("/tickets/" + id)
        singleTicket.value = response.data
    } catch (error) {
        console.log(error)
        ticketsError.value = "Something went wrong"
    }
}