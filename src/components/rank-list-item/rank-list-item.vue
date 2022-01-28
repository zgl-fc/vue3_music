<template>
  <div class="rank-list-item" :style="bgcolor" @click="moreDetail">
    <div class="left-img">
      <h1 class="s-title">{{ item.name }}</h1>
      <img :src="item.tracks[0].al.picUrl" alt="cover" />
    </div>
    <div class="right-song-list" v-if="item.tracks.length !== 0">
      <template v-for="(child, index) in item.tracks.slice(0, 3)" :key="index">
        <p class="list-item">
          <span>{{ index + 1 }}. {{ child.name }} - </span>
          <span>{{ child.ar[0].name }}</span>
        </p>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, withDefaults, defineEmits } from 'vue'
const props = withDefaults(
  defineProps<{
    item: any
    bgcolor: string
  }>(),
  { item: { tracks: [] }, bgcolor: '#fff' }
)

const emit = defineEmits(['moreDetail'])

const moreDetail = () => {
  emit('moreDetail')
}
</script>

<style lang="scss" scoped>
.rank-list-item {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  padding: 10px 0;
  .left-img {
    width: 100px;
    h1 {
      margin-bottom: 4px;
      font-weight: 700;
    }
    img {
      width: 100%;
      height: 100px;
      border-radius: 10px;
    }
  }
  .right-song-list {
    padding-top: 20px;
    height: 90px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .list-item {
      @include oneline();
      width: 100%;
      max-width: 180px;
    }
  }
}
</style>
