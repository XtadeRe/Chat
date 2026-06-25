import {defineStore} from "pinia";
import { ref } from "vue";
import {fetch_users, createChat, fetch_chats} from "../../http/chatApi.ts"

export const useChatStore =  defineStore('chat', () => {
    
    const allUsers = ref([])
    const navChats = ref([])

    async function getUsers() {
        allUsers.value = await fetch_users();
    }

    async function addNavUser(authUserId: number, secondUserId: number) {
        try {
        await createChat(authUserId, secondUserId)
        console.error("Успешно")

        } catch (e) {
            console.error(e)
        }
    }

    async function getUserChats(userId: number) {
        const result = await fetch_chats(userId)
        navChats.value = result.chats
    }

    return {
        allUsers,
        addNavUser,
        getUserChats,
        getUsers
    }
})