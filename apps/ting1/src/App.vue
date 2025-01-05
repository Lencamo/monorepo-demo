<script setup>
import HelloWorld from './components/HelloWorld.vue'
import { logoShow } from '@monorepo/components/common'
import { one, two } from '@monorepo/components'
import { inputItem, mediaItem } from '@monorepo/components/formItem'
import { chatTools } from '@monorepo/utils'

const { seedSingleMsg } = chatTools()

const msg = seedSingleMsg('ting1')
</script>

<template>
  <logoShow />

  <one msg="1" />
  <two />

  <inputItem />
  <mediaItem />

  <HelloWorld :msg="msg" />
</template>
