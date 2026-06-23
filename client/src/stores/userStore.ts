import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  const _isAuth = ref(false)
  const user = ref(null)

  async function checkAuth() {
    try {
      console.log(_isAuth.value)
      return _isAuth.value
    } catch (error) {
      console.error('Ошибка проверки авторизации:', error)
      return false
    }
  }

  // async function getUserChats() {

  // }

  function login(userData: any) {
    _isAuth.value = true
    user.value = userData
  }

  function logout() {
    _isAuth.value = false
    user.value = null
  }

  return {
    _isAuth,
    user,
    checkAuth,
    login,
    logout
  }
})