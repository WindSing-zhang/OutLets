import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import '@nutui/touch-emulator'
import App from './App.vue'
import router from './router'
import './utils/rem'
import '@nutui/nutui/dist/packages/toast/style/css';
import { useUserStore } from './stores/user'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// 恢复用户信息
const userStore = useUserStore()
userStore.restoreUserInfo()

app.mount('#app')
