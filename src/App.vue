<template>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <keep-alive :exclude="['detail-video', 'song-search']">
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
  <Tabbar></Tabbar>
</template>

<script setup lang="ts">
import Tabbar from './components/tabbar'
</script>

<style lang="scss"></style>
