<template>
  <div class="song-item-v1" @click="musicplay">
    <div class="song-info">
      <img :src="getSizeImage(songItem.al.picUrl, 60)" alt="pic" />
      <div class="content">
        <p class="name">{{ songItem.name }}</p>
        <p class="singer">{{ songItem.ar[0].name }} - {{ songItem.al.name }}</p>
      </div>
    </div>
    <img
      class="arrow"
      src="@/assets/images/icons/arrow-right.png"
      alt="arrow"
    />
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { useStore } from '@/store'

import { getSizeImage } from '@/utils/format'

const store = useStore()
const props = defineProps<{ songItem: any }>()
const musicplay = () => {
  store.dispatch('musicPlay/addSongAction', props.songItem)
}
</script>

<style lang="scss" scoped>
.song-item-v1 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 5px;
  .song-info {
    width: 100%;
    flex: 1;
    display: flex;
    align-items: center;
    img {
      width: 60px;
      height: 60px;
      margin-right: 5px;
      border-radius: 6px;
    }
    .content {
      flex: 1;
      max-width: 200px;
      .name {
        font-size: $font-size-large;
        color: $color-small-title;
        margin-bottom: 8px;
        @include oneline();
      }
      .singer {
        font-size: $font-size-medium;
        color: $color-dark;
        @include oneline();
      }
    }
  }
  .arrow {
    width: 25px;
    height: 25px;
  }
}
</style>
