<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter, useRoute } from 'vue-router'

const login = ref('')
const password = ref('')
const type = ref('password')
const disabled = ref(false)
const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()
const message = ref('')

function toggleType() {
  type.value = type.value === 'password' ? 'text' : 'password'
}

function showMessage(ms: string) {
  message.value = ms
  setTimeout(() => (message.value = ''), 5000)
}
async function submit() {
  console.log(`${login.value} = ${password.value}`)
  disabled.value = true
  await authStore.login(login.value, password.value)
  // route.query.redirectedFrom can be string or string[], ensure we pass a string
  const redirectedFrom = route.query?.redirectedFrom
  const redirect = Array.isArray(redirectedFrom)
    ? redirectedFrom[0]
    : (redirectedFrom as string | undefined)

  disabled.value = false

  const error = await router.push(redirect ?? '/users')
  if (error) {
    showMessage('Something went wrong, try again')
  }
}
</script>

<template>
  <div class="container">
    <h2>There is login page</h2>
    <template v-if="!authStore.user">
      <div>
        <label>Login</label>
        <input v-model="login" />
      </div>
      <div>
        <label>Password</label>
        <input :type="type" v-model="password" @click="toggleType()" />
      </div>
      <button @click.prevent="submit" :disabled="disabled">Submit</button>
    </template>
    <button v-else @click="authStore.logout()">Logout</button>
  </div>
  <div v-if="message" class="warn">{{ message }}</div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  gap: 1rem;
}
.container div {
  display: flex;
  flex-direction: column;
}
.warn {
  color: red;
  text-align: center;
}
</style>
