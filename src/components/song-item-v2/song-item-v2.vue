<template>
  <div class="song-item-v2" @click="musicplay">
    <h1 class="order">{{ index + 1 }}</h1>
    <div class="info">
      <div class="name">{{ item.name }}</div>
      <div class="singer">
        <img src="@/assets/images/icons/sq_icon.png" alt="sq" />
        <span class="ssinfo">{{ songinfoStr }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue'
import { useStore } from '@/store'

const store = useStore()
const props = defineProps<{
  index: number
  item: any
}>()
const songinfoStr = computed(() => {
  const item = props.item
  const fStr =
    (item.ar && item.ar[0].name) || (item.artists && item.artists[0].name)
  const sStr = item.alias && item.alias.length !== 0 ? '-' + item.alias[0] : ''
  const tStr = item.alia && item.alia.length !== 0 ? '-' + item.alia[0] : ''
  return fStr + (sStr || tStr)
})
const musicplay = () => {
  store.dispatch('musicPlay/addSongAction', props.item)
}
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
      .ssinfo {
        @include oneline();
        max-width: 250px;
      }
    }
  }
}
</style>
