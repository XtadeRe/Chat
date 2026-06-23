import axios from 'axios'

const API_URL = 'http://localhost:3000'

export const registration = async (email, password, login) => {
  try {
    const { data } = await axios.post(`${API_URL}/api/user/registration`, {
      login,
      email,
      password,
    })
    console.log('Успешно создан', data)
    return data
  } catch (error) {
    console.error('Ошибка регистрации:', error.response?.data || error.message)
    throw error
  }
}
