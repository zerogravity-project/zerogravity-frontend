import './assets/styles/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import router from './router'

/*
** Main App
*/
// import App from './App.vue'

// const app = createApp(App)

// app.use(createPinia())
// app.use(router)

// app.mount('#app')

/*
** Test App
*/
import AppTest from './AppTest.vue'

const appTest = createApp(AppTest)

appTest.use(createPinia())
appTest.use(router)

appTest.mount('#app')
