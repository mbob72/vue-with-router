import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useAuthStore } from './stores/auth'

const app = createApp(App)

app.use(createPinia())

app.use(router)
router.beforeEach((to, from) => {
  const auth = useAuthStore()

  if (!auth.user?.name && to.meta.requireAuth) {
    return false
  }

  // if (store.count && !to.meta.requireAuth) {
  //   alert('Why you are here??')
  //   return false
  // }

  console.log('have a meta, store::', to)
})

app.mount('#app')
