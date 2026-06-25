import { defineStore } from 'pinia'
import { ref } from 'vue'
import {checkUser, logoutUser} from "../../http/userApi.ts"


export const useUserStore = defineStore('user', () => {
  const _isAuth = ref(false)
  const user = ref(null)


  async function checkAuth() {
    try {
      const response = await checkUser()
      if (response.data.user) {
        _isAuth.value = true
        user.value = response.data.user
        return true
      } else {
        _isAuth.value = false
        user.value = null
        return false
      }
    } catch (error: any) {

      if (error.response?.status === 401) {
        console.log('Пользователь не авторизован')
        _isAuth.value = false
        user.value = null
        return false
      }
      
      console.error('Ошибка проверки авторизации:', error)
      _isAuth.value = false
      user.value = null
      return false
    }
  }

  function login(userData: any) {
    _isAuth.value = true
    user.value = userData
  }

  async function logout() {
    try {
    const response = await logoutUser()
    if (response.data.user) {
      _isAuth.value = false
      user.value = null
      return true
    }
    } catch (e) {
      console.log(e)
    }
  }

  return {
    _isAuth,
    user,
    checkAuth,
    login,
    logout
  }
})