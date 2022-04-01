<template>
  <div class="video-page" ref="videoPageDiv">
    <template v-for="(item, index) in videoItems" :key="index">
      <div class="item-wrapper">
        <VideoItemV1 :item="item" @goToVideoDetail="goToVideoDetail" />
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Video'
})
</script>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import { CellGroup } from 'vant'
import VideoItemV1 from '@/components/video-item-v1'

import { getTopMV } from '@/service/video'

import { throttle } from '@/utils/util'

import { scrollToLast } from '@/hooks'

const videoPageDiv = ref<null | HTMLDivElement>(null)
const videoItems = ref<any>([])
const hasMore = ref(true)
const router = useRouter()

scrollToLast(videoPageDiv)

const getTopMVData = async (offset: number) => {
  if (!hasMore.value) return
  try {
    const res = await getTopMV(offset, 14)
    let newData = videoItems.value
    newData = offset === 0 ? res.data : newData.concat(res.data)
    videoItems.value = newData
  } catch (error) {
    console.log(error)
  }
}

getTopMVData(0)

onMounted(() => {
  const divWrapper = videoPageDiv.value
  const containHeight = divWrapper?.offsetHeight || 0
  divWrapper?.addEventListener(
    'scroll',
    throttle((e: any) => {
      const targetEle = e.target
      if (targetEle?.scrollHeight - targetEle?.scrollTop - 1 < containHeight) {
        getTopMVData(videoItems.value.length)
      }
    }, 500)
  )
})

const goToVideoDetail = (id) => {
  router.push(`/detail-video?id=${id}`)
}
</script>

<style lang="scss" scoped>
.video-page {
  display: flex;
  padding-top: 10px;
  justify-content: space-around;
  flex-wrap: wrap;
  box-sizing: border-box;
  position: fixed;
  top: 0px;
  bottom: 50px;
  left: 0;
  right: 0;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  .item-wrapper {
    width: 48%;
    margin-bottom: 15px;
  }
}
</style>
