import './assets/styles/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { TroisJSVuePlugin } from 'troisjs'

import router from './router'

/*
** Main App
*/
// import App from './App.vue'

// const app = createApp(App)

// app.use(createPinia())
// app.use(router)
// app.use(TroisJSVuePlugin)

// app.mount('#app')

/*
** Test App
*/
import AppTest from './AppTest.vue'

const appTest = createApp(AppTest)

appTest.use(createPinia())
appTest.use(router)
appTest.use(TroisJSVuePlugin)

appTest.mount('#app')

window.Kakao.init(import.meta.env.VITE_KAKAO_KEY)

