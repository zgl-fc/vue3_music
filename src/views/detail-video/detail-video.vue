<template>
  <div class="detail-video">
    <NavBar title="视频详情" left-text="返回" left-arrow @click-left="back" />
    <video class="video-player" :src="mvURL.url" controls autoplay></video>
    <div class="info">
      <p class="title">{{ mvInfo.name }}</p>
      <p class="desc">
        {{ mvInfo.artistName }} {{ mvInfo.alias && '-' + mvInfo.alias[0] }}
      </p>
      <div class="other">
        <span class="play-count"
          >{{ formatCount(mvInfo.playCount) }}次播放 -
        </span>
        <span class="publish-time">{{ mvInfo.publishTime }}</span>
      </div>
    </div>
    <div class="recommend">
      <h1>推荐视频</h1>
      <template v-for="(item, index) in relatedMV" :key="index">
        <DetailVideoItem class="item" :item="item" />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { NavBar } from 'vant'
import DetailVideoItem from '@/components/detail-video-item'
import { getMVURL, getRelateMV, getMVDetail } from '@/service/video'
import { formatCount } from '@/utils/format'
const mvInfo = ref<any>({})
const mvURL = ref<any>({})
const relatedMV = ref<any>([])
const route = useRoute()
const router = useRouter()
const getPageData = (id: number) => {
  getMVURL(id).then((res) => {
    mvURL.value = res.data
  })
  getRelateMV(id).then((res) => {
    relatedMV.value = res.data
  })
  getMVDetail(id).then((res) => {
    mvInfo.value = res.data
  })
}
getPageData(route.query.id as any)

const back = () => {
  router.back()
}
</script>

<style lang="scss" scoped>
.detail-video {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  overflow: scroll;
  background-color: $color-background;
  &::v-deep .van-nav-bar__left {
    padding-left: 0 !important;
  }
  .video-player {
    width: 100%;
  }
  .info {
    padding: 10px 5px;
    color: $color-small-title;
    font-size: $font-size-medium;
    .title {
      @include oneline();
      color: $color-text;
      font-size: $font-size-large;
      font-weight: 700;
      margin-bottom: 10px;
    }
    .desc {
      margin-bottom: 10px;
    }
  }
  .recommend {
    padding: 0 5px;
    h1 {
      font-size: $font-size-large;
      font-weight: 700;
      padding: 10px 0;
    }
    .item {
      margin-bottom: 10px;
    }
  }
}
</style>
