import { defineStore } from "pinia";
import { ref } from "vue";
import { fetch_users, createChat, fetch_chats, fetch_one } from "../../http/chatApi.ts"


interface Chat {
    id: number;
    name?: string;
    is_private: boolean;
    last_message_id: number;
    createdAt: string;
    updatedAt: string;
}
interface User {
    id: number;
    login: string;
    role: string;
}

export const useChatStore = defineStore('chat', () => {
    
    const allUsers = ref<User[]>([])
    const navChats = ref<Chat[]>([])
    const messageToUser = ref<User | null>(null)

    async function getUsers() {
        allUsers.value = await fetch_users();
    }

    async function addNavUser(authUserId: number, secondUserId: number) {
        try {
            await createChat(authUserId, secondUserId)
            console.log("Успешно")
            await getUserChats(authUserId)
        } catch (e) {
            console.error(e)
        }
    }

    async function getUserChats(userId: number) {
        const result = await fetch_chats(userId)
        navChats.value = result.chats
    }

    async function getOneChatInfo(chatId: number, authUserId: number) {
        const result = await fetch_one(chatId, authUserId)
        console.log(result.user)
        messageToUser.value = result.user
    }

    return {
        allUsers,
        messageToUser,
        navChats,
        addNavUser,
        getOneChatInfo,
        getUserChats,
        getUsers
    }
}, {
    persist: true
})