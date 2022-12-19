import { createApp } from 'vue'
// import Router from 'vue-router'
import App from './App.vue'

import Routers from './router/index'

import './assets/main.scss'

const app = createApp(App)

app.use(Routers).mount('#app')
