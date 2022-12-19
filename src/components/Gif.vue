<script lang="ts" setup>
defineProps<{
  src: string
  alt?: string
}>()
</script>

<template>
  <figure class="gif">
    <img :src="src" :alt="alt" class="image">
  </figure>
</template>

<style lang="scss">
.gif {
  @apply grid;
  @apply m-0 mb-4;

  break-inside: avoid;

  > .image {
    @apply w-full;

    grid-row: 1 / -1;
    grid-column: 1;
  }
}
</style>
