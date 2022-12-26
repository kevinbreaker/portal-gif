<script lang="ts" setup>
import { computed } from 'vue'

import Button from './Button.vue'

export interface GifForm {
  name: string
  link: string
  tags?: string
}

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'update:isOpen', v?: boolean)
  (e: 'sendGif', v?: GifForm)
}>()

const toggle = computed({
  get: () => props.isOpen,
  set: value => emit('update:isOpen', value),
})

function closeModal() {
  emit('update:isOpen', false)
}

function sendGIF({ target }: Event) {
  const { gifName, link, tags } = target as unknown as HTMLFormElement

  emit('sendGif', {
    name: gifName.value,
    link: link.value,
    tags: tags.value,
  })
}
</script>

<template>
  <Modal v-model="toggle" :close="closeModal">
    <aside class="modal">
      <header class="header">
        <h1 class="title">
          Envie seu GIF
        </h1>

        <button class="close" @click="closeModal">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.5rem"
            height="1.5rem"
            class="icon"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10zm0-11.414L9.172 7.757L7.757 9.172L10.586 12l-2.829 2.828l1.415 1.415L12 13.414l2.828 2.829l1.415-1.415L13.414 12l2.829-2.828l-1.415-1.415L12 10.586z"
            />
          </svg>
        </button>
      </header>

      <main class="body">
        <form class="form" @submit.prevent="sendGIF">
          <input class="input" required placeholder="Digite o nome do GIF" name="gifName">
          <input class="input" required placeholder="Digite o link do GIF" name="link">

          <div class="input-container">
            <input
              class="input"
              placeholder="Tags relacionadas ao GIF"
              name="tags"
            >

            <small class="helper"> Separe as tags por virgulas(,)</small>
          </div>

          <div class="actions">
            <Button>Enviar</Button>
          </div>
        </form>
      </main>
    </aside>
  </Modal>
</template>

<style lang="scss">
.modal {
  @apply bg-light-50;
  @apply p-4 rounded-md;

  width: clamp(280px, 100%, 380px);

  > .header {
    @apply flex justify-between;
    @apply mb-8;

    > .close {
      @apply bg-transparent border-none;
      @apply cursor-pointer;

      > .icon {
        @apply fill-red-500;
      }
    }
  }

  > .body {
    @apply flex flex-col;
  }

  > .body > .form {
    @apply flex flex-col;

    > .input-container {
      @apply flex flex-col;

      > .input {
        @apply mb-1;
      }

      > .helper {
        @apply text-xs text-gray-500;
      }
    }

    .input {
      @apply flex-grow;
      @apply h-8;
      @apply px-4 mb-2;
      @apply rounded-md border-xs border-dark-300 border-solid;
    }
  }

  > .body > .form > .actions {
    @apply mt-4;
    @apply flex justify-end;
  }
}
</style>
