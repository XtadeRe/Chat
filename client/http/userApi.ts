import axios from 'axios'

const API_URL = 'http://localhost:3000/api'

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
})

export const registration = async (email: string, password: string, login: string) => {
  try {
    const { data } = await api.post('/user/registration', {
      login,
      email,
      password,
    })
    console.log('Успешно создан', data)
    return data
  } catch (error: unknown) {
    console.error('Ошибка регистрации:', error)
    throw error
  }
}

export const loginUser = async (login: string, password: string ) => {
  try {
    const { data } = await api.post('/user/login', {
      login,
      password,
    })
    console.log('Успешная авторизация', data)
    return data
  } catch (error: unknown) {
    console.error('Ошибка входа:', error)
    throw error
  }
}

export const checkUser = () => {
  return api.get('/user/check')
}

export const logoutUser = () => {
  return api.post('/user/logout')
}
