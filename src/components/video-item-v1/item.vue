<template>
  <div class="video-item-v1" @click="goToPage">
    <div class="album">
      <img :src="getSizeImage(item.cover, 200)" alt="album" />
      <div class="info">
        <div class="count">{{ formatCount(item.playCount) }}</div>
        <div class="duration">
          {{ formatDuration(item.mv.videos[0].duration) }}
        </div>
      </div>
    </div>
    <div class="content">{{ item.name }} - {{ item.artistName }}</div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import { formatCount, formatDuration, getSizeImage } from '@/utils/format'
const props = defineProps<{ item: any }>()
const emit = defineEmits<{ (e: 'goToVideoDetail', id: number): void }>()
const goToPage = () => {
  emit('goToVideoDetail', props.item.id)
}
</script>

<style lang="scss" scoped>
.video-item-v1 {
  width: 100%;
  .album {
    position: relative;
    border-radius: 6px;
    overflow: hidden;
    img {
      width: 100%;
      height: auto;
    }
    .info {
      display: flex;
      justify-content: space-between;
      position: absolute;
      bottom: 3px;
      width: 100%;
      color: $color-text-ll;
      font-size: $font-size-medium;
      .count {
        padding-left: 3px;
        &::before {
          content: '';
          position: relative;
          top: -2px;
          display: inline-block;
          width: 18px;
          height: 18px;
          margin-right: 2px;
          vertical-align: text-top;
          background-size: cover;
          background-image: url('~@/assets/images/video.png');
        }
      }
      .duration {
        padding-right: 4px;
      }
    }
  }
  .content {
    @include oneline();
    padding-top: 3px;
    font-size: $font-size-medium;
  }
}
</style>
