<template>
  <div class="container">
    <h2>Sign in</h2>
    <div class="form-container">
      <form @submit.prevent="handleLogin">
        <BaseInput v-model="username" placeholder="Username" autocomplete="name" required></BaseInput>
        <BaseInput v-model="password" placeholder="Password" autocomplete="current-password" required
                   :type="passwordType"></BaseInput>
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
import {ref} from "vue"
import {IconEye, IconEyeClosed} from "@tabler/icons-vue"
import {getUser, updateUser, user, userError} from "@/composable/user.js"
import BaseButton from "~/components/BaseButton.vue"

const router = useRouter()

const username = ref(null)
const password = ref(null)
const passwordType = ref("password")

const togglePassword = () => {
  passwordType.value = passwordType.value === "password" ? "text" : "password"
}

const handleLogin = async () => {
  await getUser()
  if (username.value === user.value.username && password.value === user.value.password) {
    await updateUser({...user.value, isLoggedIn: true})
    router.push("/")
  } else {
    userError.value = "Wrong username and/or password!"
    setTimeout(() => {
      userError.value = null
    }, 3000)
  }
}
</script>

<style lang="scss" scoped>
h2 {
  text-align: center;
  color: #0e134f;
  padding: 20px;
}

.form-container {
  display: flex;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 30%;
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
}

.error {
  text-align: center;
  color: red;
  padding: 10px;
}

@media (max-width: 768px) {
  .form-container form {
    width: 70%;
  }
}
</style>