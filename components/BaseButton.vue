<template>
  <button>
    <slot></slot>
  </button>
</template>

<script setup>

</script>

<style lang="scss" scoped>
button {
  background-color: #c0ffe1;
  color: #0e134f;
  align-self: center;
  padding: 10px;
  border: 0;
  border-radius: 5px;
  cursor: pointer;
  font-family: inherit;
}
</style>