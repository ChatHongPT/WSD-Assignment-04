import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
window.Kakao.init(import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY)

createApp(App).use(router).mount('#app')
