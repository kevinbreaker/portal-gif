<script lang="ts" setup>
const emit = defineEmits<{
  (e: 'click'): void
}>()
</script>

<template>
  <button class="button" @click="emit('click')">
    <slot />
  </button>
</template>

<style lang="scss">
.button {
  @apply px-4 py-2;
  @apply border-none rounded-md;
  @apply bg-gradient-12 text-white;
  @apply appearance-none cursor-pointer;

  transition: transform 150ms cubic-bezier(0.55, 0.085, 0.68, 0.53);
  &:active {
    transform: scale(1.1);
  }
}
</style>
