import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

axios.interceptors.request.use((config) => {
    config.baseURL = "https://cashinout-be.herokuapp.com/public", //"http://localhost:8000",
    config.withCredentials = true
    return config
})

import './index.css'

store.dispatch('auth/me').then(() => {
    createApp(App).use(store).use(router).mount('#app')
})

