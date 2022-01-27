<template>
  <div class="song-item-v2">
    <h1 class="order">{{ index }}</h1>
    <div class="info">
      <div class="name">{{ item.name }}</div>
      <div class="singer">
        <img src="@/assets/images/icons/sq_icon.png" alt="sq" />
        {{
          (item.ar && item.ar[0].name) || (item.artists && item.artists[0].name)
        }}
        <span v-if="item.alias && item.alias.length !== 0">
          - {{ item.alias[0] }}</span
        >
        <span v-else-if="item.alia && item.alia.length !== 0">
          - {{ item.alia[0] }}</span
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
const props = defineProps<{
  index: number
  item: any
}>()
</script>

<style lang="scss" scoped>
.song-item-v2 {
  display: flex;
  align-items: center;
  .order {
    padding: 10px 10px;
    margin-right: 2px;
    min-width: 18px;
  }
  .info {
    .name {
      @include oneline();
      max-width: 250px;
      margin-bottom: 5px;
      font-size: $font-size-large;
    }
    .singer {
      display: flex;
      align-items: center;
      font-size: $font-size-medium;
      color: $color-dark;
      img {
        width: 18px;
        height: 16px;
        margin-right: 5px;
      }
    }
  }
}
</style>
