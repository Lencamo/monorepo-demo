<script setup>
import HelloWorld from './components/HelloWorld.vue'
import { logoShow } from '@monorepo/components/common'
import { one } from '@monorepo/components'
import { sayHello } from '@monorepo/utils'

const msg = sayHello('ting1')
</script>

<template>
  <logoShow />
  <one />
  <HelloWorld :msg="msg" />
</template>
