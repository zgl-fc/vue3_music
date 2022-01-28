<template>
  <div class="rank">
    <Loading
      v-if="rankList.length === 0"
      size="48"
      class="loading"
      type="spinner"
      color="#333"
    ></Loading>
    <template v-else v-for="(item, index) in rankList" :key="index">
      <div class="rank-item-wrapper">
        <RankListItem
          :item="item"
          :bgcolor="bgcolor[index]"
          @moreDetail="goToRankDetail"
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
import { ref } from 'vue'
import { getTopList } from '@/service/music'

import { Loading } from 'vant'
import RankListItem from '@/components/rank-list-item'
const rankList = ref<any>([])
const bgcolor = [
  'background-color: #74CEC2',
  'background-color: #ED897B',
  'background-color: #CB5174',
  'background-color: #F08EB5'
]
function getTopListData() {
  let promiseall: any[] = []
  for (let i = 0; i < 4; i++) {
    promiseall.push(getTopList(i))
  }
  Promise.all(promiseall).then((res) => {
    let resList: any[] = []
    for (const item of res) {
      resList.push(item.playlist)
    }
    rankList.value = resList
  })
}
getTopListData()

const goToRankDetail = () => {
  // todo
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
