<template>
  <div>
    <h2>one-{{ msg }}</h2>
  </div>
</template>

<script setup>
const props = defineProps({
  msg: {
    type: String,
    default: 'hello'
  }
})
</script>
