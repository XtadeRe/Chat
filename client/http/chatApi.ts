import axios from 'axios';
import {api} from "./index"

export const fetch_users = async () => {
    try {
    const { data } = await api.get('/chat')
    console.log('Успешное получение', data)
    return data
  } catch (error: unknown) {
    console.error('Ошибка получения пользователей:', error)
    throw error
  }
}

export const createChat = async (authUser: number, secondUser: number) => {
  try {
    const { data } = await api.post('/chat/create', {
      user_id: authUser,
      second_user_id: secondUser,
    })
    console.log('Чат успешно создан', data)
    return data
  } catch (error: unknown) {
    console.error('Ошибка создания чата:', error)
    throw error
  }
}

export const fetch_chats = async (userId: number) => {
    try {
    const { data } = await api.get('/chat/check', {
      params: {user_id: userId}
    })
    return data
  } catch (error: unknown) {
    console.error('Ошибка получения чатов:', error)
    throw error
  }
}