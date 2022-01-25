<template>
  <Tabbar v-model="active" active-color="#42b983" inactive-color="#000">
    <template v-for="item in tabbarItem" :key="item.text">
      <TabbarItem :to="item.path">
        <span>{{ item.text }}</span>
        <template #icon="props">
          <img :src="props.active ? item.icon.active : item.icon.inactive" />
        </template>
      </TabbarItem>
    </template>
  </Tabbar>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { Tabbar, TabbarItem } from 'vant'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
const active = ref(0)

const tabbarItem = [
  {
    text: '音乐',
    path: '/music',
    icon: {
      active: require('@/assets/images/tabbar/music_active.png'),
      inactive: require('@/assets/images/tabbar/music_normal.png')
    }
  },
  {
    text: '视频',
    path: '/video',
    icon: {
      active: require('@/assets/images/tabbar/video_active.png'),
      inactive: require('@/assets/images/tabbar/video_normal.png')
    }
  },
  {
    text: '个人',
    path: '/profile',
    icon: {
      active: require('@/assets/images/tabbar/profile_active.png'),
      inactive: require('@/assets/images/tabbar/profile_normal.png')
    }
  }
]

watch(
  () => route.path,
  (newval) => {
    active.value = tabbarItem.findIndex((item) => item.path === newval)
  },
  {
    immediate: true
  }
)
</script>

<style lang="scss" scoped></style>
