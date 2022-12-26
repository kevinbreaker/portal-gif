<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'

import Button from '@components/Button.vue'

import useWalletConnect from '@composables/useWalletConnect'

const router = useRouter()

const {
  isWalletConnected,
  connectWallet,
  hasConnection,
} = useWalletConnect()

onMounted(() => {
  isWalletConnected()
  if (hasConnection)
    router.replace({ name: 'Portal' })
})

watch(hasConnection, connected =>
  connected && router.replace({ name: 'Portal' }))
</script>

<template>
  <main class="main-container">
    <header class="header">
      <h1 class="title">
        Portfólio de GIFs
      </h1>
      <p class="description">
        Veja sua coleção de GIF no metaverso ✨
      </p>

      <Button v-if="!hasConnection" @click="connectWallet">
        Conecte sua carteira
      </Button>
    </header>
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
