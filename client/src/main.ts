import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { BootstrapVue3 } from 'bootstrap-vue-3'

import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const app = createApp(App)
const pinia = createPinia()


pinia.use(piniaPluginPersistedstate)


app.use(pinia)
app.use(router)
app.use(BootstrapVue3)

app.mount('#app')