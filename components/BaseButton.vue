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
  font-size: 16px;
  user-select: none;
}

@media(max-width: 768px) {
  button {
    font-size: 12px;
  }
}
</style>