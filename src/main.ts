import { createApp } from 'vue'

import VueUniversalModal from 'vue-universal-modal'
import App from './App.vue'

import Routers from './router/index'

import './assets/main.scss'
import 'vue-universal-modal/dist/index.css'

const app = createApp(App)

app
  .use(Routers)
  .use(VueUniversalModal, {
    teleportTarget: 'body',

  })
  .mount('#app')
