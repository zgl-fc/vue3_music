<template>
  <transition name="list">
    <div class="playlist" v-show="visible && playlist.length" @click="hide">
      <div class="content-wrapper" @click.stop>
        <div class="title">
          <h1>当前播放:</h1>
        </div>
        <div class="list-item-wrapper" ref="listItemWrapperRef">
          <template v-for="(item, index) in playlist" :key="index">
            <div class="item" @click="playSong(index)">
              <div :class="['name', currentIndex === index ? 'playing' : '']">
                <img
                  v-show="currentIndex === index"
                  class="playing-icon"
                  src="@/assets/images/player/playing.png"
                  alt="playing"
                />
                {{ item.name }} -
                <span class="singer">{{ item.ar && item.ar[0].name }}</span>
              </div>
              <div class="oprations">
                <img src="@/assets/images/player/close.png" alt="remove_song" />
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, watch, computed, nextTick, defineExpose } from 'vue'
import { useStore } from '@/store'
//data
const listItemWrapperRef = ref<HTMLDivElement | null>(null)
const visible = ref(false)
const ItemHeight = 44.4

// vuex
const store = useStore()
const playlist = computed(() => store.state.musicPlay.playlist)
const currentIndex = computed(() => store.state.musicPlay.currentIndex)

// watch
// watch(listItemWrapperRef?.value.offsetHeight, () => {

// }
watch(visible, async (newVal) => {
  const listWrapper = listItemWrapperRef.value
  if (newVal && listWrapper) {
    // todo
    await nextTick()
    const diff =
      (currentIndex.value + 1) * ItemHeight - listWrapper.clientHeight + 2
    listWrapper.scrollTop = diff < 0 ? 0 : diff
  }
})

async function show() {
  visible.value = true
  await nextTick()
}

const hide = () => {
  visible.value = false
}

const playSong = (index: number) => {
  store.commit('musicPlay/changeCurrentIndex', index)
}

defineExpose({
  show
})
</script>

<style lang="scss" scoped>
.playlist {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 200;
  background-color: $color-background-d;
  .content-wrapper {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 45%;
    width: 90%;
    border-radius: 10px 10px 0 0;
    margin: 0 auto;
    padding: 0 10px;
    background-color: #fff;
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 0;
      h1 {
        font-size: $font-size-large-m;
        color: #333;
        font-weight: 700;
      }
      img {
        width: 20px;
        height: 20px;
      }
    }
    .list-item-wrapper {
      height: 90%;
      overflow: scroll;
      -webkit-overflow-scrolling: touch;
      @include hideScrollBar;
      color: #333;
      .item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 23px;
        padding: 10px 0px;
        .name {
          @include oneline();
          max-width: 190px;
          font-size: $font-size-medium-x;
          .playing-icon {
            width: 22px;
            height: 22px;
            position: relative;
            top: 2px;
          }
          .singer {
            font-size: $font-size-medium;
            color: #666;
          }
          &.playing {
            font-size: $font-size-large;
            color: #e0432e;
            .singer {
              font-size: $font-size-medium-x;
              color: #e0432e;
            }
          }
        }
        .oprations {
          img {
            width: 20px;
            height: 20px;
          }
        }
      }
    }
  }
}
</style>
