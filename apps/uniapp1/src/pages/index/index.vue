<template>
  <div class="demo">
    <h1>当前项目为 uniapp1 ！</h1>
    <h1>调用公共方法结果：{{ msg }}</h1>
    <pck-demo1 :msg="msg"></pck-demo1>
    <pck-demo2></pck-demo2>
  </div>
</template>

<script setup>
import { chatTools } from "@monorepo/utils";
const { seedSingleMsg } = chatTools();
const msg = seedSingleMsg("uniapp1");

console.log("公共方法：", msg);
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
