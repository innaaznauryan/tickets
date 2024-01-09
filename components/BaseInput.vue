<template>
  <input type="text" :value="modelValue" @input="emit('update:modelValue', $event.target.value)">
</template>

<script setup>
defineProps(["modelValue"])
const emit = defineEmits(["update:modelValue"])
</script>

<style lang="scss" scoped>
input {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  font-family: inherit;
}
</style>