<template>
  <div class="song-list">
    <Title :title="title" />
    <div class="song-list-scroll">
      <template v-for="(item, index) in songList" :key="index">
        <div class="song-list-item-wrapper">
          <SongListItem :songitem="item" />
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from 'vue'
import Title from '../title'
import SongListItem from '../song-list-item'
const props = defineProps<{ title: string; songList: any }>()
</script>

<style lang="scss" scoped>
.song-list {
  &-scroll {
    box-sizing: border-box;
    width: 100%;
    white-space: nowrap;
    overflow-x: scroll;
    padding-left: 5px;
    padding-bottom: 10px;
    .song-list-item-wrapper {
      display: inline-block;
      width: 120px;
      margin-right: 10px;
      vertical-align: top;
    }
  }
}
</style>
