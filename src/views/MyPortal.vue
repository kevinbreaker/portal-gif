<script setup lang="ts">
import { onMounted, ref } from 'vue'

import Search from '@components/Search.vue'
import GifsContainer from '@components/GifsContainer.vue'

import useWalletConnect from '@composables/useWalletConnect'

const { publicKey, isWalletConnected } = useWalletConnect()

const search = ref('')
const gifItems = ref<string[]>([])

const TEST_GIFS = [
  'https://i.giphy.com/media/xUOxffMyVjqAnuJpJu/giphy.webp',
  'https://media3.giphy.com/media/26n7aJwq73ubRevoQ/giphy.gif?cid=ecf05e47gpuxzul6z0774k47hcjp5p74uwfbfaq4xfjjco0c&rid=giphy.gif&ct=g',
  'https://media3.giphy.com/media/3o7aD5euYKz5Ly7Wq4/giphy.gif?cid=ecf05e47gx235xsfy7tqmzvhwz06ztzaxr63av1f446mlluz&rid=giphy.gif&ct=g',
  'https://media2.giphy.com/media/XKwfxBDG32ayrLHfAY/giphy.gif?cid=ecf05e47he0xf0mwnfx51x1f6m0wi4hzi52ql2dh0lnfe0tk&rid=giphy.gif&ct=g',
  // 'https://i.giphy.com/media/xUOxffMyVjqAnuJpJu/giphy.webp',
  // 'https://media3.giphy.com/media/26n7aJwq73ubRevoQ/giphy.gif?cid=ecf05e47gpuxzul6z0774k47hcjp5p74uwfbfaq4xfjjco0c&rid=giphy.gif&ct=g',
  // 'https://media3.giphy.com/media/3o7aD5euYKz5Ly7Wq4/giphy.gif?cid=ecf05e47gx235xsfy7tqmzvhwz06ztzaxr63av1f446mlluz&rid=giphy.gif&ct=g',

  // 'https://media2.giphy.com/media/XKwfxBDG32ayrLHfAY/giphy.gif?cid=ecf05e47he0xf0mwnfx51x1f6m0wi4hzi52ql2dh0lnfe0tk&rid=giphy.gif&ct=g',
  // 'https://i.giphy.com/media/xUOxffMyVjqAnuJpJu/giphy.webp',
  // 'https://media3.giphy.com/media/3o7aD5euYKz5Ly7Wq4/giphy.gif?cid=ecf05e47gx235xsfy7tqmzvhwz06ztzaxr63av1f446mlluz&rid=giphy.gif&ct=g',

  // 'https://i.giphy.com/media/xUOxffMyVjqAnuJpJu/giphy.webp',
  // 'https://media3.giphy.com/media/3o7aD5euYKz5Ly7Wq4/giphy.gif?cid=ecf05e47gx235xsfy7tqmzvhwz06ztzaxr63av1f446mlluz&rid=giphy.gif&ct=g',
  // 'https://media2.giphy.com/media/XKwfxBDG32ayrLHfAY/giphy.gif?cid=ecf05e47he0xf0mwnfx51x1f6m0wi4hzi52ql2dh0lnfe0tk&rid=giphy.gif&ct=g',
]

function fetchGIF() {
  console.log(search.value)
  gifItems.value.push(search.value)
  search.value = ''
}

onMounted(() => {
  isWalletConnected()

  gifItems.value = TEST_GIFS
})
</script>

<template>
  <main class="main-container">
    <header class="header">
      <h1 class="title">
        Meus GIFs
      </h1>
      <p class="description">
        Minha coleção de GIF no metaverso ✨
      </p>

      <Search
        v-model="search"
        minlength="6"
        placeholder="Coloque o link do GIF"
        @search="fetchGIF"
      />
    </header>

    <div class="gif-content">
      <GifsContainer :items="gifItems" />
    </div>
  </main>
</template>

<style lang="scss">
.main-container {
  @apply grid place-content-center;
  @apply min-h-screen h-full;
  @apply bg-primary;
  @apply text-center;
  // background: linear-gradient(180deg, #3b2667 40%, #bc78ec 85%);

  > .header {
    @apply flex flex-col items-center;
    @apply mb-6;
    @apply text-light-50 font-bold;
  }

  > .gif-content {
    @apply py-4 px-2;
    @apply h-full;
    @apply overflow-x-auto;

    max-height: 60vh;
  }

  > .header {
    > .title {
      @apply text-4xl sm:text-5xl;
      @apply mb-1;
    }

    > .description {
      @apply text-lg sm:text-xl;
      @apply mb-6;
    }
  }
}
</style>
