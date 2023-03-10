import { defineConfig } from 'windicss/helpers'

import typography from 'windicss/plugin/typography'

export default defineConfig({
  darkMode: 'class',
  plugins: [typography()],
  theme: {
    extend: {
      colors: {
        primary: '#3b2667',
      },
    },
  },
})
