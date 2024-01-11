<template>
  <h1 v-if="!loading">Welcome!</h1>
</template>

<script setup>
import {ref, onMounted} from "vue"

const loading = ref(true)

onMounted(() => {
  loading.value = false
})
</script>

<style scoped>
h1 {
  font-size: 30px;
  text-align: center;
  padding: 30px;
  color: #0e134f;
}
</style>