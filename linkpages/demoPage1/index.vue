<template>
  <div class="demo">
    <h2>公共页面-page1-欢迎！</h2>
  </div>
</template>

<script setup>
import { onLoad } from "@dcloudio/uni-app";

onLoad((e) => {
  console.log("当前页面来源于：", e);
});
</script>

<style lang="scss" scoped>
.demo {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
}
</style>
