import { createApp } from 'vue'
import App from './App.vue'

import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persistedstate'

import router from './router'

import 'element-plus/theme-chalk/dark/css-vars.css'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'


const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPersist)

app.use(pinia)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(router)

app.mount('#app')
