import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

// 카카오 JavaScript SDK 초기화
window.Kakao.init(import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY)

createApp(App).use(router).mount('#app')
