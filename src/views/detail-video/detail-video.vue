<template>
  <div class="detail-video"></div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { getMVURL, getRelateMV, getMVDetail } from '@/service/video'
const mvInfo = ref<any>({})
const mvURL = ref<any>({})
const relatedMV = ref<any>([])
const route = useRoute()
const getPageData = (id: number) => {
  getMVURL(id).then((res) => {
    console.log('url', res)
  })
  getRelateMV(id).then((res) => {
    console.log('reMV', res)
  })
  getMVDetail(id).then((res) => {
    console.log('MVD', res)
  })
}
getPageData(route.query.id as any)
</script>

<style lang="scss" scoped></style>
