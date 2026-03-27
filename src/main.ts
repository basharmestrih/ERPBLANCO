import { createApp } from 'vue'
import App from './App.vue'
import router from './routes'
import { vuetify } from './plugins/vuetify'
import { createPinia } from 'pinia'
import { useLocaleStore } from '@/stores/localeStore'

const pinia = createPinia()

const app = createApp(App)

app
  .use(vuetify)
  .use(router)
  .use(pinia)

useLocaleStore(pinia).applyToDocument()

app.mount('#app')
