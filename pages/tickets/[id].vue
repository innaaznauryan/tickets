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
loading.value = false

definePageMeta({
  breadcrumbs: [
    {name: "Home", path: "/"},
    {name: "Tickets", path: "/tickets"},
    {name: "Ticket"}
  ]
})
</script>

<style lang="scss" scoped>
.ticketContainer {
  box-shadow: 0 0px 20px 3px rgb(0 0 0 / 0.1);
  padding: 20px;
  border-radius: 5px;
  width: 40%;
  margin: 0 auto;

  .ticketField {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    gap: 10px;

    h2 {
      color: #0e134f;
      font-size: 20px;
    }

    span {
      text-align: end;
    }

    a {
      font-weight: 600;
    }
  }
}
</style>