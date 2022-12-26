<script lang="ts" setup>
defineProps<{
  text: string
}>()
</script>

<template>
  <span class="tag">#{{ text }}</span>
</template>

<style lang="scss">
.tag {
  @apply inline-block;
  @apply w-min h-min;
  @apply px-1 rounded-xl;
  @apply text-light-50;
  @apply text-xs italic whitespace-nowrap;
}
</style>
