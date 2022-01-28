<template>
  <div class="more-song-menu" ref="moreSongMenuRef">
    <BackTop title="更多歌单" />
    <Loading
      v-if="songMenuList.length === 0"
      size="48"
      class="loading"
      type="spinner"
      color="#333"
    ></Loading>
    <template v-else v-for="(item, index) in songMenuList" :key="index">
      <h1 class="title">{{ item.name }}</h1>
      <div class="item-list">
        <template v-for="(citem, cidx) in item.list" :key="cidx">
          <div class="item-wrapper">
            <SongListItem :songitem="citem" />
          </div>
        </template>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'MoreSongMenu'
})
</script>
<script setup lang="ts">
import { ref } from 'vue'
import { getSongMenuTags, getSongMenu } from '@/service/music'

import { Loading } from 'vant'
import SongListItem from '@/components/song-list-item'
import BackTop from '@/components/back-top'

import { scrollToLast } from '@/hooks'
const songMenuList = ref<any>([])
const moreSongMenuRef = ref<HTMLDivElement | null>(null)

scrollToLast(moreSongMenuRef)
async function getSongMenuDetail() {
  const res = await getSongMenuTags()
  const tags = res.tags
  const resList: any[] = []
  const promises: any[] = []
  for (const index in tags) {
    const name = tags[index].name
    resList[index] = { name, list: [] }
    promises.push(getSongMenu(name))
  }
  Promise.all(promises).then((menuLists) => {
    for (const index in menuLists) {
      const menuList = menuLists[index]
      resList[index].list = menuList.playlists
    }
    songMenuList.value = resList
  })
}
getSongMenuDetail()
</script>

<style lang="scss" scoped>
.more-song-menu {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  background-color: $color-background;
  overflow: scroll;
  .loading {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -100%);
  }
  .title {
    padding: 10px 0;
    padding-left: 2%;
    font-size: $font-size-large;
    font-weight: 700;
  }
  .item-list {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    .item-wrapper {
      width: 48%;
      padding-bottom: 10px;
    }
  }
}
</style>
