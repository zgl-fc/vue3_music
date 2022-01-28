<template>
  <NavBar :title="title" left-text="返回" left-arrow @click-left="back" />
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'
import { NavBar } from 'vant'
const props = defineProps<{ title: string }>()
const router = useRouter()
const back = () => {
  router.back()
}
</script>

<style lang="scss">
.van-nav-bar__left {
  padding-left: 0 !important;
}
.van-nav-bar__text,
.van-nav-bar .van-icon {
  color: $color-text !important;
}
</style>
