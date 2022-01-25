<template>
  <div class="video-item-v1">
    <div class="album">
      <img :src="item.cover" alt="album" />
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
import { defineProps } from 'vue'
import { formatCount, formatDuration } from '@/utils/format'

const props = defineProps<{ item: any }>()
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
