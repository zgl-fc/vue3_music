<template>
  <div class="title">
    <h1>{{ title }}</h1>
    <div class="more" @click="more">
      <span>更多</span>
      <img
        class="arrow"
        src="@/assets/images/icons/arrow-right.png"
        alt="more"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
const props = defineProps<{ title: string }>()
const emit = defineEmits(['more'])
const more = () => {
  emit('more')
}
</script>

<style lang="scss" scoped>
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 5px;
  h1 {
    font-size: $font-size-large;
    font-weight: 700;
  }
  .more {
    display: flex;
    align-items: center;
    span {
      font-size: $font-size-medium;
      color: $color-dialog-background;
    }
    .arrow {
      position: relative;
      top: -1px;
      width: 25px;
      height: 25px;
      vertical-align: middle;
    }
  }
}
</style>
