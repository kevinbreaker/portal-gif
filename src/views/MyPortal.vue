<script setup lang="ts">
import { Buffer } from 'buffer'
import { computed, onMounted, ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'

import Button from '@components/Button.vue'

import Search from '@components/Search.vue'
import GifsContainer, { type GifItem } from '@components/GifsContainer.vue'
import ModalSendGIF, { type GifForm } from '@components/SendGIFModal.vue'
import Loader from '@components/Loader.vue'

import useWalletConnect from '@composables/useWalletConnect'
import { useProvider } from '@composables/useProvider'

interface GifList {
  gifLink: string
  user_address: string
}

const { isWalletConnected } = useWalletConnect()

const search = ref('')
const gifItems = ref<GifItem[]>([])

const { getProvider, getProgram, baseAccount, SystemProgram } = useProvider()

const retry = ref(true)
const isOpen = ref(false)
const loading = ref(false)

const gifsSearched = computed(() => {
  if (!search.value)
    return gifItems.value

  const regex = new RegExp(search.value, 'gi')
  return gifItems.value.filter(
    ({ name, tags }) => regex.test(name) || tags.some(tag => regex.test(tag)),
  )
})

window.Buffer = Buffer

async function sentGif({ name, link, tags }: GifForm) {
  try {
    loading.value = true
    const provider = getProvider()
    const program = getProgram(provider)

    const tagsSanitized = tags
      ?.trim()
      .split(/[,\;]/)
      .filter(el => el)

    await program.methods
      .addGif({
        id: uuidv4(),
        name: name.trim(),
        tags: tagsSanitized,
        link: link.trim(),
      })
      .accounts({
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
      })
      .rpc()

    isOpen.value = false
    getGifList()
  }
  catch (err) {
    console.error('Error on fetch new Gif ', err)
  }
  finally {
    loading.value = false
  }
}

async function starredGif(id: string) {
  const provider = getProvider()
  const program = getProgram(provider)

  await program.methods
    .like(id)
    .accounts({
      baseAccount: baseAccount.publicKey,
      user: provider.wallet.publicKey,
    })
    .rpc()

  getGifList()
}

async function createGIFAccount() {
  try {
    loading.value = true
    const provider = getProvider()
    const program = getProgram(provider)

    console.log('🏓')

    await program.methods
      .initialize()
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
  finally {
    loading.value = false
  }
}

async function getGifList() {
  try {
    loading.value = true
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
  finally {
    loading.value = false
  }
}

function sanitizeGifList(gifList: GifItem[]) {
  gifItems.value = gifList
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
        Portal de GIFs
      </h1>
      <p class="description">
        Coleção de GIFs no metaverso ✨
      </p>

      <Button class="btn" @click="isOpen = true">
        Adicionar um GIF
      </Button>

      <Search
        v-model="search"
        minlength="6"
        placeholder="Procurar entre os GIFs"
        @search="sentGif"
      />
    </header>

    <div class="gif-content">
      <GifsContainer :items="gifsSearched" @fav="starredGif" />
    </div>

    <ModalSendGIF v-model:is-open="isOpen" @send-gif="sentGif" />
    <Loader :is-loading="loading" />
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
      @apply mb-2;
    }

    > .btn {
      @apply mb-8;

      width: clamp(280px, 100%, 320px);
    }

  }
}
</style>
