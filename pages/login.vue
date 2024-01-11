<template>
  <div v-if="!loading">
    <div class="loginContainer">
      <h2>Sign in</h2>
      <form @submit.prevent="handleLogin">
        <BaseInput v-model="username" placeholder="Username" autocomplete="name" required/>
        <BaseInput v-model="password" placeholder="Password" autocomplete="current-password" required
                   :type="passwordType"/>
        <span class="eye" @click="togglePassword">
        <IconEye v-if="passwordType === 'password'"/>
        <IconEyeClosed v-if="passwordType === 'text'"/>
      </span>
        <BaseButton>Sign in</BaseButton>
      </form>
    </div>
    <p class="error">{{ userError }}</p>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue"
import {IconEye, IconEyeClosed} from "@tabler/icons-vue"
import {getUser, user, userError, isLoggedIn} from "@/composable/user.js"
import BaseButton from "~/components/BaseButton.vue"

const router = useRouter()
const username = ref(null)
const password = ref(null)
const passwordType = ref("password")
const loading = ref(true)

const togglePassword = () => {
  passwordType.value = passwordType.value === "password" ? "text" : "password"
}

const handleLogin = async () => {
  await getUser()
  if (username.value === user.value.username && password.value === user.value.password) {
    localStorage.setItem("jwt", user.value.jwt)
    isLoggedIn.value = true
    router.push("/")
  } else {
    userError.value = "Wrong username and/or password!"
    localStorage.removeItem("jwt")
    isLoggedIn.value = false
    setTimeout(() => {
      userError.value = null
    }, 3000)
  }
}

onMounted(() => {
  loading.value = false
})
</script>

<style lang="scss" scoped>
.loginContainer {
  width: 30%;
  margin: 30px auto;
  box-shadow: 0 0px 20px 3px rgb(0 0 0 / 0.1);
  padding: 20px;
  border-radius: 5px;
}

h2 {
  text-align: center;
  color: #0e134f;
  padding: 10px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;

  .eye {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    display: grid;
    place-content: center;
  }
}

.error {
  text-align: center;
  color: red;
  padding: 10px;
}

@media (max-width: 1024px) {
  .loginContainer {
    width: 50%;
  }
}

@media (max-width: 768px) {
  .loginContainer {
    width: 80%;
  }
}
</style>