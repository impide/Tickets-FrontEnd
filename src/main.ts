import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/tailwind.css'
import { Modal } from 'flowbite'
import LoadScript from "vue-plugin-load-script";
import type { ModalOptions, ModalInterface } from 'flowbite'

createApp(App).use(store).use(router).use(LoadScript).mount('#app')
