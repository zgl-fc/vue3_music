<template>
  <div class="rank">
    <Loading
      v-if="rankList.length === 0"
      size="48"
      class="loading"
      type="spinner"
      color="#333"
    ></Loading>
    <template v-for="(item, index) in rankList" :key="index">
      <div class="rank-item-wrapper">
        <RankListItem
          :item="item"
          :bgcolor="bgcolor[index]"
          @moreDetail="goToRankDetail(index)"
        />
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Rank'
})
</script>
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '@/store'
import { getTopList } from '@/service/music'

import { Loading } from 'vant'
import RankListItem from '@/components/rank-list-item'

const store = useStore()
const router = useRouter()
const rankList = computed(() => {
  return store.state.rank.rankList
})
const bgcolor = [
  'background-color: #74CEC2',
  'background-color: #ED897B',
  'background-color: #CB5174',
  'background-color: #F08EB5'
]
store.dispatch('rank/getRankListAction')

const goToRankDetail = (index: number) => {
  router.push(`/detail-song-list?type=rank&id=${index}`)
}
</script>

<style lang="scss" scoped>
.rank {
  position: fixed;
  top: 0;
  bottom: 50px;
  left: 0;
  right: 0;
  overflow: scroll;
  opacity: 0.8;
  background-color: #fafafa;
  -webkit-overflow-scrolling: touch;
  .loading {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .rank-item-wrapper {
    width: 92%;
    margin: 0 auto;
    padding: 10px 0;
  }
}
</style>
