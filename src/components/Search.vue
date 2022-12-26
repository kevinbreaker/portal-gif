<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps<{
  placeholder: string
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', v: string): void
  (e: 'search'): void
}>()

const model = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value),
})
</script>

<template>
  <form class="search-form" @submit.prevent="emit('search')">
    <input
      v-bind="$attrs"
      v-model="model"
      type="search"
      class="search-input"
      :placeholder="placeholder"
    >
  </form>
</template>

<style lang="scss">
.search-form {
  @apply flex items-center;
  @apply w-full;
  max-width: 600px;

  > .search-input {
    @apply flex-grow;
    @apply h-8 w-full;
    @apply mr-4 px-4;
    @apply rounded-md border-none;
  }
}
</style>
