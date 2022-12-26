<script lang="ts" setup>
import { type PublicKey } from '@solana/web3.js'
import Gif from './Gif.vue'

export interface Likes {
  count: number
  addresses: PublicKey[]
}

export interface GifItem {
  id: string
  name: string
  tags: string[]
  likes: Likes
  link: string
  userAddress: PublicKey
}

defineProps<{
  items: GifItem[]
}>()

const emit = defineEmits<{
  (e: 'fav', v: string)
}>()
</script>

<template>
  <section class="gif-container">
    <Gif
      v-for="(item, index) in items"
      :key="index"
      v-bind="item"
      @fav="emit('fav', $event)"
    />
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
