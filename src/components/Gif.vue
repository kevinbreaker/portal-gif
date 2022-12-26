<script lang="ts" setup>
import { type PublicKey } from '@solana/web3.js'
import { computed } from 'vue'

import Tag from './Tag.vue'

export interface Likes {
  count: number
  addresses: PublicKey[]
}

const props = defineProps<{
  id: string
  name: string
  tags: string[]
  likes: Likes
  link: string
  userAddress: PublicKey
}>()

const emit = defineEmits<{
  (e: 'fav', v: string)
}>()

function hasMyAddress(address: string) {
  return address === window.solana.publicKey.toString()
}

const isStarred = computed(() =>
  props.likes.addresses.some(address => hasMyAddress(address.toString())),
)

const starStyle = computed(() =>
  isStarred.value
    ? { fill: 'gold', stroke: 'none' }
    : { fill: 'transparent', stroke: 'white' },
)
</script>

<template>
  <aside class="card">
    <figure class="gif">
      <img :src="link" alt="" class="image">
    </figure>

    <header class="header">
      <strong class="name">{{ name }}</strong>

      <button
        type="button"
        class="button-like"
        :disabled="isStarred"
        @click="emit('fav', id)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.4rem"
          height="1.4rem"
          viewBox="0 0 16 16"
        >
          <path
            :fill="starStyle.fill"
            :stroke="starStyle.stroke"
            d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327l4.898.696c.441.062.612.636.282.95l-3.522 3.356l.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
          />
        </svg>

        {{ likes.count }}
      </button>
    </header>

    <footer class="footer">
      <div class="tags">
        <Tag v-for="tag in tags" :key="tag" :text="tag" />
      </div>
    </footer>
  </aside>
</template>

<style lang="scss">
.card {
  @apply grid relative;
  @apply m-0 mb-4;
  @apply cursor-default;

  break-inside: avoid;

  &:hover {
    @apply bg-gradient-3;
    background-image: linear-gradient(
      rgba(18, 18, 18, 0.6),
      rgba(0, 0, 0, 0),
      rgba(18, 18, 18, 0.6)
    );
    > .header,
    > .footer {
      @apply opacity-100;
    }
  }

  .image {
    @apply w-full;

    grid-row: 1 / -1;
    grid-column: 1;
  }

  > .header {
    @apply flex absolute;
    @apply w-full mt-2;

    @apply opacity-0;

    > .name {
      @apply inline-block;
      @apply w-full pl-7;
      @apply text-light-50;
    }
    > .button-like {
      @apply bg-transparent border-none text-light-50;
      @apply h-min w-min;
      @apply mr-2;
      @apply cursor-pointer;
    }
  }
  > .footer {
    @apply absolute bottom-0;
    @apply opacity-0;
    @apply p-2;

    > .tags {
      @apply flex gap-1 flex-wrap justify-start;
    }
  }
}
</style>
