import { URL, fileURLToPath } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), WindiCSS()],
  build: {
    assetsDir: '',
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
      '@composables': fileURLToPath(
        new URL('./src/composables', import.meta.url),
      ),
      '@components': fileURLToPath(
        new URL('./src/components', import.meta.url),
      ),
    },
  },
})
