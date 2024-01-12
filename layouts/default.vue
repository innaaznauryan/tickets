<template>
  <nav v-if="!loading && isLoggedIn">
    <div class="container navContainer">
      <div></div>
      <div class="mainLinks">
        <NuxtLink :to="'/' + user.id">Profile</NuxtLink>
        |
        <NuxtLink to="/tickets">Tickets</NuxtLink>
      </div>
      <div class="logout">
        <a @click="handleLogout">Logout</a>
      </div>
    </div>
  </nav>
  <div class="container">
    <Breadcrumbs/>
  </div>
  <div class="container">
    <slot/>
  </div>
</template>

<script setup>
import {ref} from "vue"
import {getUser, user, isLoggedIn} from "~/composable/user.js"

const loading = ref(true)
const router = useRouter()

const handleLogout = async () => {
  localStorage.removeItem("jwt")
  isLoggedIn.value = false
  router.push("/login")
}

await getUser()
loading.value = false

onMounted(() => {
  isLoggedIn.value = !!localStorage.jwt
})
</script>

<style lang="scss">
nav {
  background-color: #c0ffe1;
  font-weight: 600;
  font-size: 18px;
}

.navContainer {
  display: flex;
  justify-content: space-between;
  align-items: center;

  a {
    padding: 20px 10px;
    display: inline-block;
    transition: .5s;

    &:hover {
      color: #67948c;
    }
  }
}

@media(max-width: 1280px) {
  .container {
    max-width: 80%;
  }
}

@media(max-width: 768px) {
  .container {
    max-width: 100%;
    padding: 0 20px;
  }
}
</style>