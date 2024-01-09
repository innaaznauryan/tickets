<template>
  <div class="breadcrumbs">
    <NuxtLink v-for="(crumb, index) in breadcrumbs" :to="crumb.path">
      {{ crumb.name }}
      <span v-if="index + 1 < breadcrumbs.length">></span>
    </NuxtLink>
  </div>
</template>

<script setup>
import {watchEffect} from "vue"

const route = useRoute()
const breadcrumbs = ref([])

watchEffect(() => {
  breadcrumbs.value = route.meta.breadcrumbs
})
</script>

<style lang="scss" scoped>
.breadcrumbs {
  display: flex;
  justify-content: center;
}

a {
  color: #0e134f;
  padding: 20px 0;

  span {
    padding: 10px;
  }
}
</style>