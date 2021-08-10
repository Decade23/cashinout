import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

axios.interceptors.request.use((config) => {
    config.baseURL = "http://localhost:8000", //"https://cashinout-be.herokuapp.com",
    config.withCredentials = true
    // config.headers = {
    //     'X-Requested-With': 'XMLHttpRequest',
    //     'X-XSRF-TOKEN': 'XSRF-TOKEN'
    // }
    return config
})

import './index.css'

store.dispatch('auth/me').then(() => {
    createApp(App).use(store).use(router).mount('#app')
})

