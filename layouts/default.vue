<template>
  <nav v-if="!loading && user.isLoggedIn">
    <div class="container navContainer">
      <div>
        <NuxtLink :to="'/' + user.id">Profile</NuxtLink>
        |
        <NuxtLink to="/tickets">Tickets</NuxtLink>
      </div>
      <a @click="handleLogout">Logout</a>
    </div>
  </nav>
  <Breadcrumbs></Breadcrumbs>
  <slot/>
</template>

<script setup>
import {ref} from "vue"
import {getUser, updateUser, user} from "~/composable/user.js"

const loading = ref(true)
const router = useRouter()

const handleLogout = async () => {
  await updateUser({...user.value, isLoggedIn: false})
  router.push("/login")
}

await getUser()
loading.value = false
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body {
  font-family: "Microsoft Sans Serif";
}

a {
  text-decoration: none;
  color: #0e134f;
  cursor: pointer;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
}

nav {
  background-color: #c0ffe1;
}

.navContainer {
  display: flex;
  justify-content: space-between;

  > div {
    display: flex;
    align-items: center;
  }

  a {
    padding: 20px 10px;
  }
}
</style>