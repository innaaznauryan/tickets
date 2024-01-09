<template>
  <div v-if="!loading" :key="id" class="profileContainer">
    <form @submit.prevent="handleSave">
      <div>
        <label for="firstName" :style="{cursor: ticketId ? 'default' : 'pointer'}">First Name</label>
        <BaseInput id="firstName" v-model="profile.firstName" :disabled="!!ticketId"></BaseInput>
      </div>
      <div>
        <label for="lastName" :style="{cursor: ticketId ? 'default' : 'pointer'}">Last Name</label>
        <BaseInput id="lastName" v-model="profile.lastName" :disabled="!!ticketId"></BaseInput>
      </div>
      <div>
        <label for="birthday" :style="{cursor: ticketId ? 'default' : 'pointer'}">Birthday</label>
        <VueDatePicker
            id="birthday"
            v-model="profile.birthday"
            format="yyyy-MM-dd"
            :disabled="!!ticketId"
            class="CustomCalendar">
        </VueDatePicker>
      </div>
      <div>
        <label for="city" :style="{cursor: ticketId ? 'default' : 'pointer'}">City</label>
        <select v-model="profile.city" id="city" :disabled="!!ticketId">
          <option
              v-for="city in cities"
              :value="city"
              :key="city">
            {{ city }}
          </option>
        </select>
      </div>
      <div>
        <label for="info" :style="{cursor: ticketId ? 'default' : 'pointer'}">Details</label>
        <textarea
            id="info"
            v-model="profile.info"
            :disabled="!!ticketId">
        </textarea>
      </div>
      <BaseButton v-if="!ticketId">Save</BaseButton>
    </form>
  </div>
</template>

<script setup>
import {ref, watch} from "vue"
import {user, getUser, updateUser} from "../composable/user.js"
import {singleTicket, getSingleTicket} from "../composable/tickets.js"
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const {id} = useRoute().params
const {ticketId} = useRoute().query

const loading = ref(true)
const profile = ref(null)
const cities = ["Scranton", "Honesdale", "Colorado", "New York"]

const handleSave = async () => {
  const updatedProfile = {
    ...profile.value, birthday: new Date(profile.value.birthday).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    })
  }
  await updateUser(updatedProfile)
}

watch(
    () => id,
    async () => {
      await getUser()
      if (user.value.id === id) {
        profile.value = user.value
        console.log(profile.value)
      } else {
        await getSingleTicket(ticketId)
        profile.value = singleTicket.value.author
        console.log(profile.value.city)
      }
      loading.value = false
    },
    {immediate: true}
)

definePageMeta({
  breadcrumbs: [
    {name: "Home", path: "/"},
    {name: "Profile"}
  ]
})
</script>

<style lang="scss" scoped>
.profileContainer {
  width: 40%;
  margin: 0 auto;
  box-shadow: 0 0px 20px 3px rgb(0 0 0 / 0.1);
  padding: 20px;
  border-radius: 5px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 10px;

  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;

    textarea {
      resize: none;
      width: 80%;
      height: 100px;
    }

    select, input {
      width: 30%;
    }

    select, textarea {
      padding: 10px;
      border-radius: 5px;
      border: 1px solid #ddd;
      font-family: inherit;
    }
  }
}

.CustomCalendar {
  width: 30%;
  font-family: inherit;
}
</style>