import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './routes'
import App from './App.vue'

import './assets/styles/tailwind.css'

let myWindow = window as any;

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#' + myWindow.asoneId)

