<script setup lang="ts">
import { onMounted } from 'vue'

import twitterLogo from '@assets/twitter.svg'
import Button from '@components/Button.vue'

import useWalletConnect from '@composables/useWalletConnect'

const TWITTER_HANDLE = 'web3dev_'
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`

const {
  publicKey,
  isWalletConnected,
  connectWallet,
  hasConnection,
} = useWalletConnect()

onMounted(() => {
  isWalletConnected()
})
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

    <footer class="footer">
      <img alt="Twitter Logo" class="twitter" :src="twitterLogo">

      <a class="link" :href="TWITTER_LINK" target="_blank" rel="noreferrer">
        feito com ❤️ por @{{ TWITTER_HANDLE }}
      </a>
    </footer>
  </main>
</template>

<style lang="scss">
.main-container {
  @apply grid place-content-center;
  @apply h-screen;
  @apply bg-primary;
  @apply text-center;
  // background: linear-gradient(180deg, #3b2667 40%, #bc78ec 85%);

  > .header {
    @apply mb-1/2;
    @apply text-light-50 font-bold;
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

  > .footer {
    @apply flex justify-center items-center;
    @apply absolute bottom-0;
    @apply w-full pb-6;
  }

  > .footer {
    > .twitter {
      @apply h-8 w-8 mr-2;
    }

    .link {
      @apply text-white text-base font-bold;
    }
  }
}
</style>
