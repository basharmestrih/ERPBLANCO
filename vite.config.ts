import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) {
            return
          }

          if (id.includes('vuetify/components')) {
            return 'vuetify-components'
          }

          if (id.includes('vuetify/directives')) {
            return 'vuetify-directives'
          }

          if (id.includes('vuetify/iconsets')) {
            return 'vuetify-iconsets'
          }

          if (id.includes('vuetify')) {
            return 'vuetify-core'
          }

          if (id.includes('vue-router')) {
            return 'router'
          }

          if (id.includes('axios')) {
            return 'axios'
          }

          if (id.includes('@mdi')) {
            return 'icons'
          }

          if (id.includes('pinia')) {
            return 'pinia'
          }

          if (id.includes('/vue/') || id.includes('\\vue\\') || id.includes('@vue')) {
            return 'vue-core'
          }

          return
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
