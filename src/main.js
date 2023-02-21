import { createApp, markRaw } from 'vue'
import Loading from 'vue-loading-overlay'
import vToast from '@/components/Toast.vue'
import 'vue-loading-overlay/dist/css/index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import './style.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { defineRule, configure } from 'vee-validate'
import { required, email } from '@vee-validate/rules'
import { localize } from '@vee-validate/i18n'
import tw from '@vee-validate/i18n/dist/locale/zh_TW.json'

configure({
  // Generates an English message locale generator
  generateMessage: localize('tw', tw)
})

const app = createApp(App)
const pinia = createPinia()

pinia.use(({ store }) => {
  store.router = markRaw(router)
})

defineRule('required', required)
defineRule('email', email)

app.component('isLoading', Loading).component('vToast', vToast)
app.use(router).use(pinia)
app.mount('#app')
