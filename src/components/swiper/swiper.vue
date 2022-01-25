<template>
  <Swipe class="my-swipe" :autoplay="3000" indicator-color="white">
    <template v-for="(item, index) in banners" :key="index">
      <SwipeItem>
        <img class="swipe-image" :src="item.pic" alt="轮播" />
      </SwipeItem>
    </template>
  </Swipe>
</template>

<script setup lang="ts">
import { Swipe, SwipeItem } from 'vant'
import { defineProps } from 'vue'
const props = defineProps<{
  banners: any
}>()
</script>

<style lang="scss" scoped>
.my-swipe {
  height: 150px;
  .van-swipe-item {
    .swipe-image {
      width: 100%;
      height: 150px;
    }
  }
}
</style>
