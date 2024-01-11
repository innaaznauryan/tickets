<template>
  <div class="errorPage">
    <h2>{{ error.statusCode }}</h2>
    <p>Oops!</p>
    <p>{{ error.statusMessage }}</p>
    <a @click="clearError({redirect: '/'})">Go back Home</a>
  </div>
</template>

<script setup>
const error = useError()

</script>

<style lang="scss" scoped>
.errorPage {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  margin: 20px;

  a {
    color: #67948c;
  }
}
</style>