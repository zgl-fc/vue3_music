import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入全局样式文件
// import 'vant/lib/index.css'
import '@/assets/scss/index.scss'
import { Lazyload } from 'vant'

createApp(App).use(Lazyload).use(store).use(router).mount('#app')
