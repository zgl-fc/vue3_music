<template>
  <div class="song-search">
    <div class="fixed-top">
      <BackTop title="搜索页面"></BackTop>
      <Search
        ref="searchRef"
        v-model="searchValue"
        placeholder="请输入搜索关键词"
        clearable
        :show-action="isShowCancel"
        @focus="focus"
        @blur="blur"
        @update:model-value="handlechange"
        @search="handlesearch"
        @clear="handleclear"
        @cancel="handleclear"
      ></Search>
    </div>
    <div class="hotkeys" v-if="!searchValue">
      <h1>热门搜索</h1>
      <template v-for="(item, index) in hotkeys" :key="index">
        <Tag
          class="keyitem"
          type="success"
          size="large"
          @click="setHotkey(item.first)"
          >{{ item.first }}</Tag
        >
      </template>
    </div>
    <div
      class="suggest-result"
      v-if="!isSearch && searchValue && suggestResult.length > 0"
    >
      <h1>搜索"{{ searchValue }}"</h1>
      <template v-for="(item, index) in suggestResult" :key="index">
        <div class="result-item">
          <img src="@/assets/images/icons/search_icon.png" alt="search_icon" />
          <span>{{ item.name }}</span>
        </div>
      </template>
    </div>
    <div class="search-result" v-if="searchValue && isSearch">
      <h1>最佳匹配</h1>
      <template v-for="(item, index) in searchResult" :key="index">
        <div class="item-wrapper">
          <SongItemV2 :index="index" :item="item"></SongItemV2>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

import { Search, Tag } from 'vant'
import BackTop from '@/components/back-top'
import SongItemV2 from '@/components/song-item-v2'

import {
  getHotSearch,
  getSuggestSearch,
  getSearchResult
} from '@/service/search'
import { debounce } from '@/utils/util'

//data
const searchValue = ref('')
const suggestResult = ref<any>([])
const searchResult = ref<any>([])
const hotkeys = ref<any>([])
const searchRef = ref<any>()
const isSearch = ref(false)
const isFocus = ref(false)

const isShowCancel = computed(() => {
  return !!searchValue.value || isFocus.value
})

onMounted(() => {
  searchRef.value.focus()
})

getHotSearch().then((res) => {
  hotkeys.value = res.result.hots
})

const focus = () => {
  isFocus.value = true
}

const blur = () => {
  isFocus.value = false
}

const handlechange = debounce(() => {
  isSearch.value = false
  if (!searchValue.value) return
  getSuggestSearch(searchValue.value).then((res) => {
    const result = res.result
    const order = res.result.order
    let suggestSongs: any[] = []
    for (const type of order) {
      suggestSongs = suggestSongs.concat(result[type])
    }
    suggestResult.value = suggestSongs
  })
}, 600)

const handlesearch = () => {
  getSearchResult(searchValue.value).then((res) => {
    isSearch.value = true
    searchResult.value = res.result.songs
  })
}

const handleclear = () => {
  suggestResult.value = []
}

const setHotkey = (tagValue: string) => {
  searchValue.value = tagValue
  handlesearch()
}
</script>

<style lang="scss" scoped>
.song-search {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 10;
  padding-top: 100px;
  background-color: $color-background;
  overflow: scroll;
  .fixed-top {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
  }
  &::v-deep .van-search {
    .van-search__content {
      border-radius: 5px;
    }
  }

  .hotkeys {
    padding: 0 5px;
    h1 {
      padding: 10px 0;
      font-size: $font-size-large;
    }
    .keyitem {
      margin-top: 8px;
      margin-right: 5px;
    }
  }
  .suggest-result {
    h1 {
      font-size: $font-size-large;
      color: $color-title;
      padding: 10px;
    }
    .result-item {
      display: flex;
      align-items: center;
      padding: 5px 0;
      img {
        width: 33px;
      }
    }
  }
  .search-result {
    h1 {
      font-size: $font-size-large;
      color: $color-title;
      padding: 10px;
    }
    .item-wrapper {
      padding: 10px 0;
    }
  }
}
</style>
