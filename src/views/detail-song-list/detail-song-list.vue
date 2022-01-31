<template>
  <div class="detail-song-list">
    <Loading
      v-if="isShowLoading"
      size="48"
      class="loading"
      type="spinner"
      color="#333"
    ></Loading>
    <template v-else>
      <img
        class="back"
        src="@/assets/images/icons/arrow-left.png"
        alt="back"
        @click="back"
      />
      <div class="bg-image" :style="bgimg"></div>
      <div class="top-cover-info">
        <div class="album">
          <img :src="getSizeImage(songInfo.coverImgUrl, 110)" alt="cover" />
          <div class="info">
            <div class="title">{{ songInfo.name }}</div>
            <div class="creater">
              <img
                :src="songInfo.creator && songInfo.creator.avatarUrl"
                alt="avatar"
              />
              <span>{{ songInfo.creator && songInfo.creator.nickname }}</span>
            </div>
            <p class="desc">简介: {{ songInfo.description }}</p>
          </div>
        </div>
        <div class="operation">
          <div class="favor item">
            <img src="@/assets/images/icons/favor_icon.png" alt="favor" />
            {{ formatCount(songInfo.subscribedCount) }}
          </div>
          <div class="share item">
            <img src="@/assets/images/icons/share_icon.png" alt="share" />
            分享
          </div>
        </div>
      </div>
      <div class="song-list">
        <template v-for="(item, index) in songInfo.tracks" :key="index">
          <div class="item-wrapper">
            <SongItemV2 :index="index" :item="item" />
          </div>
        </template>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from '@/store'

import { getSongMenuList } from '@/service/music'

import { Loading } from 'vant'
import SongItemV2 from '@/components/song-item-v2'
import { formatCount, getSizeImage } from '@/utils/format'
const route = useRoute()
const router = useRouter()
const store = useStore()
const bgimg = ref('')
const songInfo = ref<any>({})
const isShowLoading = computed(() => {
  return Object.keys(songInfo.value).length === 0
})
if (route.query.type === 'rank') {
  songInfo.value = store.state.rank.rankList[route.query.id as any]
  bgimg.value = `background-image: url(${getSizeImage(
    songInfo.value.coverImgUrl,
    450
  )})`
} else {
  getSongMenuList(route.query.id as any).then((res) => {
    bgimg.value = `background-image: url(${getSizeImage(
      res.playlist.coverImgUrl,
      450
    )})`
    songInfo.value = res.playlist
  })
}

const back = () => {
  router.back()
}
</script>

<style lang="scss" scoped>
.detail-song-list {
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
    transform: translate(-50%, -50%);
  }
  .back {
    position: absolute;
    top: 5px;
    left: 0px;
    z-index: 10;
    width: 22px;
    height: 22px;
    padding: 5px;
  }
  .bg-image {
    width: 100%;
    height: 0;
    margin-bottom: 8px;
    padding-top: 60%;
    background-size: cover;
    filter: blur(5px);
  }
  .top-cover-info {
    position: absolute;
    top: 40px;
    width: 88%;
    padding-left: 6%;
    color: $color-background;
    .album {
      display: flex;
      align-items: center;
      img {
        width: 110px;
        height: 110px;
        margin-right: 20px;
        border-radius: 10px;
      }
      .info {
        height: 110px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .title {
          font-size: $font-size-large;
        }
        .creater {
          display: flex;
          align-items: center;
          img {
            width: 25px;
            height: 25px;
            margin-right: 8px;
          }
        }
        .desc {
          max-width: 220px;
          @include twoline();
        }
      }
    }
    .operation {
      display: flex;
      justify-content: space-around;
      margin-top: 20px;
      .item {
        display: flex;
        align-items: center;
        img {
          width: 24px;
          height: 24px;
          margin-right: 5px;
        }
      }
    }
  }
  .song-list {
    padding-left: 10px;
    .item-wrapper {
      padding: 10px 0;
    }
  }
}
</style>
