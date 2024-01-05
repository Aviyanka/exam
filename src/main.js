
import App from './App.vue'
import { createApp } from 'vue'
import { registerPlugins } from '@/plugins'
import './config/axios-interceptor';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/style.css'
const app = createApp(App)
registerPlugins(app)

app.mount('#app')
