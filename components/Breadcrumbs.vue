<template>
  <div v-if="!loading" class="container">
    <div class="breadcrumbs">
      <div v-for="(crumb, index) in breadcrumbs">
        <NuxtLink :to="crumb.path">{{ crumb.name }}</NuxtLink>
        <span v-if="index + 1 < breadcrumbs.length">></span>
      </div>
    </div>
  </div>
</template>

<script setup>
import {watchEffect} from "vue"

const route = useRoute()
const breadcrumbs = ref([])
const loading = ref(true)

watchEffect(() => {
  breadcrumbs.value = route.meta.breadcrumbs
})

onMounted(() => {
  loading.value = false
})
</script>

<style lang="scss" scoped>
.breadcrumbs {
  display: flex;
  justify-content: left;
}

a {
  padding: 20px 0;
  display: inline-block;
  transition: .5s;

  &:hover {
    color: #67948c;
  }
}

span {
  padding: 20px;
}
</style>