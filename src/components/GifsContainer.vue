<script lang="ts" setup>
import Gif from './Gif.vue'

defineProps<{
  items: string[]
}>()
</script>

<template>
  <section class="gif-container">
    <Gif v-for="(image, index) in items" :key="index" :src="image" />
  </section>
</template>

<style lang="scss">
  .gif-container {
    column-gap: 16px;

    width: 90vw;
    max-width: 1000px;

    @screen sm {
      column-count: 1;
    }
    @screen md {
      column-count: 2;
    }
    @screen lg {
      column-count: 4;
    }
  }
  </style>
