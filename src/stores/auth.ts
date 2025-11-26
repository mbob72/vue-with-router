import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
type User = { name: string }

let counter = 0

async function mockLoginPost(_name: string, _password: string) {
  console.log(`loging with name ${_name}, password ${_password}`)
  return new Promise<void>((res, rej) => setTimeout(() => (counter++ % 3 ? rej() : res()), 1000))
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  function setUser(userParam?: User | null) {
    user.value = userParam ?? null
  }
  async function login(name: string, password: string) {
    try {
      await mockLoginPost(name, password)
      setUser({ name })
    } catch (e) {
      console.error('An error:', e)
    }
  }
  function logout() {
    setUser(null)
  }

  return { user, setUser, login, logout }
})
