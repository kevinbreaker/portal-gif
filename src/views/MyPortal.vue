<script setup lang="ts">
import { Buffer } from 'buffer'
import { onMounted, ref } from 'vue'

import Search from '@components/Search.vue'
import GifsContainer from '@components/GifsContainer.vue'

import useWalletConnect from '@composables/useWalletConnect'
import { useProvider } from '@composables/useProvider'

interface GifList {
  gifLink: string
  user_address: string
}

const { isWalletConnected } = useWalletConnect()

const search = ref('')
const gifItems = ref<string[]>([])

const { getProvider, getProgram, baseAccount, SystemProgram } = useProvider()

const retry = ref(true)

async function fetchGIF() {
  try {
    window.Buffer = Buffer
    const provider = getProvider()
    const program = getProgram(provider)

    await program.methods
      .addGif(search.value)
      .accounts({
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
      })
      .rpc()

    const account = await program.account.baseAccount.fetch(
      baseAccount.publicKey,
    )

    gifItems.value = (account.gifList as GifList[]).map(el => el.gifLink)
    search.value = ''
  }
  catch (err) {
    console.error('Error on fetch new Gif ', err)
  }
}

async function createGIFAccount() {
  try {
    const provider = getProvider()
    const program = getProgram(provider)

    console.log('🏓')

    await program.methods
      .startStuffOff()
      .accounts({
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([baseAccount])
      .rpc()

    console.log(
      'BaseAccount criado com sucesso com o endereço :',
      baseAccount.publicKey.toString(),
    )

    await getGifList()
  }
  catch (error) {
    console.error('Error on create BaseAccount ', error)
  }
}

async function getGifList() {
  try {
    const provider = getProvider()
    const program = getProgram(provider)

    const account = await program.account.baseAccount.fetch(
      baseAccount.publicKey,
    )

    sanitizeGifList(account.gifList)
  }
  catch (error) {
    console.error('Error on get GIFs: ', error)

    gifItems.value = []

    if (retry.value) {
      retry.value = false
      createGIFAccount()
    }
  }
}

function sanitizeGifList(gifList: GifList[]) {
  gifItems.value = gifList.map(gif => gif.gifLink)
}

onMounted(() => {
  isWalletConnected()

  getGifList()

  gifItems.value = []
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
