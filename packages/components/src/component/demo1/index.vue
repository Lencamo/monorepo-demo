<template>
  <div class="demo1">
    <h2>传递的参数为：{{ msg }}</h2>
  </div>
</template>

<script setup>
const props = defineProps({
  msg: {
    type: String,
    default: "hello",
  },
});
</script>
