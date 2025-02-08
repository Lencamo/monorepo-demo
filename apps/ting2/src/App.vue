<script setup>
import HelloWorld from "./components/HelloWorld.vue";
import { demo1, demo2 } from "@monorepo/components";
import { chatTools } from "@monorepo/utils/src";

const { seedSingleMsg } = chatTools();

const msg = seedSingleMsg("ting2");
console.log("公共方法：", msg);
</script>

<template>
  <HelloWorld :msg="msg" />
  <demo1 :msg="msg"></demo1>
  <demo2></demo2>
</template>
