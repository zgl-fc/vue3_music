<template>
  <div class="music-page" ref="musicPageDivRef">
    <Search placeholder="请输入搜索关键词" @click="goToSearch"></Search>
    <div class="swiper-wrapper">
      <Swiper :banners="banners"></Swiper>
    </div>
    <div class="recommend">
      <Title title="推荐歌曲"></Title>
      <template v-for="(item, index) in recommendSongs" :key="index">
        <SongItem1 :song-item="item"></SongItem1>
      </template>
    </div>
    <SongList title="热门歌单" :song-list="hotsongList" />
    <SongList title="推荐歌单" :song-list="recommendSongsList" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Music'
})
</script>
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { Search } from 'vant'
import Swiper from '@/components/swiper'
import Title from '@/components/title'
import SongItem1 from '@/components/song-item-v1'
import SongList from '@/components/song-list'

import { getBanners, getTopList, getSongMenu } from '@/service/music'

import { scrollToLast } from '@/hooks'

const router = useRouter()

const musicPageDivRef = ref<null | HTMLDivElement>(null)
const banners = ref<any>([])
const recommendSongs = ref<any>([])
const recommendSongsList = ref<any>([])
const hotsongList = ref<any>([])

scrollToLast(musicPageDivRef)

function getPageData() {
  getBanners().then((data) => {
    if (data.code === 200) {
      banners.value = data.banners
    }
  })

  getTopList(0).then((data) => {
    if (data.code === 200) {
      recommendSongs.value = data.playlist.tracks.slice(0, 6)
    }
  })

  getSongMenu().then((res) => {
    if (res.code === 200) {
      hotsongList.value = res.playlists
    }
  })

  getSongMenu('华语').then((res) => {
    if (res.code === 200) {
      recommendSongsList.value = res.playlists
    }
  })
}

getPageData()

const goToSearch = () => {
  router.push('/song-search')
}
</script>

<style lang="scss" scoped>
.music-page {
  position: fixed;
  top: 0px;
  bottom: 50px;
  left: 0;
  right: 0;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  .swiper-wrapper {
    padding: 0 5px;
  }
  .van-search__content {
    border-radius: 5px;
  }
}
</style>
