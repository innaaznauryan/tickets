<template>
  <div v-if="!loading" class="ticketContainer">
    <div class="ticketField">
      <h2>Author</h2>
      <span>
        <NuxtLink
            :to="{path: '/' + singleTicket.author.id, query: {ticketId: singleTicket.id}}">
          {{ singleTicket.author.firstName }} {{ singleTicket.author.lastName }}
        </NuxtLink>
      </span>
    </div>
    <div class="ticketField">
      <h2>Id</h2>
      <span>{{ singleTicket.id }}</span>
    </div>
    <div class="ticketField">
      <h2>Title</h2>
      <span>{{ singleTicket.title }}</span>
    </div>
    <div class="ticketField">
      <h2>Content</h2>
      <span>{{ singleTicket.content }}</span>
    </div>
    <div class="ticketField">
      <h2>Date</h2>
      <span>{{ singleTicket.date }}</span>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import {singleTicket, getSingleTicket} from "../composable/tickets.js"

const {id} = useRoute().params
const loading = ref(true)

await getSingleTicket(id)

definePageMeta({
  breadcrumbs: [
    {name: "Home", path: "/"},
    {name: "Tickets", path: "/tickets"},
    {name: "Ticket"}
  ]
})

onMounted(() => {
  loading.value = false
})
</script>

<style lang="scss" scoped>
.ticketContainer {
  box-shadow: 0 0px 20px 3px rgb(0 0 0 / 0.1);
  padding: 20px;
  border-radius: 5px;
  width: 60%;
  margin: 0 auto;

  .ticketField {
    display: flex;
    align-items: center;
    padding: 10px 0;

    h2 {
      color: #0e134f;
      font-size: 16px;
      width: 30%;
      font-weight: 400;
    }

    span {
      width: 70%;
    }

    a {
      font-weight: 600;
      transition: .5s;

      &:hover {
        color: #67948c;
      }
    }
  }
}

@media(max-width: 1024px) {
  .ticketContainer {
    width: 70%;
  }
}

@media(max-width: 768px) {
  .ticketContainer {
    width: 100%;
  }
}
</style>