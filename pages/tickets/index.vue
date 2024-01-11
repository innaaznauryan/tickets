<template>
  <div v-if="!loading" class="container">
    <div class="customize">
      <BaseInput placeholder="Search by Title" v-model="search"></BaseInput>
      <BaseButton @click="handleSort">Sort by Title</BaseButton>
    </div>
    <div class="tableContainer">
      <table>
        <tr v-if="displayTickets.length">
          <th>Author</th>
          <th>Ticket Id</th>
          <th>Title</th>
          <th>Content</th>
          <th>Created Date</th>
          <th></th>
        </tr>
        <tr v-for="ticket in displayTickets" :key="ticket.id">
          <td>
            <NuxtLink
                :to="{path: '/' + ticket.author.id, query: {ticketId: ticket.id}}">
              {{ ticket.author.firstName }} {{ ticket.author.lastName }}
            </NuxtLink>
          </td>
          <td>{{ ticket.id }}</td>
          <td>{{ ticket.title }}</td>
          <td>{{ ticket.content.slice(0, 30) }}...</td>
          <td>{{ ticket.date }}</td>
          <td>
            <NuxtLink :to="'/tickets/' + ticket.id">
              <BaseButton>View Details</BaseButton>
            </NuxtLink>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script setup>
import {ref, computed, onMounted} from "vue"
import {getTickets, tickets} from "~/composable/tickets.js"

const loading = ref(true)
const search = ref(null)
const toggleSort = ref(false)
const displayTickets = computed(() => {
  return search.value ? tickets.value.filter(ticket => ticket.title.toLowerCase().includes(search.value.toLowerCase())) : tickets.value
})

const handleSort = () => {
  tickets.value.sort((a, b) => {
    if (a.title.toLowerCase() < b.title.toLowerCase()) {
      return toggleSort.value ? -1 : 1
    } else if (a.title > b.title) {
      return toggleSort.value ? 1 : -1
    }
    return 0
  })
  toggleSort.value = !toggleSort.value
}

await getTickets()
onMounted(() => {
  loading.value = false
})

definePageMeta({
  breadcrumbs: [
    {name: "Home", path: "/"},
    {name: "Tickets", path: "/tickets"}
  ]
})
</script>

<style scoped>
.customize {
  display: flex;
  justify-content: space-between;
  margin: 0 auto 20px;
}

table {
  border-collapse: collapse;
  text-align: center;
  border-radius: 5px;
  box-shadow: 0 0px 20px 3px rgb(0 0 0 / 0.1);
  width: 100%;
}

th {
  padding: 20px;
}

td {
  padding: 10px;
}

th {
  color: #0e134f;
  white-space: nowrap;
}

tr {
  border-bottom: 1px solid #ddd;
}

button {
  white-space: nowrap;
}

a {
  font-weight: 600;
  transition: .5s;

  &:hover {
    color: #67948c;
  }
}

@media (max-width: 768px) {
  .tableContainer {
    overflow-x: scroll;
  }

  table {
    font-size: 12px;
  }
}
</style>