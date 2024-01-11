<template>
  <div v-if="!loading" :key="id" class="profileContainer">
    <form @submit.prevent="handleSave">
      <div>
        <div class="labelContainer">
          <label for="firstName" :style="{cursor: profile.id !== user.id ? 'default' : 'pointer'}">First Name</label>
        </div>
        <BaseInput id="firstName" v-model="profile.firstName" :disabled="profile.id !== user.id"></BaseInput>
      </div>
      <div>
        <div class="labelContainer">
          <label for="lastName" :style="{cursor: profile.id !== user.id ? 'default' : 'pointer'}">Last Name</label>
        </div>
        <BaseInput id="lastName" v-model="profile.lastName" :disabled="profile.id !== user.id"></BaseInput>
      </div>
      <div>
        <div class="labelContainer">
          <label for="birthday" :style="{cursor: profile.id !== user.id ? 'default' : 'pointer'}">Birthday</label>
        </div>
        <VueDatePicker
            id="birthday"
            v-model="profile.birthday"
            format="yyyy-MM-dd"
            :disabled="profile.id !== user.id">
        </VueDatePicker>
      </div>
      <div>
        <div class="labelContainer">
          <label for="city" :style="{cursor: profile.id !== user.id ? 'default' : 'pointer'}">City</label>
        </div>
        <vSelect v-model="profile.city" :options="cities" id="city" :disabled="profile.id !== user.id"></vSelect>
      </div>
      <div>
        <div class="labelContainer">
          <label for="info" :style="{cursor: profile.id !== user.id ? 'default' : 'pointer'}">Details</label>
        </div>
        <textarea
            id="info"
            v-model="profile.info"
            :disabled="profile.id !== user.id">
        </textarea>
      </div>
      <BaseButton v-if="profile.id === user.id">Save</BaseButton>
    </form>
  </div>
  <p v-if="saveFlashMessage">Successfully saved!</p>
</template>

<script setup>
import {ref, watch} from "vue"
import {user, getUser, updateUser} from "../composable/user.js"
import {singleTicket, getSingleTicket} from "../composable/tickets.js"
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import vSelect from "vue-select"
import "vue-select/dist/vue-select.css"

const {id} = useRoute().params
const {ticketId} = useRoute().query

const loading = ref(true)
const profile = ref(null)
const cities = ["Scranton", "Honesdale", "Colorado", "New York"]
const saveFlashMessage = ref(false)

const handleSave = async () => {
  const updatedProfile = {
    ...profile.value, birthday: new Date(profile.value.birthday).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    })
  }
  await updateUser(updatedProfile)
  saveFlashMessage.value = true
  setTimeout(() => {
    saveFlashMessage.value = false
  }, 3000)
}

watch(
    () => id,
    async () => {
      await getUser()
      if (user.value.id === id) {
        profile.value = user.value
      } else {
        await getSingleTicket(ticketId)
        profile.value = singleTicket.value.author
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
  margin: 0 auto 20px;
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
      height: 100px;
      padding: 10px;
      border-radius: 5px;
      font-family: inherit;
    }

    input, textarea {
      width: 70%;
      border: 1px solid #ddd;
      transition: border-color .2s cubic-bezier(0.645, 0.045, 0.355, 1);

      &:hover {
        border: 1px solid #aaaeb7;
      }
    }

    .labelContainer {
      width: 30%;
      color: #0e134f;
      font-size: 16px;
    }
  }

  button {
    align-self: end;
  }
}

p {
  text-align: center;
  padding: 10px;
  color: #0e134f;
}

@media(max-width: 1024px) {
  .profileContainer {
    width: 70%;
  }
}

@media(max-width: 768px) {
  .profileContainer {
    width: 90%;
  }
}
</style>

<style>
#birthday {
  width: 70%;

  .dp__clear_icon {
    display: none;
  }
}

#city {
  width: 70%;

  #vs1__combobox {
    cursor: pointer;
  }

  .vs__dropdown-toggle {
    transition: border-color .2s cubic-bezier(0.645, 0.045, 0.355, 1);

    &:hover {
      border: 1px solid #aaaeb7;
    }
  }

  .vs__clear {
    display: none;
  }
}

.vs__open-indicator {
  cursor: pointer;
}
</style>