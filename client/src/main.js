import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vue3GoogleLogin from "vue3-google-login"
const app = createApp(App)

const CLIENT_ID = "303794191199-4rrfjl5tre9blt2v2eojhbg1m81csbrc.apps.googleusercontent.com"

app.use(router)
.use(vue3GoogleLogin,{
    clientId : CLIENT_ID
});

app.mount('#app')

