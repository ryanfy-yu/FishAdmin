import { createApp } from 'vue'
import App from './App.vue'

import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persistedstate'//pina持久化插件

import router from './router'

import ElementPlus from 'element-plus'//全局引入
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

//全局图标注册
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}


const pinia = createPinia()
pinia.use(piniaPersist)

app.use(pinia)

app.use(router)

app.use(ElementPlus)

app.mount('#app')
