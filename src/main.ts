import { createApp } from 'vue'
import './index.css'
import './font.css'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'

const app = createApp(App)
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        // options: {
        //     darkModeSelector: ''
        // }
    }
})
app.mount('#app')
